'use client';

import { useEffect, useRef, useState } from 'react';

type RouteId = 'utah' | 'coast' | 'south' | 'desert';
type RouteKey = 'all' | RouteId;
type Point = { name: string; coords: [number, number] };
type Route = {
  label: string;
  color: string;
  // The first leg is a flight (SFO to the first road stop), drawn dashed.
  flightFirstLeg?: boolean;
  points: Point[];
};

const routeIds: RouteId[] = ['utah', 'coast', 'south', 'desert'];

const routeData: Record<RouteId, Route> = {
  utah: {
    label: 'Utah parks',
    color: '#c7502f',
    flightFirstLeg: true,
    points: [
      { name: 'Menlo Park / SFO', coords: [37.453, -122.1817] },
      { name: 'Salt Lake City', coords: [40.7608, -111.891] },
      { name: 'Moab', coords: [38.5733, -109.5498] },
      { name: 'Arches', coords: [38.7331, -109.5925] },
      { name: 'Canyonlands', coords: [38.4597, -109.8207] },
      { name: 'Torrey', coords: [38.2983, -111.4199] },
      { name: 'Capitol Reef', coords: [38.2917, -111.2615] },
      { name: 'Bryce Canyon', coords: [37.6283, -112.1677] },
      { name: 'Kanab', coords: [37.0475, -112.5263] },
      { name: 'Zion', coords: [37.1889, -112.9986] },
      { name: 'Las Vegas', coords: [36.1699, -115.1398] },
    ],
  },
  coast: {
    label: 'Pacific coast',
    color: '#1e5c55',
    points: [
      { name: 'Menlo Park', coords: [37.453, -122.1817] },
      { name: 'Mendocino', coords: [39.3077, -123.7995] },
      { name: 'Avenue of the Giants', coords: [40.35, -123.9267] },
      { name: 'Trinidad', coords: [41.0598, -124.1431] },
      { name: 'Prairie Creek Redwoods', coords: [41.3639, -124.0216] },
      { name: 'Bandon', coords: [43.119, -124.4084] },
      { name: 'Yachats', coords: [44.3112, -124.1048] },
      { name: 'Cannon Beach', coords: [45.8918, -123.9615] },
      { name: 'Portland', coords: [45.5152, -122.6784] },
    ],
  },
  south: {
    label: 'Southern coast + desert',
    color: '#2f6f9f',
    points: [
      { name: 'Menlo Park', coords: [37.453, -122.1817] },
      { name: 'Morro Bay', coords: [35.3658, -120.8499] },
      { name: 'Santa Barbara', coords: [34.4208, -119.6982] },
      { name: 'Ventura (Channel Islands)', coords: [34.2747, -119.229] },
      { name: 'Joshua Tree', coords: [34.1347, -116.3131] },
      { name: 'Borrego Springs', coords: [33.2559, -116.375] },
      { name: 'San Diego', coords: [32.7157, -117.1611] },
    ],
  },
  desert: {
    label: 'Sequoia + Death Valley',
    color: '#7b4b94',
    points: [
      { name: 'Menlo Park', coords: [37.453, -122.1817] },
      { name: 'Three Rivers (Sequoia)', coords: [36.4386, -118.9043] },
      { name: 'Ridgecrest', coords: [35.6225, -117.6709] },
      { name: 'Death Valley (Furnace Creek)', coords: [36.4572, -116.8665] },
      { name: 'Mesquite', coords: [36.8055, -114.0672] },
      { name: 'Zion (Springdale)', coords: [37.1889, -112.9986] },
      { name: 'Las Vegas', coords: [36.1699, -115.1398] },
    ],
  },
};

const buttons: Array<[RouteKey, string]> = [
  ['all', 'All routes'],
  ['utah', 'Utah parks'],
  ['coast', 'Pacific coast'],
  ['south', 'Southern coast + desert'],
  ['desert', 'Sequoia + Death Valley'],
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
        const lineStyle = {
          color: route.color,
          weight: 5,
          opacity: 0.92,
          lineCap: 'round' as const,
          lineJoin: 'round' as const,
        };

        if (route.flightFirstLeg) {
          L.polyline(coordinates.slice(0, 2), { ...lineStyle, weight: 3, dashArray: '2 10' }).addTo(group);
          L.polyline(coordinates.slice(1), lineStyle).addTo(group);
        } else {
          L.polyline(coordinates, lineStyle).addTo(group);
        }

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
      <div ref={mapElement} className="leaflet-map" aria-label="Interactive map of the four proposed road trips" />
      <p className="map-disclaimer">
        Planning overview only. Route lines connect the proposed stops and are not turn-by-turn navigation.
        The dashed line is the Dec 24 flight from SFO to Salt Lake City.
      </p>
    </div>
  );
}
