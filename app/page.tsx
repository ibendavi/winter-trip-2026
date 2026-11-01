import LiveForecast from './LiveForecast';
import TripMap from './TripMap';
import { daylight, days, photos, stayBlocks, weatherKeys, type Day, type Link } from './trip-data';
import { placeWeather, weatherAnalogWinters, weatherNormalWinters, type PlaceWeather } from './weather-data';

const siteBasePath = '/winter-trip-2026';

function mapsUrl(nav: NonNullable<Day['navigate']>) {
  const params = new URLSearchParams({ api: '1', origin: nav.from, destination: nav.to, travelmode: 'driving' });
  if (nav.via?.length) params.set('waypoints', nav.via.join('|'));
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function degrees(value: number) {
  return `${Math.round(value)}°`;
}

function inches(value: number) {
  return value < 0.5 ? '< 1″' : `${Math.round(value)}″`;
}

function elNinoNote(place: PlaceWeather) {
  const dHigh = Math.round(place.analog.high - place.normal.high);
  const dLow = Math.round(place.analog.low - place.normal.low);
  const sign = (n: number) => (n >= 0 ? '+' : '−');
  const snow = place.analog.snow - place.normal.snow;
  const snowNote = Math.abs(snow) >= 0.5 ? `, snow ${snow > 0 ? 'above' : 'below'} normal` : '';
  return `${sign(dHigh)}${Math.abs(dHigh)}° highs, ${sign(dLow)}${Math.abs(dLow)}° lows${snowNote}`;
}

function perDay(monthlyVisits: number) {
  const daily = monthlyVisits / 31;
  const step = daily >= 1000 ? 100 : 10;
  return (Math.round(daily / step) * step).toLocaleString('en-US');
}

// December 2024 recreation visits (NPS counts, via publiclandsdata.com). Share is of each park's busiest month.
const crowdRows: Array<{ park: string; visits: number; share: number; feel: string }> = [
  { park: 'Zion', visits: 235404, share: 38, feel: 'The busy one. About 7,600 a day on average, with December nearly twice January, and the holiday week above that. Go at sunrise.' },
  { park: 'Bryce Canyon', visits: 65379, share: 18, feel: 'Quiet, with a crowd at the rim at sunset.' },
  { park: 'Arches', visits: 48845, share: 25, feel: 'Quiet, with more people at Delicate Arch around sunset. No timed entry in 2026.' },
  { park: 'Capitol Reef', visits: 43772, share: 21, feel: 'Quiet. Fruita and Scenic Drive have room.' },
  { park: 'Canyonlands', visits: 20062, share: 17, feel: 'Very quiet. Overlooks are mostly empty, except Mesa Arch at sunrise.' },
];

const ninoStats = [
  ['Niño-3.4 index in the Oct 8 update', '+2.1 °C'],
  ['Chance of a strong-to-very strong El Niño through Jan–Mar 2027', '> 83%'],
  ['Chance Nov–Jan is a record event, stronger than any since 1950', '70%'],
  ['October 2026 rain at Escalante, Utah: a record, about 6 in', 'Record'],
];

const ninoRows: Array<[string, string, string, string]> = [
  ['Grand Canyon West', 'Dec 21–22', 'Rain or ice on the access road, wind at the rim, and attractions that close for weather. Northwest Arizona is near the Southwest wet tilt.', 'Swap days: do Hoover Dam and Lake Mead first and the rim on Dec 23 morning, or skip the Skywalk.'],
  ['Hoover Dam and Boulder City', 'Dec 23', 'Low risk. Southern Nevada is the driest stop.', 'None needed.'],
  ['Las Vegas to Springdale', 'Dec 24', 'Ice or rockfall in the Virgin River Gorge on I-15 during storms.', 'Leave earlier, or sleep in St. George or Mesquite and finish in the morning.'],
  ['Zion', 'Dec 24–25', 'Rain, snow, and flash floods in canyons. Southern Utah is at the edge of the Four Corners wet tilt.', 'Kolob Canyons or Snow Canyon State Park for dry short walks; stay out of narrow canyons.'],
  ['Zion to Bryce', 'Dec 26', 'Snow on the Zion–Mount Carmel Highway and US-89. Bryce is above 8,000 ft.', 'Wait a few hours for the plows, or hold a night in Springdale.'],
  ['Highway 12', 'Dec 27', 'The main weather gate: Boulder Mountain reaches about 9,600 ft, with ice and closures.', 'Hold a night in Bryce and sacrifice the Capitol Reef day, or take a US-89 alternative.'],
  ['Capitol Reef and Moab', 'Dec 28–30', 'Dry on average, but slickrock is dangerous when icy and washes flood when it rains.', 'Overlooks and short walks instead of Delicate Arch.'],
  ['Moab to Salt Lake City', 'Dec 31', 'Ice on US-6 over Soldier Summit, and storms along the Wasatch.', 'Start at 9 am, or leave Dec 30 evening if a storm is forecast.'],
];

const ninoDates = [
  ['Oct 15 (done)', 'Seasonal outlook: Southwest wetter, Southwest temperatures at equal chances, northern Rockies drier. The route stays as planned.'],
  ['Nov 12', 'NOAA’s next ENSO update. Book flights, the rental, and lodging with free cancellation soon after.'],
  ['Nov 19', 'NOAA’s November seasonal outlook, with a shorter lead for Dec–Feb. Check whether Utah moves off equal chances.'],
  ['Dec 5', 'The 16-day forecast reaches Dec 21. The live forecast on this page starts filling in.'],
  ['Dec 17', 'NOAA’s December outlook, and a first look at the 8 to 14 day outlook for Dec 21 to 31. Use it to settle traction gear and which days are slack.'],
  ['Dec 20', 'Last look before you leave Menlo. If a storm hits the Southwest on Dec 21 to 23, swap the order of the Hualapai and Hoover Dam days.'],
];

const bookingSteps: Array<[string, string]> = [
  ['This week', 'Hold lodging with free cancellation: Cabins at Grand Canyon West, Boulder Dam Hotel, Zion Lodge or Springdale, Ruby’s Inn, Red Sands, the Dead Horse Point yurts, and Hotel Monaco. Holiday week fills first, and the Dead Horse yurts and Zion Lodge fill earliest.'],
  ['By mid-November', 'Book flights: you SFO to LAS and Ayelet and Tal to LAS on Dec 21; Shelly and Maia to LAS on Dec 24; everyone SLC home on Jan 2. Book one six-person vehicle for LAS to SLC and compare one-way fees, winter tires, and the traction policy.'],
  ['Before Dec 21', 'Buy Grand Canyon West tickets online, and check Hoover Dam, the Zion shuttle schedule, and Temple Square dates. An America the Beautiful pass usually covers the five national park fees, so compare it with the per-vehicle fees.'],
  ['Dec 5 and Dec 17', 'Check the live forecast on this page, then NOAA’s outlook, and set the slack-day plan.'],
];

const planCards: Array<{ title: string; items: string[] }> = [
  {
    title: 'Time zones',
    items: [
      'Las Vegas, Boulder City, and Hoover Dam are on Pacific time.',
      'Grand Canyon West keeps Arizona time, which is Mountain Standard in winter, one hour ahead of Las Vegas.',
      'Utah is on Mountain Standard Time, so Arizona and Utah match in December.',
    ],
  },
  {
    title: 'Driving',
    items: [
      'One-way rental from LAS to SLC. Carry chains or traction devices the rental allows.',
      'Fuel up before Bryce, Highway 12, and Hanksville. Services are thin in winter.',
      'The Zion–Mount Carmel tunnel has NPS size limits (about 11 ft 4 in tall and 7 ft 10 in wide) for large vehicles.',
      'Cell coverage is patchy on Highway 12, around Capitol Reef, and on the Hualapai Reservation. Download offline maps.',
      'Deer and wildlife are active on Highway 12 and US-89 at dusk.',
    ],
  },
  {
    title: 'Pack for the cold',
    items: [
      'Layers that work from 15 °F nights to 45 °F days, plus hats, gloves, and hand warmers.',
      'Microspikes or similar traction for icy trails, and trekking poles.',
      'A headlamp: the sun sets before 5:30 pm everywhere.',
      'A cooler, water, and snacks, because many park-town restaurants close for winter.',
    ],
  },
  {
    title: 'Rules worth knowing',
    items: [
      'Grand Canyon West: no phones or cameras on the Skywalk and no alcohol on the property.',
      'Hoover Dam’s visitor center and tours close on Christmas Day.',
      'Arches has no timed-entry system in 2026, but parking can still fill.',
      'Stay out of slot canyons and washes when rain is forecast anywhere upstream.',
    ],
  },
];

const sources: Array<[string, string]> = [
  ['NOAA ENSO diagnostic discussion, Oct 8 2026', 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.shtml'],
  ['NOAA seasonal outlook discussion, Oct 15 2026', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/fxus05.html'],
  ['NOAA seasonal outlook maps', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/'],
  ['NOAA 8 to 14 day outlook', 'https://www.cpc.ncep.noaa.gov/products/predictions/814day/'],
  ['NWS Las Vegas forecast', 'https://www.weather.gov/vef/'],
  ['NWS Salt Lake City forecast', 'https://www.weather.gov/slc/'],
  ['NWS Grand Junction forecast (Moab)', 'https://www.weather.gov/gjt/'],
  ['Grand Canyon West hours and tickets', 'https://grandcanyonwest.com/plan-your-visit/'],
  ['Hoover Dam', 'https://www.usbr.gov/lc/hooverdam/'],
  ['Zion shuttle and conditions', 'https://www.nps.gov/zion/planyourvisit/zion-canyon-shuttle-system.htm'],
  ['Bryce Canyon in winter', 'https://www.nps.gov/brca/planyourvisit/winter.htm'],
  ['Capitol Reef hours', 'https://www.nps.gov/care/planyourvisit/hours.htm'],
  ['Capitol Reef directions and Highway 12', 'https://home.nps.gov/care/planyourvisit/directions.htm'],
  ['Arches conditions', 'https://www.nps.gov/arch/planyourvisit/conditions.htm'],
  ['Canyonlands conditions', 'https://www.nps.gov/cany/planyourvisit/conditions.htm'],
  ['Dead Horse Point State Park', 'https://stateparks.utah.gov/parks/dead-horse/'],
  ['Temple Square', 'https://www.templesquare.com/'],
  ['Utah road conditions (UDOT)', 'https://www.udottraffic.utah.gov/'],
  ['Arizona road conditions', 'https://az511.com/'],
  ['NPS passes', 'https://www.nps.gov/planyourvisit/passes.htm'],
  ['NPS visitor use statistics', 'https://irma.nps.gov/STATS/'],
  ['Monthly park visitation data (public mirror of NPS counts)', 'https://publiclandsdata.com/national-park-visitation/zion/2024'],
];

function DayCard({ day, index }: { day: Day; index: number }) {
  const place = day.weather ? placeWeather[day.weather] : undefined;
  const links: Link[] = day.links ?? [];
  return (
    <li className="day-card" id={day.id}>
      <div className="day-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
      <div className="day-date">{day.date}</div>
      <div className="day-main">
        <div className="day-heading">
          <h3>{day.title}</h3>
          <span className={`group-pill ${day.group === 'All six' ? 'all-six' : ''}`}>{day.group}</span>
        </div>
        <p>{day.description}</p>
        {day.detail && <p className="day-detail">Watch point: {day.detail}</p>}
        {(place || links.length > 0 || day.navigate) && (
          <div className="day-extras">
            {place && (
              <span className="weather-chip" title={`Typical weather at ${place.label} for Dec 21 to Jan 2`}>
                Typical at {place.label}: {degrees(place.normal.high)} / {degrees(place.normal.low)}
                {place.normal.snow >= 0.5 ? `, ${inches(place.normal.snow)} snow over 13 days` : ''}
              </span>
            )}
            {day.navigate && (
              <a href={mapsUrl(day.navigate)} target="_blank" rel="noreferrer">Directions ↗</a>
            )}
            {links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>
            ))}
          </div>
        )}
      </div>
      <dl className="day-logistics">
        <div>
          <dt>Drive</dt>
          <dd>{day.drive}</dd>
        </div>
        <div>
          <dt>Sleep</dt>
          <dd>{day.stay}</dd>
        </div>
      </dl>
    </li>
  );
}

export default function Home() {
  const weatherPlaces = weatherKeys.map((key) => ({ key, ...placeWeather[key] }));

  return (
    <main>
      <a className="skip-link" href="#main-content">Skip to the trip</a>

      <section className="hero">
        <nav className="topline" aria-label="Trip navigation">
          <a href="#top" className="wordmark">Ben-David winter break</a>
          <div className="nav-links">
            <a href="#map">Map</a>
            <a href="#itinerary">Itinerary</a>
            <a href="#stays">Stays</a>
            <a href="#weather">Weather</a>
            <a href="#elnino">El Niño</a>
            <a href="#crowds">Crowds</a>
            <a href="#plan">Plan</a>
          </div>
          <span>Dec 21, 2026 · Jan 2, 2027</span>
        </nav>

        <div className="hero-copy" id="top">
          <p className="kicker">Winter break 2026 · Las Vegas to Salt Lake City</p>
          <h1>West rim<br />to red rock.</h1>
          <p className="lede">
            Thirteen days from the Hualapai canyon rim at Grand Canyon West, past Hoover Dam, through Zion, Bryce,
            Capitol Reef, Arches, and Canyonlands, to Salt Lake City. Six travelers from Dec 24, one one-way rental.
          </p>
        </div>

        <div className="hero-facts" aria-label="Trip at a glance">
          <div><strong>12</strong><span>nights on the road</span></div>
          <div><strong>≈ 1,150</strong><span>miles of driving</span></div>
          <div><strong>7</strong><span>stays to book</span></div>
          <div><strong>LAS → SLC</strong><span>fly in, fly out</span></div>
        </div>
      </section>

      <div id="main-content">
        <section className="brief-section" aria-labelledby="brief-heading">
          <div className="section-label">The shape of it</div>
          <div className="brief-copy">
            <h2 id="brief-heading">Two canyons, five parks, one road north.</h2>
            <p>
              You spend Dec 18 to 20 with the grandparents, then fly from SFO on Dec 21 to meet Ayelet and Tal at Las Vegas.
              The first three days are the Hualapai canyon rim and Hoover Dam, with no time in the city. Shelly and Maia land at
              the Las Vegas airport on Dec 24 and all six drive north through Utah, ending in Salt Lake City for New Year’s Eve.
              Everyone flies home from there on Jan 2.
            </p>
          </div>
          <div className="constraint-grid">
            <div><strong>6</strong><span>travelers after Dec 24</span></div>
            <div><strong>4½h</strong><span>longest drive</span></div>
            <div><strong>0</strong><span>ski days</span></div>
            <div><strong>2</strong><span>slack days built in</span></div>
          </div>
        </section>

        <section className="map-section map-section-wide" id="map" aria-labelledby="map-heading">
          <div className="section-intro light">
            <p className="kicker">The detailed map</p>
            <h2 id="map-heading">Every leg, stay, and stop.</h2>
            <p>Switch layers on and off, or zoom to a single day. Tap any pin for the details and a link. Scroll-wheel zoom stays off so the page remains easy to navigate; use the map controls to zoom.</p>
          </div>
          <TripMap />
        </section>

        <section className="route-section utah-section" id="itinerary" aria-labelledby="itinerary-heading">
          <header className="route-header">
            <div>
              <p className="route-number">Day by day</p>
              <p className="kicker">Dec 18 · Jan 2</p>
            </div>
            <h2 id="itinerary-heading">The itinerary.</h2>
            <p className="route-deck">
              Each day lists the drive, the night’s stay, typical weather, and the official links. Typical weather is a 30-year
              average, not a forecast: the live forecast fills in from Dec 5.
            </p>
          </header>

          <div className="route-stats" aria-label="Route statistics">
            <div><span>Planning distance</span><strong>≈ 1,150 mi</strong></div>
            <div><span>Longest normal leg</span><strong>4½ hr</strong></div>
            <div><span>Full-family bases</span><strong>4 + SLC</strong></div>
            <div><span>Airports</span><strong>SFO · LAS · SLC</strong></div>
          </div>

          <figure className="panorama panorama-utah">
            <img src={`${siteBasePath}/photos/utah-arches.jpg`} alt="Delicate Arch surrounded by winter snow in Arches National Park" />
            <figcaption>Arches after snow. Photo: Guyyoung1966, CC BY-SA 4.0. <a href="https://commons.wikimedia.org/wiki/File:Delicate_Arch_in_Arches_National_Park_draped_in_a_winter_snow.jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
          </figure>

          <ol className="timeline timeline-utah">
            {days.map((day, index) => (
              <DayCard key={day.id} day={day} index={index} />
            ))}
          </ol>

          <aside className="compressed-plan">
            <div>
              <p className="kicker">If a storm closes Highway 12</p>
              <h3>Hold in Bryce, not on the pass.</h3>
            </div>
            <p>If Boulder Mountain is closed on Dec 27, stay another night at Bryce, then take a US-89 alternative to Torrey when roads allow. Capitol Reef is the day to sacrifice: you still reach Moab on Dec 29, and the Jan 1 slack in Salt Lake City absorbs the rest.</p>
          </aside>
        </section>

        <section className="stays-section" id="stays" aria-labelledby="stays-heading">
          <header className="nino-header">
            <div>
              <p className="route-number">Where to sleep</p>
              <p className="kicker">Seven stays · top pick and alternatives</p>
            </div>
            <h2 id="stays-heading">Cool places to spend the night.</h2>
            <p className="route-deck">
              One memorable top pick for each stop, with alternatives if it is full. All are listed as open in winter by their owners or
              listings, but I could not confirm December 2026 availability, so check before booking, and book with free cancellation.
            </p>
          </header>

          {stayBlocks.map((block) => (
            <div className="stay-block" key={block.id}>
              <div className="stay-head">
                <p className="kicker">{block.dates} · {block.nights}</p>
                <h3>{block.headline}</h3>
                <p className="stay-area">{block.area}</p>
                {block.note && <p className="stay-note">{block.note}</p>}
              </div>
              <div className="stay-options">
                {block.options.map((option) => (
                  <article className={`stay-card ${option.pick ? 'stay-pick' : ''}`} key={option.name}>
                    <p className="stay-tag">{option.pick ? 'Top pick' : 'Alternative'}</p>
                    <h4>{option.name}</h4>
                    <p>{option.blurb}</p>
                    <p className="stay-status">{option.status}</p>
                    {option.url && (
                      <a href={option.url} target="_blank" rel="noreferrer">Website ↗</a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="weather-section" id="weather" aria-labelledby="weather-heading">
          <header className="nino-header">
            <div>
              <p className="route-number">Weather</p>
              <p className="kicker">Typical conditions · Dec 21 to Jan 2</p>
            </div>
            <h2 id="weather-heading">What to expect at each stop.</h2>
            <p className="route-deck">
              No forecast reaches Dec 21 yet. Until the 16-day forecast opens on Dec 5, these are the typical conditions for the
              trip dates over the last 30 winters, and how the three strongest El Niño winters compared.
              The live forecast loads below once it exists.
            </p>
          </header>

          <div className="weather-group">
            <div className="weather-table" role="table" aria-label="Typical weather by stop">
              <div className="comparison-row comparison-head" role="row">
                <div role="columnheader">Stop</div>
                <div role="columnheader">Typical high / low</div>
                <div role="columnheader">Coldest night</div>
                <div role="columnheader">Snow, 13 days</div>
                <div role="columnheader">Wet days of 13</div>
                <div role="columnheader">In the big El Niños</div>
                <div role="columnheader">Forecast</div>
              </div>
              {weatherPlaces.map((place) => (
                <div className="comparison-row" role="row" key={place.key}>
                  <div role="rowheader">{place.label}<small>{place.elevationFt.toLocaleString('en-US')} ft</small></div>
                  <div role="cell">{degrees(place.normal.high)} / {degrees(place.normal.low)}</div>
                  <div role="cell">{degrees(place.normal.coldest)}</div>
                  <div role="cell">{inches(place.normal.snow)}</div>
                  <div role="cell">{Math.round(place.normal.wetDays)}</div>
                  <div role="cell">{elNinoNote(place)}</div>
                  <div role="cell">
                    <a href={`https://forecast.weather.gov/MapClick.php?lat=${place.lat}&lon=${place.lon}`} target="_blank" rel="noreferrer">NWS ↗</a>
                  </div>
                </div>
              ))}
            </div>
            <LiveForecast
              places={weatherPlaces.map((place) => ({ key: place.key, label: place.label, lat: place.lat, lon: place.lon, elevationFt: place.elevationFt }))}
            />
          </div>

          <div className="nino-grid">
            <div>
              <p className="kicker">What the history says</p>
              <ul className="nino-list">
                <li>Typical days are cold: highs in the 30s and 40s and lows in the teens and 20s from Zion to Salt Lake City, with Bryce and Torrey the coldest. The Las Vegas and Hoover Dam days are the mildest, in the 50s.</li>
                <li>Over this exact window in the three biggest El Niño winters, highs ran about 3 to 6 degrees below normal along the route, and 2015–16 was snowier (about 7 inches at Springdale and 5 at Moab), while 1997–98 was mild and dry. Late December is early in the El Niño storm season.</li>
                <li>Plan for cold first, then for a possible storm. Snow totals here are model estimates over 13 days, and a single storm can matter more than the average.</li>
              </ul>
            </div>
            <div>
              <p className="kicker">Daylight (sunrise – sunset)</p>
              <div className="daylight-table" role="table" aria-label="Sunrise and sunset">
                <div className="daylight-row daylight-head" role="row">
                  <div role="columnheader">Place</div>
                  <div role="columnheader">Dec 21</div>
                  <div role="columnheader">Jan 2</div>
                </div>
                {daylight.map((row) => (
                  <div className="daylight-row" role="row" key={row.place}>
                    <div role="rowheader">{row.place}{row.note ? <small>{row.note}</small> : null}</div>
                    <div role="cell">{row.dec21}</div>
                    <div role="cell">{row.jan2}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="weather-method">
            Typical means the average of the Dec 21 to Jan 2 windows in {weatherNormalWinters}. The big El Niños are {weatherAnalogWinters.join(', ')}, the
            three events NOAA compares this one with; with only three winters, treat the differences as hints, not predictions.
            Numbers come from ERA5-based reanalysis (a model of past weather on a grid about 10 to 25 km wide, adjusted to each stop’s
            elevation), not station records, so canyon bottoms and high passes are approximate, and the model tends to run a few degrees
            colder than station normals. Wet days have at least 0.04 inches of precipitation, and snow is a model estimate.
            Sunrise and sunset are calculated for the stated time zone.
          </p>
        </section>

        <section className="nino-section" id="elnino" aria-labelledby="nino-heading">
          <header className="nino-header">
            <div>
              <p className="route-number">The forecast</p>
              <p className="kicker">NOAA Climate Prediction Center · Oct 8 and Oct 15, 2026</p>
            </div>
            <h2 id="nino-heading">A very strong El Niño is building. Stop by stop, here is what it means.</h2>
            <p className="route-deck">
              NOAA says El Niño is still strengthening. Dec 21 to Jan 2 falls in the Nov–Jan window where
              it gives 70% odds of a record-strength event. The odds describe a three-month average, not these 13 days.
            </p>
          </header>

          <div className="route-stats nino-stats" aria-label="El Niño forecast figures">
            {ninoStats.map(([label, value]) => (
              <div key={label}><span>{label}</span><strong>{value}</strong></div>
            ))}
          </div>

          <div className="nino-grid">
            <div>
              <p className="kicker">What the outlook says for the West</p>
              <ul className="nino-list">
                <li>The Oct 15 outlook favors wetter than normal for much of the West Coast (as far north as the Oregon coast) and the Southwest, with somewhat lower odds than the Southeast. NOAA’s text does not name Nevada, Arizona, or Utah. Press coverage of the Dec–Feb map puts Utah near the boundary, with equal chances of wet, normal, or dry for the Intermountain West. Check the CPC map directly.</li>
                <li>The western third of the country leans warmer, strongest from the Pacific Northwest to the northern Plains. The Southwest is at equal chances for temperature, with below-normal odds appearing only in Feb–May. Below-normal precipitation is favored for the northern Rockies, which is the dry side, and Yellowstone-type trips sit there.</li>
                <li>The wet pattern has already started in the region: October rainfall set records in southeast Utah (Escalante, Monticello, Canyonlands), and Salt Lake City had more than twice its October average. El Niño’s jet-stream effects usually build in November and December, so late December is when the tilt is expected to matter. Soaked ground raises flash-flood and washout risk for the slot canyons and Highway 12.</li>
                <li>A negative Pacific Decadal Oscillation may dampen the usual El Niño effects in places. NOAA says impacts are more likely, though not guaranteed.</li>
              </ul>
            </div>
            <div>
              <p className="kicker">How to use it</p>
              <div className="prose-stack">
                <p>A strong El Niño tilts the storm track south. It does not schedule storms, and most winter precipitation arrives in a few large systems with dry stretches between them.</p>
                <p>So the useful question is which days lose the least when a storm lands. This route keeps two-night bases at Zion, Torrey, and Moab, a Capitol Reef day that can be dropped, and slack on Jan 1 in Salt Lake City.</p>
              </div>
            </div>
          </div>

          <div className="nino-table" role="table" aria-label="Weather risk by stop">
            <div className="comparison-row comparison-head" role="row">
              <div role="columnheader">Stop</div>
              <div role="columnheader">Dates</div>
              <div role="columnheader">What can go wrong</div>
              <div role="columnheader">Fallback</div>
            </div>
            {ninoRows.map(([stop, dates, risk, fallback]) => (
              <div className="comparison-row" role="row" key={stop}>
                <div role="rowheader">{stop}</div>
                <div role="cell">{dates}</div>
                <div role="cell">{risk}</div>
                <div role="cell">{fallback}</div>
              </div>
            ))}
          </div>

          <div className="nino-dates">
            <p className="kicker">When to look again</p>
            <ol>
              {ninoDates.map(([date, text]) => (
                <li key={date}><span>{date}</span><p>{text}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="crowd-section" id="crowds" aria-labelledby="crowd-heading">
          <header className="nino-header">
            <div>
              <p className="route-number">How busy</p>
              <p className="kicker">NPS visitor counts · December 2024</p>
            </div>
            <h2 id="crowd-heading">Winter keeps most parks quiet. Zion is the exception.</h2>
            <p className="route-deck">
              December is a small fraction of peak season at every park on this route except Zion.
              Monthly averages hide the holiday week, though, and Dec 26 to Jan 1 usually runs busier than they suggest.
            </p>
          </header>

          <div className="crowd-table" role="table" aria-label="December visitation by park">
            <div className="comparison-row comparison-head" role="row">
              <div role="columnheader">Park</div>
              <div role="columnheader">Dec 2024 visits</div>
              <div role="columnheader">Per day</div>
              <div role="columnheader">Share of busiest month</div>
              <div role="columnheader">What it feels like</div>
            </div>
            {crowdRows.map((row) => (
              <div className="comparison-row" role="row" key={row.park}>
                <div role="rowheader">{row.park}</div>
                <div role="cell">{row.visits.toLocaleString('en-US')}</div>
                <div role="cell">≈ {perDay(row.visits)}</div>
                <div role="cell">
                  <div className="crowd-meter" aria-label={`${row.share}% of the busiest month`}>
                    <span style={{ width: `${row.share}%` }} />
                  </div>
                  <b>{row.share}%</b>
                </div>
                <div role="cell">{row.feel}</div>
              </div>
            ))}
          </div>

          <div className="nino-grid">
            <div>
              <p className="kicker">What the numbers say</p>
              <ul className="nino-list">
                <li>December runs near twice January at the Utah parks (Zion 1.9 times, Bryce 2.0, Arches 1.7, Capitol Reef 2.1, Canyonlands 3.3), which points to a holiday surge in the last week of the month.</li>
                <li>Zion is the only park here above a third of its peak. Visit it on Dec 25, before the shuttle starts, and at sunrise.</li>
                <li>NPS does not count Grand Canyon West, which the Hualapai Tribe runs, so there is no comparable figure. Expect it to be busy with tour groups from Las Vegas in the middle of the day and quiet after 3 pm.</li>
              </ul>
            </div>
            <div>
              <p className="kicker">What the numbers miss</p>
              <div className="prose-stack">
                <p>The gateways are busier than the parks. Springdale fills up for Zion, Las Vegas peaks around New Year’s Eve, and downtown Salt Lake City is expensive on Dec 31. Flights, cars, and hotels are tight and costly in holiday week.</p>
                <p>This is a general pattern, not something the counts measure. Book early and be at the main viewpoints and trailheads at sunrise.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="plan-section" id="plan" aria-labelledby="plan-heading">
          <header className="nino-header">
            <div>
              <p className="route-number">The plan</p>
              <p className="kicker">Bookings · rules · packing</p>
            </div>
            <h2 id="plan-heading">What to book, and what to know.</h2>
            <p className="route-deck">
              The bookings with the earliest deadlines come first. Everything here is a planning note, so confirm hours,
              prices, and rules with the official sites linked throughout.
            </p>
          </header>

          <ol className="booking-steps">
            {bookingSteps.map(([when, text]) => (
              <li key={when}><span>{when}</span><p>{text}</p></li>
            ))}
          </ol>

          <div className="plan-grid">
            {planCards.map((card) => (
              <article className="plan-card" key={card.title}>
                <h3>{card.title}</h3>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="photo-section" id="photos" aria-labelledby="photos-heading">
          <div className="photo-atlas photo-atlas-utah">
            <header className="atlas-header">
              <p className="kicker">The route in pictures</p>
              <h3 id="photos-heading">From the Hualapai rim to Temple Square.</h3>
              <p>Twelve views follow the road in order. All are licensed photographs with credits and source links.</p>
            </header>
            <div className="atlas-grid">
              {photos.map((photo) => (
                <figure className="atlas-photo" key={photo.src}>
                  <div className="atlas-image">
                    <img src={`${siteBasePath}/photos/${photo.src}`} alt={photo.alt} loading="lazy" decoding="async" />
                    <span>{photo.stop}</span>
                  </div>
                  <figcaption>
                    <strong>{photo.title}</strong>
                    <span>{photo.note}</span>
                    <small>
                      Photo: {photo.credit}, {photo.license}.{' '}
                      <a href={photo.source} target="_blank" rel="noreferrer">Source ↗</a>
                    </small>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="sources-section" aria-labelledby="sources-heading">
          <div>
            <p className="kicker">Planning sources</p>
            <h2 id="sources-heading">Use live official conditions, not this page, on travel day.</h2>
            <p>Mileage and drive times are rounded planning estimates without major weather delays. The itinerary was assembled in August 2026 and revised in October 2026 for travel from Dec 21, 2026 to Jan 2, 2027. The forecast section reflects NOAA products issued Oct 8 and Oct 15, 2026 and will be out of date after the next releases. Lodging and hours were checked against public listings in October 2026 and can change.</p>
          </div>
          <div className="source-links">
            {sources.map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noreferrer">{label}<span aria-hidden="true">↗</span></a>
            ))}
          </div>
        </section>
      </div>

      <footer>
        <div>
          <p className="kicker">West rim to red rock</p>
          <p>A working family plan for winter break 2026.</p>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
