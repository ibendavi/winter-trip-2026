'use client';

import { useEffect, useRef, useState } from 'react';

type RouteId = 'utah' | 'coast' | 'south';
type RouteKey = 'all' | RouteId;
type Point = { name: string; coords: [number, number] };
type Route = {
  label: string;
  color: string;
  points: Point[];
};

const routeIds: RouteId[] = ['utah', 'coast', 'south'];

const routeData: Record<RouteId, Route> = {
  utah: {
    label: 'Death Valley + Utah',
    color: '#c7502f',
    points: [
      { name: 'Las Vegas', coords: [36.1699, -115.1398] },
      { name: 'Death Valley (Furnace Creek)', coords: [36.4572, -116.8665] },
      { name: 'Las Vegas (Dec 23)', coords: [36.1699, -115.1398] },
      { name: 'Zion (Springdale)', coords: [37.1889, -112.9986] },
      { name: 'Bryce Canyon', coords: [37.6283, -112.1677] },
      { name: 'Torrey', coords: [38.2983, -111.4199] },
      { name: 'Capitol Reef', coords: [38.2917, -111.2615] },
      { name: 'Moab', coords: [38.5733, -109.5498] },
      { name: 'Arches', coords: [38.7331, -109.5925] },
      { name: 'Salt Lake City', coords: [40.7608, -111.891] },
    ],
  },
  coast: {
    label: 'Pacific coast',
    color: '#1e5c55',
    points: [
      { name: 'Portland', coords: [45.5152, -122.6784] },
      { name: 'Hood River', coords: [45.7054, -121.5215] },
      { name: 'Portland (Dec 23)', coords: [45.5152, -122.6784] },
      { name: 'Cannon Beach', coords: [45.8918, -123.9615] },
      { name: 'Yachats', coords: [44.3112, -124.1048] },
      { name: 'Bandon', coords: [43.119, -124.4084] },
      { name: 'Trinidad', coords: [41.0598, -124.1431] },
      { name: 'Prairie Creek Redwoods', coords: [41.3639, -124.0216] },
      { name: 'Avenue of the Giants', coords: [40.35, -123.9267] },
      { name: 'Mendocino', coords: [39.3077, -123.7995] },
      { name: 'Menlo Park', coords: [37.453, -122.1817] },
    ],
  },
  south: {
    label: 'Southern coast + desert',
    color: '#2f6f9f',
    points: [
      { name: 'San Diego', coords: [32.7157, -117.1611] },
      { name: 'Borrego Springs', coords: [33.2559, -116.375] },
      { name: 'Palm Springs', coords: [33.8303, -116.5453] },
      { name: 'Joshua Tree', coords: [34.1347, -116.3131] },
      { name: 'Ventura (Channel Islands)', coords: [34.2747, -119.229] },
      { name: 'Santa Barbara', coords: [34.4208, -119.6982] },
      { name: 'Morro Bay', coords: [35.3658, -120.8499] },
      { name: 'Monterey', coords: [36.6002, -121.8947] },
      { name: 'Menlo Park', coords: [37.453, -122.1817] },
    ],
  },
};

const buttons: Array<[RouteKey, string]> = [
  ['all', 'All routes'],
  ['utah', 'Death Valley + Utah'],
  ['coast', 'Pacific coast'],
  ['south', 'Southern coast + desert'],
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
      <p className="map-disclaimer">Planning overview only. Route lines connect the proposed stops and are not turn-by-turn navigation.</p>
    </div>
  );
}
