# West Rim to Red Rock

A 13-day family winter road trip, Dec 21, 2026 to Jan 2, 2027, from Las Vegas to Salt Lake City: the Hualapai canyon rim at Grand Canyon West, Hoover Dam, Zion, Bryce, Capitol Reef, Arches, and Canyonlands. The site has a day-by-day itinerary, seven suggested stays, a detailed map, typical and live weather, the NOAA El Niño outlook, crowd data, and booking notes.

The published site is [ibendavi.github.io/winter-trip-2026](https://ibendavi.github.io/winter-trip-2026/).

## Local development

```text
npm install
npm run dev
```

Build the static GitHub Pages artifact with `npm run build:pages`. Drive times and mileage are planning estimates; use the official road and park links on the site for live conditions.

## Generated data

Run these from the project folder (Python 3 with Pillow for the image):

- `py -3 tools/build_weather.py` writes `app/weather-data.ts` (30 winters of typical Dec 21 to Jan 2 weather from Open-Meteo's ERA5 archive). It is rate-limited and resumable through `tools/.cache/`.
- `py -3 tools/build_route_geometry.py` writes `app/route-geometry.ts` (road-following map lines from the OSRM public router).
- `py -3 tools/build_og.py` writes `public/og.png`.

The live forecast section calls Open-Meteo from the browser once Dec 21 is within 16 days (open the page with `?forecastTest` to preview the next 13 days). The El Niño section quotes NOAA CPC products from Sept 17 and Oct 8, 2026; refresh it after the Oct 15 outlook and the Nov 12 ENSO update. See `DECISIONS.md` for the choices behind the current structure.
