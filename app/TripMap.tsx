'use client';

import { useEffect, useRef, useState } from 'react';
import { routeLegs } from './route-geometry';
import { days, legDays, pins, stayBlocks } from './trip-data';

type LayerKey = 'route' | 'stays' | 'sights' | 'airports';

const ROUTE_COLOR = '#c7502f';
const dayLabels = days.filter((day) => day.id !== 'parents');

function popupHtml(title: string, kind: string, text: string, url?: string, status?: string) {
  const link = url ? `<a href="${url}" target="_blank" rel="noreferrer">Open site ↗</a>` : '';
  const note = status ? `<em>${status}</em>` : '';
  return `<div class="trip-popup"><small>${kind}</small><strong>${title}</strong><p>${text}</p>${note}${link}</div>`;
}

export default function TripMap() {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('leaflet').Map | null>(null);
  const layersRef = useRef<Record<LayerKey, import('leaflet').LayerGroup | null>>({ route: null, stays: null, sights: null, airports: null });
  const dayBounds = useRef<Record<string, import('leaflet').LatLngBounds>>({});
  const allBounds = useRef<import('leaflet').LatLngBounds | null>(null);
  const [visible, setVisible] = useState<Record<LayerKey, boolean>>({ route: true, stays: true, sights: true, airports: true });
  const [activeDay, setActiveDay] = useState<string>('all');

  useEffect(() => {
    let disposed = false;

    async function init() {
      if (!mapElement.current || mapRef.current) return;
      const L = await import('leaflet');
      if (disposed || !mapElement.current) return;

      const map = L.map(mapElement.current, { scrollWheelZoom: false, zoomControl: true });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      const route = L.layerGroup();
      const stays = L.layerGroup();
      const sights = L.layerGroup();
      const airports = L.layerGroup();
      const perDay: Record<string, Array<[number, number]>> = {};
      const remember = (dayId: string, coord: [number, number]) => {
        (perDay[dayId] ??= []).push(coord);
      };

      routeLegs.forEach((leg) => {
        const line = L.polyline(leg.coords, {
          color: ROUTE_COLOR,
          weight: leg.kind === 'main' ? 5 : 3,
          opacity: leg.kind === 'main' ? 0.9 : 0.8,
          dashArray: leg.kind === 'spur' ? '2 8' : undefined,
          lineCap: 'round',
          lineJoin: 'round',
        });
        line.bindTooltip(`${leg.label} · ≈ ${leg.miles} mi`, { sticky: true });
        line.addTo(route);
        const dayId = legDays[leg.id];
        if (dayId) leg.coords.forEach((c) => remember(dayId, c));
      });

      const pinIcon = (cls: string) =>
        L.divIcon({ className: 'trip-pin-shell', html: `<span class="trip-pin ${cls}"></span>`, iconSize: [18, 18], iconAnchor: [9, 9] });

      pins.forEach((pin) => {
        const marker = L.marker(pin.coords, { icon: pinIcon(pin.kind === 'airport' ? 'trip-pin-airport' : 'trip-pin-sight') })
          .bindTooltip(pin.name, { direction: 'top', offset: [0, -8] })
          .bindPopup(popupHtml(pin.name, pin.kind === 'airport' ? 'Airport' : 'Sight', pin.text, pin.url));
        marker.addTo(pin.kind === 'airport' ? airports : sights);
        pin.days.forEach((d) => remember(d, pin.coords));
      });

      stayBlocks.forEach((block) => {
        block.options.forEach((option) => {
          const marker = L.marker(option.coords, { icon: pinIcon(option.pick ? 'trip-pin-stay trip-pin-pick' : 'trip-pin-stay') })
            .bindTooltip(`${option.name}${option.pick ? ' (top pick)' : ''}`, { direction: 'top', offset: [0, -8] })
            .bindPopup(popupHtml(option.name, `${option.pick ? 'Top pick' : 'Alternative'} · ${block.dates}`, option.blurb, option.url, option.status));
          marker.addTo(stays);
          if (option.pick) block.days.forEach((d) => remember(d, option.coords));
        });
      });

      [route, stays, sights, airports].forEach((group) => group.addTo(map));
      layersRef.current = { route, stays, sights, airports };

      const everything: Array<[number, number]> = [];
      Object.entries(perDay).forEach(([dayId, coords]) => {
        dayBounds.current[dayId] = L.latLngBounds(coords);
        everything.push(...coords);
      });
      allBounds.current = L.latLngBounds(everything);
      map.fitBounds(allBounds.current, { padding: [30, 30] });
      mapRef.current = map;
    }

    init();
    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  function toggle(key: LayerKey) {
    const map = mapRef.current;
    const layer = layersRef.current[key];
    const next = !visible[key];
    setVisible({ ...visible, [key]: next });
    if (!map || !layer) return;
    if (next) layer.addTo(map);
    else layer.removeFrom(map);
  }

  function focus(dayId: string) {
    setActiveDay(dayId);
    const map = mapRef.current;
    if (!map) return;
    const bounds = dayId === 'all' ? allBounds.current : dayBounds.current[dayId];
    if (bounds) map.fitBounds(bounds, { padding: [48, 48], maxZoom: 11 });
  }

  const layerButtons: Array<[LayerKey, string]> = [
    ['route', 'Route'],
    ['stays', 'Stays'],
    ['sights', 'Sights'],
    ['airports', 'Airports'],
  ];

  return (
    <div className="trip-map">
      <div className="trip-map-bar">
        <div className="map-controls" role="group" aria-label="Map layers">
          {layerButtons.map(([key, label]) => (
            <button key={key} type="button" className={visible[key] ? 'active' : ''} aria-pressed={visible[key]} onClick={() => toggle(key)}>
              {label}
            </button>
          ))}
        </div>
        <div className="map-controls" role="group" aria-label="Zoom to a day">
          <button type="button" className={activeDay === 'all' ? 'active' : ''} onClick={() => focus('all')}>
            Whole trip
          </button>
          {dayLabels.map((day) => (
            <button key={day.id} type="button" className={activeDay === day.id ? 'active' : ''} onClick={() => focus(day.id)}>
              {day.date.replace(/^[A-Za-z]{3} · /, '')}
            </button>
          ))}
        </div>
      </div>
      <div ref={mapElement} className="leaflet-map trip-map-canvas" aria-label="Detailed map of the trip" />
      <div className="trip-legend" aria-label="Map legend">
        <span><i className="legend-line" /> Driving route</span>
        <span><i className="legend-line dashed" /> Local touring</span>
        <span><i className="trip-pin trip-pin-stay trip-pin-pick" /> Top-pick stay</span>
        <span><i className="trip-pin trip-pin-stay" /> Alternative stay</span>
        <span><i className="trip-pin trip-pin-sight" /> Sight</span>
        <span><i className="trip-pin trip-pin-airport" /> Airport</span>
      </div>
      <p className="map-disclaimer">
        Road lines follow real highways (OpenStreetMap routing, simplified). Tap a pin for details and a link. Lodging pins use street addresses,
        or approximate spots for the Hualapai cabins and Zion Lodge. Check winter hours before relying on any stop.
      </p>
    </div>
  );
}
