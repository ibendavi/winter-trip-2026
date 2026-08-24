import RouteMap from './RouteMap';

const siteBasePath = '/winter-trip-2026';

type Day = {
  date: string;
  title: string;
  drive: string;
  stay: string;
  group: 'Core four' | 'All six';
  description: string;
  detail?: string;
};

const utahDays: Day[] = [
  {
    date: 'Fri · Dec 18',
    title: 'Arrive SFO, settle in Menlo Park',
    drive: 'SFO → Menlo · about 30 min',
    stay: 'Menlo Park · night 1 of 3',
    group: 'Core four',
    description: 'Land, collect the one-way rental, and keep the first evening quiet with the grandparents.',
    detail: 'Use a rental class that explicitly permits compatible traction devices. AWD does not cancel California chain controls.',
  },
  {
    date: 'Sat · Dec 19',
    title: 'Parents day',
    drive: 'No planned drive',
    stay: 'Menlo Park · night 2 of 3',
    group: 'Core four',
    description: 'A full family day with no sightseeing agenda. This protects the required parents time before the road trip begins.',
  },
  {
    date: 'Sun · Dec 20',
    title: 'Parents, groceries, weather decision',
    drive: 'Local only',
    stay: 'Menlo Park · night 3 of 3',
    group: 'Core four',
    description: 'Second full parents day. Buy road food and make the first weather call on Donner Pass before cancellation windows close.',
    detail: 'If a Sierra storm is lining up, activate the SFO → SLC flight fallback and start the rental in Salt Lake City.',
  },
  {
    date: 'Mon · Dec 21',
    title: 'Cross the Sierra to Reno',
    drive: '≈ 240 mi · 4 hr in clear conditions',
    stay: 'Reno · 1 night',
    group: 'Core four',
    description: 'Leave after breakfast, stop in Truckee or at Donner Lake, and reach Reno well before dark.',
    detail: 'This is the trip’s first weather gate. Check Caltrans chain controls and the I-80 forecast before leaving Menlo.',
  },
  {
    date: 'Tue · Dec 22',
    title: 'The Great Basin: Reno to Elko',
    drive: '≈ 290 mi · 4 to 4¼ hr',
    stay: 'Elko · 1 night',
    group: 'Core four',
    description: 'A wide-open transit day across northern Nevada. Break in Winnemucca and keep the Humboldt basin drive in daylight.',
  },
  {
    date: 'Wed · Dec 23',
    title: 'Salt flats to Salt Lake City',
    drive: '≈ 230 mi · 3½ hr',
    stay: 'Salt Lake City · night 1 of 2',
    group: 'Core four',
    description: 'Cross Wendover and pause at the Bonneville Salt Flats if roads and light cooperate. Arrive with a buffer before the holiday.',
  },
  {
    date: 'Thu · Dec 24',
    title: 'Girls arrive in Salt Lake City',
    drive: 'Airport plus optional local outing',
    stay: 'Salt Lake City · night 2 of 2',
    group: 'All six',
    description: 'Keep the day flexible around Shelly and Maia’s flights. If timing works, use Antelope Island or the Great Salt Lake as the first all-family outing.',
    detail: 'Do the major grocery run here. Christmas Day dining and park-town services can be sparse.',
  },
  {
    date: 'Fri · Dec 25',
    title: 'Salt Lake City to Moab',
    drive: '≈ 235 mi · 4 hr',
    stay: 'Moab · night 1 of 2',
    group: 'All six',
    description: 'A clean southbound transition into red-rock country. Carry lunch and dinner options because Christmas services are uncertain.',
  },
  {
    date: 'Sat · Dec 26',
    title: 'Arches in winter',
    drive: 'Park touring only',
    stay: 'Moab · night 2 of 2',
    group: 'All six',
    description: 'Build the day from short stops at the Windows and Balanced Rock, then choose Delicate Arch or Devils Garden according to ice and daylight.',
    detail: 'Microspikes add options after snow, but turn around when sandstone or exposed slickrock is icy.',
  },
  {
    date: 'Sun · Dec 27',
    title: 'Canyonlands, then Torrey',
    drive: '≈ 155 mi · 2½ to 2¾ hr, plus park roads',
    stay: 'Torrey · night 1 of 2',
    group: 'All six',
    description: 'Use the morning for Island in the Sky overlooks, then cross to Torrey. Skip the park detour if weather makes the transfer tight.',
  },
  {
    date: 'Mon · Dec 28',
    title: 'A full day in Capitol Reef',
    drive: 'Local park touring',
    stay: 'Torrey · night 2 of 2',
    group: 'All six',
    description: 'Explore Fruita, the petroglyphs, Scenic Drive, and Grand Wash as conditions allow. The two-night base keeps this from becoming a pass-through.',
  },
  {
    date: 'Tue · Dec 29',
    title: 'Highway 12, Bryce, and Kanab',
    drive: '≈ 205 mi · about 4 hr before stops',
    stay: 'Kanab · night 1 of 2',
    group: 'All six',
    description: 'The scenic centerpiece: Boulder Mountain, Grand Staircase country, and the Bryce amphitheater before finishing in Kanab.',
    detail: 'This is the second major weather gate. Highway 12 reaches roughly 9,600 ft near Boulder Mountain. Use US-89 alternatives if the pass is unsafe.',
  },
  {
    date: 'Wed · Dec 30',
    title: 'Kanab choice day',
    drive: 'About 1 to 3 hr, depending on choice',
    stay: 'Kanab · night 2 of 2',
    group: 'All six',
    description: 'Choose Zion’s east side and main canyon, or a quieter Grand Staircase day with Toadstool Hoodoos and Coral Pink Sand Dunes.',
    detail: 'Avoid narrow washes and slot canyons when rain or snowmelt creates flood risk.',
  },
  {
    date: 'Thu · Dec 31',
    title: 'Kanab to Las Vegas',
    drive: '≈ 200 mi · 3 hr',
    stay: 'Las Vegas airport hotel · 1 night',
    group: 'All six',
    description: 'A deliberately easy final transfer with time to absorb a late start or a stop in Zion if it was missed the day before.',
    detail: 'For Dec 31 departures, book afternoon or evening flights and leave Kanab early. Jan 1 flights make the schedule much calmer.',
  },
  {
    date: 'Fri · Jan 1',
    title: 'Fly home from LAS',
    drive: 'Hotel → airport',
    stay: 'Trip complete',
    group: 'All six',
    description: 'Return the one-way rental at LAS. Keep Jan 2 as the contingency day rather than filling it in advance.',
  },
];

const coastDays: Day[] = [
  {
    date: 'Fri · Dec 18',
    title: 'Arrive SFO, settle in Menlo Park',
    drive: 'SFO → Menlo · about 30 min',
    stay: 'Menlo Park',
    group: 'Core four',
    description: 'Land, collect the one-way rental, and spend the evening with the grandparents.',
  },
  {
    date: 'Sat · Dec 19',
    title: 'Parents day',
    drive: 'No planned drive',
    stay: 'Menlo Park',
    group: 'Core four',
    description: 'A protected family day with no sightseeing agenda.',
  },
  {
    date: 'Sun · Dec 20',
    title: 'Parents and a slow Peninsula day',
    drive: 'Local only',
    stay: 'Menlo Park',
    group: 'Core four',
    description: 'Second full parents day. Use the afternoon for groceries and a first check of coastal storms and Highway 1 conditions.',
  },
  {
    date: 'Mon · Dec 21',
    title: 'Monterey and Point Lobos',
    drive: '≈ 90 mi · about 2 hr',
    stay: 'Monterey · night 1 of 2',
    group: 'Core four',
    description: 'Move south for a coastal opening day. Hike Point Lobos, then use sunset and dinner in Monterey rather than adding more road time.',
  },
  {
    date: 'Tue · Dec 22',
    title: 'Pinnacles day trip',
    drive: '≈ 125 mi · about 3 hr round trip',
    stay: 'Monterey · night 2 of 2',
    group: 'Core four',
    description: 'Winter brings cooler hiking weather. Choose the Bear Gulch side and calibrate the loop to daylight and cave access.',
    detail: 'The east and west park entrances do not connect by road. Navigate to the chosen entrance, not merely to “Pinnacles.”',
  },
  {
    date: 'Wed · Dec 23',
    title: 'Big Sur north, then back to Menlo',
    drive: '≈ 95 to 150 mi · 2 to 3½ hr',
    stay: 'Menlo Park',
    group: 'Core four',
    description: 'Use the open northern section of Highway 1 for Bixby Bridge and coastal stops, then return to Menlo before holiday traffic builds.',
    detail: 'Do not make the plan depend on a through-drive of Highway 1. Check Caltrans and turn around wherever closures or weather dictate.',
  },
  {
    date: 'Thu · Dec 24',
    title: 'Girls arrive at SFO',
    drive: 'Airport transfer only',
    stay: 'Menlo Park',
    group: 'All six',
    description: 'Shelly and Maia join at the easiest airport on this route. Keep the evening with the grandparents and pack for the northbound leg.',
  },
  {
    date: 'Fri · Dec 25',
    title: 'Menlo Park to Mendocino',
    drive: '≈ 170 mi · 3¼ to 3¾ hr',
    stay: 'Mendocino · night 1 of 2',
    group: 'All six',
    description: 'Cross the Golden Gate early and make a measured run to Mendocino. Carry food because Christmas services are uncertain.',
  },
  {
    date: 'Sat · Dec 26',
    title: 'Mendocino headlands',
    drive: 'Local touring',
    stay: 'Mendocino · night 2 of 2',
    group: 'All six',
    description: 'Use Mendocino Headlands, Russian Gulch, or Van Damme to match the wind and rain. A two-night stay preserves a real weather window.',
  },
  {
    date: 'Sun · Dec 27',
    title: 'Avenue of the Giants to Trinidad',
    drive: '≈ 230 mi · 4¼ to 4¾ hr before stops',
    stay: 'Trinidad or Arcata · night 1 of 2',
    group: 'All six',
    description: 'The route’s longest normal day. Leave early, use Avenue of the Giants as the major stop, and reach the Humboldt coast before dark.',
  },
  {
    date: 'Mon · Dec 28',
    title: 'Redwood National and State Parks',
    drive: 'Local park touring',
    stay: 'Trinidad or Arcata · night 2 of 2',
    group: 'All six',
    description: 'Pair Newton B. Drury Scenic Parkway with Prairie Creek or Lady Bird Johnson Grove. Pick trails after checking current closures.',
    detail: 'Do not rely on Davison Road or Fern Canyon after heavy rain. The giant trees are the main event, not a single permit-dependent trail.',
  },
  {
    date: 'Tue · Dec 29',
    title: 'Redwoods to Bandon',
    drive: '≈ 190 mi · 3¼ hr before stops',
    stay: 'Bandon · 1 night',
    group: 'All six',
    description: 'Cross into Oregon and use selected Samuel H. Boardman viewpoints. Stop selectively so the short winter day does not disappear in the car.',
  },
  {
    date: 'Wed · Dec 30',
    title: 'Bandon to Yachats',
    drive: '≈ 135 mi · 3 hr before stops',
    stay: 'Yachats · 1 night',
    group: 'All six',
    description: 'A compact coast day with room for shore walks, lighthouses, and Cape Perpetua. Keep distance from exposed rocks during high surf.',
  },
  {
    date: 'Thu · Dec 31',
    title: 'Yachats to Portland',
    drive: '≈ 155 mi · 2¾ hr',
    stay: 'Portland airport hotel · 1 night',
    group: 'All six',
    description: 'Turn inland for a low-stress airport finish. The PDX night protects Jan 1 departures from coastal weather and holiday traffic.',
  },
  {
    date: 'Fri · Jan 1',
    title: 'Fly home from PDX',
    drive: 'Hotel → airport',
    stay: 'Trip complete',
    group: 'All six',
    description: 'Return the one-way rental at PDX. Keep Jan 2 as the contingency day.',
  },
];

const sources = [
  ['Caltrans chain requirements', 'https://dot.ca.gov/travel/winter-driving-tips/chain-requirements'],
  ['Nevada winter driving', 'https://www.dot.nv.gov/safety/safe-winter-driving'],
  ['Southern Utah parks in winter', 'https://www.nps.gov/articles/000/national-parks-in-southern-utah.htm'],
  ['Arches winter guide', 'https://www.nps.gov/arch/planyourvisit/winter.htm'],
  ['Capitol Reef Scenic Drive', 'https://www.nps.gov/care/planyourvisit/scenicdrive.htm'],
  ['Capitol Reef directions and Highway 12', 'https://home.nps.gov/care/planyourvisit/directions.htm'],
  ['Bryce Canyon in winter', 'https://www.nps.gov/brca/planyourvisit/winter.htm'],
  ['Zion seasons and weather', 'https://home.nps.gov/zion/planyourvisit/seasons.htm'],
  ['Redwood current conditions', 'https://www.nps.gov/redw/planyourvisit/conditions.htm'],
  ['Redwood scenic drives', 'https://www.nps.gov/redw/planyourvisit/drives.htm'],
  ['Oregon winter driving and TripCheck', 'https://www.oregon.gov/odot/Pages/Winter-Driver-Responsibilities.aspx'],
  ['California road conditions', 'https://roads.dot.ca.gov/'],
];

function Itinerary({ days, tone }: { days: Day[]; tone: 'utah' | 'coast' }) {
  return (
    <ol className={`timeline timeline-${tone}`}>
      {days.map((day, index) => (
        <li className="day-card" key={`${tone}-${day.date}`}>
          <div className="day-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
          <div className="day-date">{day.date}</div>
          <div className="day-main">
            <div className="day-heading">
              <h3>{day.title}</h3>
              <span className={`group-pill ${day.group === 'All six' ? 'all-six' : ''}`}>{day.group}</span>
            </div>
            <p>{day.description}</p>
            {day.detail && <p className="day-detail">Watch point: {day.detail}</p>}
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
      ))}
    </ol>
  );
}

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#main-content">Skip to trip options</a>

      <section className="hero">
        <nav className="topline" aria-label="Trip navigation">
          <a href="#top" className="wordmark">Ben-David winter break</a>
          <div className="nav-links">
            <a href="#map">Map</a>
            <a href="#utah">Utah</a>
            <a href="#coast">Coast</a>
            <a href="#decision">Compare</a>
          </div>
          <span>Dec 18, 2026 · Jan 1, 2027</span>
        </nav>

        <div className="hero-copy" id="top">
          <p className="kicker">Two roads west</p>
          <h1>One family.<br />Two wild directions.</h1>
          <p className="lede">
            Start with the grandparents in Menlo Park. Gather all six by Christmas Eve.
            Then choose high desert and red rock, or redwoods and the Pacific edge.
          </p>
        </div>

        <div className="hero-choices" aria-label="Route summaries">
          <a className="hero-choice hero-utah" href="#utah">
            <span>01 · Sierra + red rock</span>
            <strong>SFO → Utah parks → LAS</strong>
          </a>
          <a className="hero-choice hero-coast" href="#coast">
            <span>02 · Pacific edge</span>
            <strong>SFO → Redwoods → PDX</strong>
          </a>
        </div>
      </section>

      <div id="main-content">
        <section className="brief-section" aria-labelledby="brief-heading">
          <div className="section-label">The fixed pieces</div>
          <div className="brief-copy">
            <h2 id="brief-heading">The route bends around the family calendar.</h2>
            <p>
              The plan uses the wider Shelly and Maia window: join Dec 24, depart Jan 1.
              The first three nights stay in Menlo Park, with two protected full days for the grandparents.
              Neither option returns to SFO at the end.
            </p>
          </div>
          <div className="constraint-grid">
            <div><strong>6</strong><span>travelers after Dec 24</span></div>
            <div><strong>3–4h</strong><span>normal driving target</span></div>
            <div><strong>0</strong><span>ski days</span></div>
            <div><strong>High</strong><span>nature + solitude</span></div>
          </div>
        </section>

        <section className="map-section" id="map" aria-labelledby="map-heading">
          <div className="section-intro light">
            <p className="kicker">Shared route map</p>
            <h2 id="map-heading">The continental arc, or the coastal line.</h2>
            <p>Tap a route to isolate it. Scroll-wheel zoom stays off so the page remains easy to navigate; use the map controls to zoom.</p>
          </div>
          <RouteMap />
        </section>

        <section className="route-section utah-section" id="utah" aria-labelledby="utah-heading">
          <header className="route-header">
            <div>
              <p className="route-number">Option 01</p>
              <p className="kicker">Sierra · Great Basin · red rock</p>
            </div>
            <h2 id="utah-heading">Menlo Park to the Utah parks</h2>
            <p className="route-deck">
              The bigger visual payoff and the better match to the Phoenix trip’s spirit, with one condition:
              treat Donner Pass and Highway 12 as weather gates, not commitments.
            </p>
          </header>

          <div className="route-stats" aria-label="Utah route statistics">
            <div><span>Planning distance</span><strong>≈ 1,450 mi</strong></div>
            <div><span>Longest normal leg</span><strong>4¼ hr</strong></div>
            <div><span>Full-family bases</span><strong>4 + LAS</strong></div>
            <div><span>Airports</span><strong>SFO · SLC · LAS</strong></div>
          </div>

          <figure className="panorama panorama-utah">
            <img src={`${siteBasePath}/photos/utah-arches.jpg`} alt="Delicate Arch surrounded by winter snow in Arches National Park" />
            <figcaption>Arches after snow. Photo: Guyyoung1966, CC BY-SA 4.0. <a href="https://commons.wikimedia.org/wiki/File:Delicate_Arch_in_Arches_National_Park_draped_in_a_winter_snow.jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
          </figure>

          <div className="route-summary-grid">
            <div>
              <p className="kicker">Why this route</p>
              <h3>Cold, clear, and genuinely different every two days.</h3>
            </div>
            <div className="prose-stack">
              <p>The Great Basin gives the core four a solitary opening. Shelly and Maia join at SLC, then the all-family section settles into two-night bases at Moab, Torrey, and Kanab.</p>
              <p>The weak point is not the daily mileage. It is high-elevation weather. A cancellable SFO-to-SLC fallback keeps a Sierra storm from wrecking the whole route.</p>
            </div>
          </div>

          <Itinerary days={utahDays} tone="utah" />

          <div className="photo-grid">
            <figure className="photo-tall">
              <img src={`${siteBasePath}/photos/utah-bryce.jpg`} alt="Snow around the hoodoos at Bryce Canyon National Park" />
              <figcaption>Bryce Canyon in winter. Photo: Bigwiggy, CC BY 4.0. <a href="https://commons.wikimedia.org/wiki/File:Bryce_Canyon_National_Park,_Utah,_In_winter.jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
            </figure>
            <figure>
              <img src={`${siteBasePath}/photos/utah-zion.jpg`} alt="Snowy red cliffs on the east side of Zion National Park" />
              <figcaption>Zion’s east side in winter. Photo: Zion National Park. <a href="https://commons.wikimedia.org/wiki/File:Winter_on_the_East_Side_(6888172987).jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
            </figure>
            <aside className="weather-card">
              <p className="kicker">The Utah rule</p>
              <blockquote>Book the landscape. Do not book your attachment to one exact road.</blockquote>
              <p>Reserve cancellable lodging and rentals, carry traction gear the vehicle permits, and choose the lower route whenever the high road is questionable.</p>
            </aside>
          </div>

          <aside className="compressed-plan">
            <div>
              <p className="kicker">If the girls only have Dec 25–31</p>
              <h3>Cut Moab, not the breathing room.</h3>
            </div>
            <p>Have them join in SLC, then run SLC → Capitol Reef → Bryce/Kanab → Zion → LAS. That preserves two-night bases and avoids turning the holiday into a string of arrivals.</p>
          </aside>
        </section>

        <section className="route-section coast-section" id="coast" aria-labelledby="coast-heading">
          <header className="route-header">
            <div>
              <p className="route-number">Option 02</p>
              <p className="kicker">Headlands · redwoods · sea stacks</p>
            </div>
            <h2 id="coast-heading">Menlo Park to the Oregon coast</h2>
            <p className="route-deck">
              A single continuous road trip with less snow exposure, more rain exposure,
              and long stretches where the road itself is the destination.
            </p>
          </header>

          <div className="route-stats" aria-label="Pacific coast route statistics">
            <div><span>Planning distance</span><strong>≈ 1,050 mi</strong></div>
            <div><span>Longest normal leg</span><strong>4¾ hr</strong></div>
            <div><span>Full-family bases</span><strong>4 + PDX</strong></div>
            <div><span>Airports</span><strong>SFO · PDX</strong></div>
          </div>

          <figure className="panorama panorama-coast">
            <img src={`${siteBasePath}/photos/coast-redwoods.jpg`} alt="Fog filtering through a dense old-growth redwood forest" />
            <figcaption>Fog in Redwood National Park. Photo: Michael Schweppe, CC BY-SA 2.0. <a href="https://commons.wikimedia.org/wiki/File:Redwood_National_Park,_fog_in_the_forest.jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
          </figure>

          <div className="route-summary-grid">
            <div>
              <p className="kicker">Why this route</p>
              <h3>A continuous migration through bigger trees and smaller towns.</h3>
            </div>
            <div className="prose-stack">
              <p>The core four take a Monterey and Pinnacles loop, return to Menlo for the girls, then all six move north together. There is no mid-trip flight and no return to the Bay Area.</p>
              <p>This swaps snow risk for rain, wind, surf, flooding, slides, and treefall. The route remains viable by choosing among nearby walks instead of depending on one marquee trail.</p>
            </div>
          </div>

          <Itinerary days={coastDays} tone="coast" />

          <div className="photo-grid coast-photos">
            <figure className="photo-tall">
              <img src={`${siteBasePath}/photos/coast-mendocino.jpg`} alt="Late sunset over the rocky Mendocino coast" />
              <figcaption>Mendocino coast at sunset. Photo: Nelson Minar, CC BY-SA 2.0. <a href="https://commons.wikimedia.org/wiki/File:Mendocino_coast,_late_sunset.jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
            </figure>
            <figure>
              <img src={`${siteBasePath}/photos/coast-bandon.jpg`} alt="Sea stacks along Bandon Beach on the Oregon coast" />
              <figcaption>Bandon sea stacks. Photo: Gary Halvorson, Oregon State Archives, CC BY 4.0. <a href="https://commons.wikimedia.org/wiki/File:Sea_Stacks,_Bandon_Beach,_Bandon_-_DPLA_-_d530ab00036474a60d9b7d6c1ea48a8e.jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
            </figure>
            <aside className="weather-card">
              <p className="kicker">The coast rule</p>
              <blockquote>Plan regions and bases, not a list of mandatory trails.</blockquote>
              <p>Check Caltrans, Redwood park conditions, Oregon TripCheck, surf warnings, and daylight every morning. Walk the forest when the headlands are unpleasant.</p>
            </aside>
          </div>

          <aside className="compressed-plan">
            <div>
              <p className="kicker">If the girls only have Dec 25–31</p>
              <h3>Drop Yachats.</h3>
            </div>
            <p>Use one Mendocino night, two Redwood nights, one Bandon night, then reach Portland on Dec 30. It is tighter, but still coherent. Do not force the full coast sequence into six nights.</p>
          </aside>
        </section>

        <section className="decision-section" id="decision" aria-labelledby="decision-heading">
          <div className="section-intro">
            <p className="kicker">The decision</p>
            <h2 id="decision-heading">Pick the risk you prefer.</h2>
            <p>Both routes fit the family calendar. The choice is not “good versus bad weather.” It is snow and elevation versus rain and coastal disruption.</p>
          </div>

          <div className="comparison-table" role="table" aria-label="Route comparison">
            <div className="comparison-row comparison-head" role="row">
              <div role="columnheader">Question</div>
              <div role="columnheader">Utah parks</div>
              <div role="columnheader">Pacific coast</div>
            </div>
            {[
              ['Visual payoff', 'Highest: snow, red rock, immense scale', 'High: redwoods, sea stacks, storm light'],
              ['Solitude', 'High between parks; mixed in Arches and Zion', 'Medium-high throughout, especially north of Mendocino'],
              ['Weather exposure', 'Higher consequence: chains, snow, high passes', 'Frequent but usually lower consequence: rain, wind, slides'],
              ['Hotel rhythm', 'More two-night bases', 'More one-night moves after the redwoods'],
              ['Best logistical feature', 'SLC pickup and LAS finish fit the girls cleanly', 'One rental and one continuous northbound story'],
              ['Best for', 'A more dramatic, adventurous sequel to the Phoenix trip', 'Avoiding the Rockies while keeping nature dominant'],
            ].map(([label, utah, coast]) => (
              <div className="comparison-row" role="row" key={label}>
                <div role="rowheader">{label}</div>
                <div role="cell">{utah}</div>
                <div role="cell">{coast}</div>
              </div>
            ))}
          </div>

          <div className="recommendation">
            <p className="kicker">Current lean</p>
            <h3>Choose Utah if the Dec 24–Jan 1 window holds.</h3>
            <p>It delivers the stronger family trip, as long as the Sierra flight fallback stays real and the group accepts rerouting around Highway 12. Choose the coast if minimizing snow exposure is the first priority.</p>
          </div>
        </section>

        <section className="checklist-section" aria-labelledby="checklist-heading">
          <div>
            <p className="kicker">Before anything becomes nonrefundable</p>
            <h2 id="checklist-heading">Four decisions unlock the bookings.</h2>
          </div>
          <ol className="booking-list">
            <li><span>01</span><p>Confirm Shelly and Maia’s exact arrival and departure dates, then price the matching open-jaw flights.</p></li>
            <li><span>02</span><p>Compare six-person vehicle capacity with luggage, one-way fees, winter tires, and the rental company’s traction-device policy.</p></li>
            <li><span>03</span><p>Book cancellable two-night bases first: Moab, Torrey, Kanab, or Mendocino and Trinidad.</p></li>
            <li><span>04</span><p>Set two weather calls: seven days out for major rerouting, and every morning for roads, trails, daylight, and surf.</p></li>
          </ol>
        </section>

        <section className="sources-section" aria-labelledby="sources-heading">
          <div>
            <p className="kicker">Planning sources</p>
            <h2 id="sources-heading">Use live official conditions, not this page, on travel day.</h2>
            <p>Mileage and drive times are rounded planning estimates without major weather delays. The itinerary was assembled in August 2026 for travel beginning Dec 18, 2026.</p>
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
          <p className="kicker">Two roads west</p>
          <p>A working family plan for winter break 2026.</p>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
