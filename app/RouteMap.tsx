'use client';

import { useEffect, useRef, useState } from 'react';

type RouteKey = 'both' | 'utah' | 'coast';

const routeData = {
  utah: {
    label: 'Utah parks',
    color: '#c7502f',
    points: [
      { name: 'Menlo Park', coords: [37.453, -122.1817] },
      { name: 'Reno', coords: [39.5296, -119.8138] },
      { name: 'Elko', coords: [40.8324, -115.7631] },
      { name: 'Bonneville Salt Flats', coords: [40.7628, -113.895] },
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
      { name: 'Monterey', coords: [36.6002, -121.8947] },
      { name: 'Pinnacles', coords: [36.4906, -121.1825] },
      { name: 'Menlo Park', coords: [37.453, -122.1817] },
      { name: 'Mendocino', coords: [39.3077, -123.7995] },
      { name: 'Avenue of the Giants', coords: [40.35, -123.9267] },
      { name: 'Trinidad', coords: [41.0598, -124.1431] },
      { name: 'Prairie Creek Redwoods', coords: [41.3639, -124.0216] },
      { name: 'Bandon', coords: [43.119, -124.4084] },
      { name: 'Yachats', coords: [44.3112, -124.1048] },
      { name: 'Portland', coords: [45.5152, -122.6784] },
    ],
  },
} as const;

export default function RouteMap() {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<import('leaflet').Map | null>(null);
  const routeLayers = useRef<Record<'utah' | 'coast', import('leaflet').LayerGroup | null>>({
    utah: null,
    coast: null,
  });
  const boundsByRoute = useRef<Record<'utah' | 'coast', import('leaflet').LatLngBounds | null>>({
    utah: null,
    coast: null,
  });
  const allBounds = useRef<import('leaflet').LatLngBounds | null>(null);
  const [activeRoute, setActiveRoute] = useState<RouteKey>('both');

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

      (Object.keys(routeData) as Array<'utah' | 'coast'>).forEach((key) => {
        const route = routeData[key];
        const coordinates = route.points.map((point) => point.coords as [number, number]);
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
          L.marker(point.coords as [number, number], { icon })
            .bindTooltip(point.name, { direction: 'top', offset: [0, -7] })
            .addTo(group);
        });

        group.addTo(map);
        routeLayers.current[key] = group;
        boundsByRoute.current[key] = L.latLngBounds(coordinates);
      });

      const allCoordinates = [
        ...routeData.utah.points.map((point) => point.coords as [number, number]),
        ...routeData.coast.points.map((point) => point.coords as [number, number]),
      ];
      allBounds.current = L.latLngBounds(allCoordinates);
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

    (['utah', 'coast'] as const).forEach((key) => {
      const layer = routeLayers.current[key];
      if (!layer) return;
      if (route === 'both' || route === key) layer.addTo(map);
      else layer.removeFrom(map);
    });

    if (route === 'both') {
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
        {([
          ['both', 'Both routes'],
          ['utah', 'Utah parks'],
          ['coast', 'Pacific coast'],
        ] as Array<[RouteKey, string]>).map(([key, label]) => (
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
      <div ref={mapElement} className="leaflet-map" aria-label="Interactive map of both proposed road trips" />
      <p className="map-disclaimer">Planning overview only. Route lines connect the proposed stops and are not turn-by-turn navigation.</p>
    </div>
  );
}
