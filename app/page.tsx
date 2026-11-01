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

const ninoStats = [
  ['Niño-3.4 index in the Oct 8 update', '+2.1 °C'],
  ['Chance of a strong-to-very strong El Niño through Jan–Mar 2027', '> 83%'],
  ['Chance Nov–Jan is a record event, stronger than any since 1950', '70%'],
  ['Typical high at Phoenix, Ajo, and Tucson in the three big El Niño winters', '55–58 °F'],
];

const ninoRows: Array<[string, string, string, string]> = [
  ['Apache Trail and Tortilla Flat', 'Dec 21–22', 'Rain or ice and rockfall on the road, and a possibly closed gravel stretch beyond Tortilla Flat. The paved road to Canyon Lake and Tortilla Flat is low risk when dry.', 'Skip the trail and do Boyce Thompson and Globe only.'],
  ['Globe and Tonto', 'Dec 22–23', 'Cold mornings at about 3,500 ft, with rain or a dusting of snow possible.', 'Drop Tonto and drive straight to the Phoenix area on Dec 23.'],
  ['Phoenix airport nights', 'Dec 23, Jan 1', 'Low risk. Phoenix averaged 58 °F, with almost no extra rain, in the three big El Niño Decembers.', 'None needed.'],
  ['Gila Bend to Ajo', 'Dec 24', 'Low risk. Wind and blowing dust are the usual problems.', 'None needed.'],
  ['Organ Pipe', 'Dec 25–26', 'Unpaved roads can run with water after rain, and a border closure order restricts some roads.', 'Walk near the visitor center and the Ajo plaza, and call the park first.'],
  ['Ajo to Tucson', 'Dec 26', 'Low risk, except flooded washes on State Route 86 after heavy rain.', 'Check 511 and use AZ-85, I-8, and I-10 if State Route 86 is closed.'],
  ['Tucson', 'Dec 26–28, 30–31', 'Cold more than wet: highs averaged 55 °F in the three big El Niño Decembers, and 51 °F in 1982.', 'Swap museum days with outdoor days.'],
  ['Tubac, Tombstone, Bisbee', 'Dec 29–30', 'The high, cold stop at 4,500 to 5,300 ft: highs about 47 °F in the big El Niños, with a little snow. Ice is possible on State Route 82 near Sonoita.', 'Do Tumacacori and Tombstone as a day trip from Tucson and skip the Bisbee night.'],
  ['Tucson to Phoenix', 'Jan 1', 'Low risk. I-10 is a major road.', 'None needed.'],
];

const ninoDates = [
  ['Oct 15 (done)', 'Seasonal outlook: Southwest wetter, Southwest temperatures at equal chances, northern Rockies drier. Arizona is not named.'],
  ['Nov 12', 'NOAA’s next ENSO update. Book flights, the rental, and lodging with free cancellation soon after.'],
  ['Nov 19', 'NOAA’s November seasonal outlook, with a shorter lead for Dec–Feb. Check whether Arizona moves off the Southwest wet tilt.'],
  ['Dec 5', 'The 16-day forecast reaches Dec 21. The live forecast on this page starts filling in.'],
  ['Dec 17', 'NOAA’s December outlook, and a first look at the 8 to 14 day outlook for Dec 21 to 31. Use it to settle which days are slack.'],
  ['Dec 20', 'Last look before you leave Menlo. If a storm hits Arizona on Dec 21 to 23, do the Apache Trail on a later dry day or skip it.'],
];

const bookingSteps: Array<[string, string]> = [
  ['This week', 'Book the Kartchner Caverns tour for Dec 30 first, because holiday slots sell out. Hold lodging with free cancellation: the Sonoran Desert Inn in Ajo (very few rooms), the Copper Queen in Bisbee, a Tucson base, and the Apache Junction, Globe, and airport-area nights. Holiday week fills first.'],
  ['By mid-November', 'Book flights: you SFO to PHX and Ayelet and Tal to PHX on Dec 21; Shelly and Maia to PHX on Dec 24; everyone home from PHX on Jan 2. Book one six-person vehicle round trip from PHX, which avoids a one-way fee.'],
  ['Before Dec 21', 'Call Organ Pipe (520-387-6849) about Ajo Mountain Drive and the border closures, the Queen Mine (520-432-2071), and Tonto National Monument. Check 511 for the Apache Trail. An America the Beautiful pass usually covers the national park site fees, so compare it with the per-vehicle fees.'],
  ['Dec 5 and Dec 17', 'Check the live forecast on this page, then NOAA’s outlook, and set the slack-day plan.'],
];

const planCards: Array<{ title: string; items: string[] }> = [
  {
    title: 'Time zones',
    items: [
      'Arizona stays on Mountain Standard Time all year and does not observe daylight saving time, so in winter it matches Pacific time.',
      'Every stop on this route is in Arizona, so there is no time-zone change.',
    ],
  },
  {
    title: 'Driving',
    items: [
      'One round-trip rental from PHX, with a six-seat vehicle.',
      'Fuel up at Gila Bend, before State Route 86 from Ajo, and before the Apache Trail. Services are thin.',
      'Cell coverage is patchy at Organ Pipe, on State Route 86, and in the Apache Trail canyons. Download offline maps.',
      'Watch for wildlife at dusk, and never drive into a running wash.',
      'Expect a Border Patrol checkpoint on I-19 near Tubac and a Border Patrol presence near the border. Carry passports or photo IDs.',
    ],
  },
  {
    title: 'Pack for the desert',
    items: [
      'Layers that work from 30 °F nights to 55–60 °F days, and a warmer layer, hat, and gloves for Bisbee.',
      'Sun protection, because the desert sun is strong even in December.',
      'A headlamp: the sun sets by 5:30 pm everywhere.',
      'Water and snacks for Organ Pipe and the Apache Trail.',
    ],
  },
  {
    title: 'Rules worth knowing',
    items: [
      'Organ Pipe: the visitor center is closed Dec 25, but the monument is open 24 hours. A border closure order covers some roads, so call first.',
      'Tumacacori, Kartchner Caverns, and Boyce Thompson Arboretum are closed on Dec 25.',
      'Kartchner tours need advance reservations.',
      'Stay out of washes and slot canyons when rain is forecast upstream.',
    ],
  },
];

const sources: Array<[string, string]> = [
  ['NOAA ENSO diagnostic discussion, Oct 8 2026', 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.shtml'],
  ['NOAA seasonal outlook discussion, Oct 15 2026', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/fxus05.html'],
  ['NOAA seasonal outlook maps', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/'],
  ['NOAA 8 to 14 day outlook', 'https://www.cpc.ncep.noaa.gov/products/predictions/814day/'],
  ['NWS Phoenix forecast', 'https://www.weather.gov/psr/'],
  ['NWS Tucson forecast', 'https://www.weather.gov/twc/'],
  ['Organ Pipe alerts and conditions', 'https://home.nps.gov/orpi/planyourvisit/conditions.htm'],
  ['Organ Pipe hours and seasons', 'https://home.nps.gov/orpi/planyourvisit/hours.htm'],
  ['Tumacacori hours', 'https://www.nps.gov/tuma/planyourvisit/hours.htm'],
  ['Tonto National Monument hours', 'https://www.nps.gov/tont/planyourvisit/hours.htm'],
  ['Kartchner Caverns State Park', 'https://azstateparks.com/kartchner'],
  ['Boyce Thompson Arboretum', 'https://btarboretum.org/visit'],
  ['Lost Dutchman State Park', 'https://azstateparks.com/lost-dutchman'],
  ['Arizona road conditions (511)', 'https://az511.com/'],
  ['Phoenix Sky Harbor airport', 'https://www.skyharbor.com/'],
  ['NPS passes', 'https://www.nps.gov/planyourvisit/passes.htm'],
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
  const weatherPlaces = weatherKeys.filter((key) => placeWeather[key]).map((key) => ({ key, ...placeWeather[key] }));

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
            <a href="#plan">Plan</a>
          </div>
          <span>Dec 21, 2026 · Jan 2, 2027</span>
        </nav>

        <div className="hero-copy" id="top">
          <p className="kicker">Winter break 2026 · Phoenix to Tucson</p>
          <h1>The warm<br />desert loop.</h1>
          <p className="lede">
            Thirteen days in the Arizona low desert: the Superstition Mountains and the Apache Trail, Globe and the Tonto
            cliff dwellings, Organ Pipe Cactus National Monument, Tucson, Tombstone, Bisbee, and Kartchner Caverns.
            Six travelers from Dec 24, one rental, one airport.
          </p>
        </div>

        <div className="hero-facts" aria-label="Trip at a glance">
          <div><strong>12</strong><span>nights on the road</span></div>
          <div><strong>≈ 1,050</strong><span>miles of driving</span></div>
          <div><strong>6</strong><span>stays to book</span></div>
          <div><strong>PHX ↔ PHX</strong><span>fly in, fly out</span></div>
        </div>
      </section>

      <div id="main-content">
        <section className="brief-section" aria-labelledby="brief-heading">
          <div className="section-label">The shape of it</div>
          <div className="brief-copy">
            <h2 id="brief-heading">Warm days, dark skies, one airport.</h2>
            <p>
              Ayelet found the Utah plan too cold, so this version stays in the Arizona low desert: highs near 60 °F in a normal
              winter and about 55 to 58 °F in the three big El Niño winters. You spend Dec 18 to 20 with the grandparents, then fly from SFO
              on Dec 21 to meet Ayelet and Tal in Phoenix. The first three days circle east of the airport, through the Superstitions,
              the Apache Trail, Globe, and Tonto. Shelly and Maia land in Phoenix on Dec 24 and all six drive to Ajo and Organ Pipe for
              Christmas, then to Tucson with one night in Bisbee. Everyone flies home from Phoenix on Jan 2.
            </p>
          </div>
          <div className="constraint-grid">
            <div><strong>6</strong><span>travelers after Dec 24</span></div>
            <div><strong>2¾h</strong><span>longest single leg</span></div>
            <div><strong>0</strong><span>ski days</span></div>
            <div><strong>3</strong><span>flexible or slack days</span></div>
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
            <div><span>Planning distance</span><strong>≈ 1,050 mi</strong></div>
            <div><span>Longest single leg</span><strong>2¾ hr</strong></div>
            <div><span>Full-family bases</span><strong>Ajo · Tucson · Bisbee</strong></div>
            <div><span>Airports</span><strong>SFO · PHX</strong></div>
          </div>

          <figure className="panorama panorama-utah">
            <img src={`${siteBasePath}/photos/az-superstitions.jpg`} alt="The jagged cliffs of the Superstition Mountains above the desert at Lost Dutchman State Park" />
            <figcaption>The Superstition Mountains. Photo: Beyond My Ken, CC BY-SA 4.0. <a href="https://commons.wikimedia.org/wiki/File:2021_Superstition_Mountains_from_Lost_Dutchman_State_Park_1.jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
          </figure>

          <ol className="timeline timeline-utah">
            {days.map((day, index) => (
              <DayCard key={day.id} day={day} index={index} />
            ))}
          </ol>

          <aside className="compressed-plan">
            <div>
              <p className="kicker">If a storm is forecast for Dec 29</p>
              <h3>Stay low, and skip Bisbee.</h3>
            </div>
            <p>Bisbee is the one high, cold stop. If rain or snow is forecast, do Tumacacori and Tombstone as a day trip from Tucson and skip the Bisbee night. Dec 28, Dec 31, and Jan 1 are flexible or slack days, so a bad-weather day can move without losing a stop.</p>
          </aside>
        </section>

        <section className="stays-section" id="stays" aria-labelledby="stays-heading">
          <header className="nino-header">
            <div>
              <p className="route-number">Where to sleep</p>
              <p className="kicker">Six stays · top pick and alternatives</p>
            </div>
            <h2 id="stays-heading">Places to spend the night.</h2>
            <p className="route-deck">
              A top pick for each stop, with alternatives if it is full. Picks come from public listings and search results, and none has been
              confirmed for December 2026. The two airport-area nights are not researched. Check before booking, and book with free cancellation.
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
              trip dates over the last 30 winters, and how the three strongest El Niño winters compared. Only some stops are measured so far.
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
                <li>Typical days are mild: highs near 60 °F at Phoenix, Ajo, and Tucson, with lows in the upper 30s to low 40s. Bisbee at 5,300 ft is the cold stop, with highs around 54 °F. Globe and Apache Junction are cooler or warmer by elevation and are added once their data load.</li>
                <li>Over this exact window in the three biggest El Niño winters, highs ran about 4 to 8 degrees below normal at the stops measured (Phoenix 58 °F, Ajo 58, Tucson 55, Bisbee 47), with almost no extra rain at the low stops. 1982–83 was the coldest of the three (Tucson 51 °F, Bisbee 42). Late December is early in the El Niño storm season.</li>
                <li>Plan for cool nights first, then for a possible storm. Snow totals here are model estimates over 13 days, and a single storm can matter more than the average.</li>
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
            <h2 id="nino-heading">A very strong El Niño is building. Here is how it touches southern Arizona.</h2>
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
                <li>The Oct 15 outlook favors wetter than normal for much of the West Coast and the Southwest, and says nothing about Arizona by name. In the three big El Niño Decembers in this exact window, Phoenix, Ajo, and Tucson were no wetter than normal. The wet signal is a season-long tilt, and late December is early.</li>
                <li>The western third of the country leans warmer, but the Southwest is at equal chances for temperature. The three big El Niño winters ran 4 to 8 degrees colder than normal here, and that cold, not rain, is the bigger effect on this trip.</li>
                <li>Southern Arizona is not the dry side (that is the northern Rockies, too cold for this trip). In an earlier comparison for this project, Texas and the southern plains were the most affected places in this window: Dallas had almost twice its normal rain, and El Paso ran 8 degrees colder.</li>
              </ul>
            </div>
            <div>
              <p className="kicker">How to use it</p>
              <div className="prose-stack">
                <p>A strong El Niño tilts the storm track south. It does not schedule storms, and most winter precipitation arrives in a few large systems with dry stretches between them.</p>
                <p>So the useful question is which days lose the least when a storm lands. This plan keeps the one high stop (Bisbee) to a single night, keeps Tucson as a five-night base, and leaves Dec 28, Dec 31, and Jan 1 flexible.</p>
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
              <h3 id="photos-heading">From the Superstitions to Bisbee.</h3>
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
            <p>Mileage and drive times are rounded planning estimates without major weather delays. This Phoenix to Tucson itinerary was assembled in November 2026 for travel from Dec 21, 2026 to Jan 2, 2027, replacing an earlier Utah version. The forecast section reflects NOAA products issued Oct 8 and Oct 15, 2026 and will be out of date after the next releases. Lodging and hours come from public listings and search results in November 2026 and can change; the day cards say which items were not checked.</p>
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
          <p className="kicker">The warm desert loop</p>
          <p>A working family plan for winter break 2026.</p>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
