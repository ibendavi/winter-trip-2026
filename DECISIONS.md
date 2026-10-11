# Decisions

## 2026-10-11 (final): one trip, West Rim to Red Rock

- The three-option site (Yellowstone, Central Oregon, Hualapai + Utah) is scrapped and archived in `versions/20261011_160511/` (source and rendered site, commit `173a4ba`). The site now covers only the Las Vegas to Salt Lake City trip. Do NOT re-add the other options unless asked.
- Route: Dec 21 LAS to Grand Canyon West (Hualapai Reservation), Dec 22 canyon day, Dec 23 Hoover Dam to Boulder City, Dec 24 girls at LAS then to Springdale, Dec 25 Zion, Dec 26 Bryce, Dec 27 Highway 12 to Torrey, Dec 28 Capitol Reef, Dec 29 Moab, Dec 30 Arches and Canyonlands, Dec 31 Salt Lake City, Jan 1 slack, Jan 2 fly home. The user asked to skip Las Vegas the city: only the airport and Boulder City.
- Stays are top picks plus alternatives per stop (`app/trip-data.ts`). Winter status was checked against search results only and is labeled on the page. Known closed for winter: Bryce Canyon Lodge, Under Canvas Moab (and Zion). Conflicting: Sorrel River Ranch (2026 water-system shutdown, then reopened). Hoodoo Moab, Red Cliffs Lodge, Capitol Reef Resort, Broken Spur, Red River Ranch were not confirmed and Hoodoo/Red Cliffs are marked "call".
- Zion: secondary sources say no shuttle and private cars allowed through Dec 25, holiday shuttle Dec 26 to Jan 2. Unconfirmed against NPS for 2026; the page says to confirm.
- Arches has no timed entry in 2026. Hoover Dam visitor center and tours close only on Thanksgiving and Christmas. Temple Square lights are listed through Jan 1, 2027 by a third-party blog only. Time zones: Las Vegas, Boulder City, and Hoover Dam Pacific; Grand Canyon West and Utah Mountain Standard.
- Weather: typical conditions are 30 winters (1994 to 2023) of ERA5 reanalysis via Open-Meteo, windowed to Dec 21 to Jan 2, plus the three strong El Niño winters (1982-83, 1997-98, 2015-16). Reanalysis runs a few degrees colder than station normals (Las Vegas and Salt Lake City looked 2 to 5 F low), and the page says so. Finding: those three winters were 3 to 6 F colder than normal along the route in this window, with 2015-16 snowier and 1997-98 dry. n=3, so hints only.
- The weather data file still contains Yellowstone and Oregon stops from the earlier options. They are unused; regenerate only if those options return.
- Map lines are real road geometry from OSRM (free-flow estimates; the Zion to Bryce leg looked slow because of the tunnel, so the page uses about 2½ hr). Lodging pins use Nominatim geocodes; the Hualapai cabins and Zion Lodge pins are approximate.
- Live forecast: browser call to Open-Meteo, active only inside the 16-day horizon of the trip dates; `?forecastTest` shows the next 13 days for checking the display.

## 2026-10-11 (later): El Niño drives the route set; supersedes the routes below

- User said they have already been to Death Valley, Joshua Tree, the Grand Canyon, Grand Teton, and Jackson, do no winter sports, and are concerned about El Niño. Snow and cold are acceptable.
- Do NOT propose again: Death Valley, Joshua Tree, Grand Canyon, Grand Teton/Jackson, or any winter-sports destination.
- Rationale: NOAA's wet tilt covers the southern half of California, the Southwest, and the Four Corners, and may reach central Oregon. The dry/warm side is the interior Northwest and northern tier. So the options are 01 Yellowstone in winter (BZN round trip), 02 Central Oregon (RDM to PDX), 03 Utah red rock (LAS to SLC, kept as the warm, more exposed comparison). All coast and Southern California options were removed.
- Yellowstone facts used: oversnow season opens Dec 15, Mammoth Hotel opens Dec 15, Old Faithful Snow Lodge Dec 16 (park lodges' winter page); only the Gardiner to Mammoth to Cooke City road is open to cars. The West Yellowstone to Mammoth route through the park is closed to cars, so the car cannot hop between them. The plan returns the car to Bozeman between the north and the Old Faithful stay.
- Unverified and flagged on the page: holiday-week lodging at Mammoth and Old Faithful may be sold out; nonstop SFO to BZN and SFO to RDM exist in summer 2026 listings but winter 2026-27 schedules were not confirmed; St. George (SGU) flights for the girls are unconfirmed.
- Lean: Yellowstone if lodging can be booked now, Central Oregon as the fallback. The "private forecasters" claim about northwest Wyoming comes from Powder Chasers and similar secondary sources, not NOAA; the page says NOAA does not name Yellowstone.

## 2026-10-11 (latest): crowds section

- Numbers are December 2024 recreation visits from NPS counts, read from the public mirror publiclandsdata.com (Yellowstone's 2024 annual total, 4,744,353, matches the figure NPS reported). Share is December over each park's busiest month; per-day is December / 31.
- Dec/Jan ratios (Zion 1.9, Bryce 2.0, Arches 1.7, Capitol Reef 2.1, Canyonlands 3.3) are quoted as "points to a holiday surge", an inference, not a count of the holiday week. Yellowstone's January is higher than December because oversnow travel starts Dec 15.
- Gateway statements (Bozeman, Bend, Salt Lake City are ski towns; Springdale fills; Las Vegas peaks at New Year's Eve) are general patterns, labeled as such on the page. No measured Christmas-week data was found for Bend, Springdale, or the snowcoaches.
- Refresh with 2025 monthly counts when published.

## 2026-10-11: previous structure (superseded above)

- Calendar: the user visits the grandparents in Menlo Park Dec 18 to 20 alone, flies from SFO on Dec 21, and meets Ayelet and Tal at the route's first airport. Shelly and Maia still join Dec 24. Everyone flies home Jan 2. I read "ayelet at tal" as "Ayelet and Tal" and assumed the party before Dec 24 is the same as before; pills say "Before the girls" instead of a head count.
- Routes are no longer tied to SFO. Three options, each with its own first airport: 01 Las Vegas to Salt Lake City (Death Valley, Zion, Bryce, Capitol Reef, Moab); 02 Portland to Menlo Park (Gorge, Oregon and California coast, reverse of the old coast route); 03 San Diego to Menlo Park (Anza-Borrego, Palm Springs, Joshua Tree, Channel Islands, Morro Bay, Monterey).
- Girls' join points: LAS (01), PDX (02), PSP (03, with LAX as the backup). Options 02 and 03 end at SFO, which gives a free Jan 1 evening with the grandparents.
- Dropped: the SFO to SLC flight Utah plan, the Sequoia + Death Valley + Zion option, and all SFO-start plans. Do NOT bring back the Reno/Elko/Salt Flats I-80 drive.
- Because first airports differ, flights commit the route. The 10-10 idea that options could be switched until Dec 24 no longer holds. The page tells the reader to pick by mid-November after the Nov 12 ENSO update and to prefer changeable fares until then.
- Photos removed as off-route: Toadstool Hoodoos, Valley of Fire, Donner, Bonneville, Pinnacles, Bixby, Zabriskie/dunes/Zion/Bryce/Arches reused for option 01. Point Lobos restored for option 03 from the archived version.

## 2026-10-10: El Niño section

- Source of truth is NOAA CPC: ENSO discussion of Oct 8, 2026 and the long-lead outlook discussion of Sept 17, 2026. Numbers on the page (+2.1 C, greater than 83%, 70% for NDJ, 50 to 60% near the California coast) are quoted from those two documents.
- The "historic event" probabilities (54, 83, 70%) are for a 3-month RONI of +2.5 C or more. They are NOT the probability of "strong-to-very strong" (greater than 83% through JFM). Secondary articles mix these up.
- The CPC text does not say anything specific about Utah. The page says so and points to the CPC map instead of claiming a Utah tilt.
- The "exposure" ratings and the lean toward Death Valley and Utah are our reading of the outlook, not NOAA statements.
- Refresh after Oct 15 (new seasonal outlooks), Nov 12 (ENSO update), and Dec 17 (December outlook).

## 2026-10-10: mileage and times

- Re-estimated every leg with the OSRM public router (free-flow). Several earlier figures were off: Menlo to Mendocino (170 to 185 mi), Mendocino to Trinidad (230 to 170 mi), Bandon to Yachats (135 to 100 mi), SLC to Moab (4 to 4.5 hr), Moab to Torrey (2.5 to 3.25 hr), Torrey to Kanab via Bryce (205 to 195 mi, 4.75 hr).
- Times are free-flow and rounded up to the quarter hour. Not live traffic. New 10-11 legs: LAS to Furnace Creek 125 mi 2.6 hr, Springdale to Bryce 90 mi 2.25 hr, Bryce to Torrey 115 mi 3 hr, PDX to Hood River 65 mi 1.3 hr, SAN to Borrego 85 mi 2.1 hr, Borrego to Palm Springs 85 mi 1.9 hr, Morro Bay to Monterey 145 mi 3 hr.

## Housekeeping

- `versions/` is gitignored and holds local archives of earlier builds (source plus rendered site). See `VERSIONS.md`.
- Clone lives outside Dropbox (Dropbox blocks writes to `.git/objects`).
