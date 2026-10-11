'use client';

import { useEffect, useRef, useState } from 'react';

type RouteId = 'yellowstone' | 'oregon' | 'utah';
type RouteKey = 'all' | RouteId;
type Point = { name: string; coords: [number, number] };
type Route = {
  label: string;
  color: string;
  points: Point[];
};

const routeIds: RouteId[] = ['yellowstone', 'oregon', 'utah'];

const routeData: Record<RouteId, Route> = {
  yellowstone: {
    label: 'Yellowstone in winter',
    color: '#2f6f9f',
    points: [
      { name: 'Bozeman (BZN)', coords: [45.7775, -111.1528] },
      { name: 'Chico Hot Springs', coords: [45.3567, -110.6881] },
      { name: 'Mammoth Hot Springs', coords: [44.9769, -110.6976] },
      { name: 'Lamar Valley', coords: [44.896, -110.265] },
      { name: 'Bozeman (Dec 24)', coords: [45.677, -111.0429] },
      { name: 'West Yellowstone', coords: [44.6621, -111.1041] },
      { name: 'Old Faithful', coords: [44.4605, -110.8281] },
    ],
  },
  oregon: {
    label: 'Central Oregon',
    color: '#1e5c55',
    points: [
      { name: 'Redmond (RDM) / Bend', coords: [44.0582, -121.3153] },
      { name: 'Fort Rock', coords: [43.3667, -121.05] },
      { name: 'Summer Lake', coords: [42.7167, -120.6633] },
      { name: 'Klamath Falls', coords: [42.2249, -121.7817] },
      { name: 'Crater Lake', coords: [42.9114, -122.1096] },
      { name: 'Bend (Dec 28)', coords: [44.0582, -121.3153] },
      { name: 'Hood River', coords: [45.7054, -121.5215] },
      { name: 'Portland', coords: [45.5898, -122.5951] },
    ],
  },
  utah: {
    label: 'Utah red rock',
    color: '#c7502f',
    points: [
      { name: 'Las Vegas', coords: [36.1699, -115.1398] },
      { name: 'Zion (Springdale)', coords: [37.1889, -112.9986] },
      { name: 'St. George (SGU)', coords: [37.0364, -113.5103] },
      { name: 'Bryce Canyon', coords: [37.6283, -112.1677] },
      { name: 'Torrey', coords: [38.2983, -111.4199] },
      { name: 'Capitol Reef', coords: [38.2917, -111.2615] },
      { name: 'Moab', coords: [38.5733, -109.5498] },
      { name: 'Arches', coords: [38.7331, -109.5925] },
      { name: 'Salt Lake City', coords: [40.7608, -111.891] },
    ],
  },
};

const buttons: Array<[RouteKey, string]> = [
  ['all', 'All routes'],
  ['yellowstone', 'Yellowstone in winter'],
  ['oregon', 'Central Oregon'],
  ['utah', 'Utah red rock'],
];

export default function RouteMap() {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<import('leaflet').Map | null>(null);
  const routeLayers = useRef<Partial<Record<RouteId, import('leaflet').LayerGroup>>>({});
  const boundsByRoute = useRef<Partial<Record<RouteId, import('leaflet').LatLngBounds>>>({});
  const allBounds = useRef<import('leaflet').LatLngBounds | null>(null);
  const [activeRoute, setActiveRoute] = useState<RouteKey>('all');

  useEffect(() => {
    let disposed = false;

    async function initializeMap() {
      if (!mapElement.current || mapInstance.current) return;
      const L = await import('leaflet');
      if (disposed || !mapElement.current) return;

      const map = L.map(mapElement.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      routeIds.forEach((key) => {
        const route = routeData[key];
        const coordinates = route.points.map((point) => point.coords);
        const group = L.layerGroup();

        L.polyline(coordinates, {
          color: route.color,
          weight: 5,
          opacity: 0.92,
          lineCap: 'round',
          lineJoin: 'round',
        }).addTo(group);

        route.points.forEach((point, index) => {
          const isEndpoint = index === 0 || index === route.points.length - 1;
          const icon = L.divIcon({
            className: 'route-marker-shell',
            html: `<span class="route-marker" style="--marker-color:${route.color}"></span>`,
            iconSize: isEndpoint ? [18, 18] : [13, 13],
            iconAnchor: isEndpoint ? [9, 9] : [6.5, 6.5],
          });
          L.marker(point.coords, { icon })
            .bindTooltip(point.name, { direction: 'top', offset: [0, -7] })
            .addTo(group);
        });

        group.addTo(map);
        routeLayers.current[key] = group;
        boundsByRoute.current[key] = L.latLngBounds(coordinates);
      });

      allBounds.current = L.latLngBounds(
        routeIds.flatMap((key) => routeData[key].points.map((point) => point.coords)),
      );
      map.fitBounds(allBounds.current, { padding: [32, 32] });
      mapInstance.current = map;
    }

    initializeMap();
    return () => {
      disposed = true;
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  function selectRoute(route: RouteKey) {
    setActiveRoute(route);
    const map = mapInstance.current;
    if (!map) return;

    routeIds.forEach((key) => {
      const layer = routeLayers.current[key];
      if (!layer) return;
      if (route === 'all' || route === key) layer.addTo(map);
      else layer.removeFrom(map);
    });

    if (route === 'all') {
      const bounds = allBounds.current;
      if (bounds) map.fitBounds(bounds, { padding: [32, 32] });
    } else {
      const bounds = boundsByRoute.current[route];
      if (bounds) map.fitBounds(bounds, { padding: [42, 42] });
    }
  }

  return (
    <div className="interactive-map">
      <div className="map-controls" role="group" aria-label="Choose routes shown on the map">
        {buttons.map(([key, label]) => (
          <button
            className={activeRoute === key ? 'active' : ''}
            key={key}
            onClick={() => selectRoute(key)}
            type="button"
            aria-pressed={activeRoute === key}
          >
            {label}
          </button>
        ))}
      </div>
      <div ref={mapElement} className="leaflet-map" aria-label="Interactive map of the three proposed road trips" />
      <p className="map-disclaimer">
        Planning overview only. Route lines connect the proposed stops and are not turn-by-turn navigation.
        Inside Yellowstone, most roads are closed to cars in winter; the lines there show snowcoach travel.
      </p>
    </div>
  );
}
