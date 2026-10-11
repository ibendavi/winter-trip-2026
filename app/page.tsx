import RouteMap from './RouteMap';

const siteBasePath = '/winter-trip-2026';

type Tone = 'utah' | 'coast' | 'south';

type Day = {
  date: string;
  title: string;
  drive: string;
  stay: string;
  group: 'Parents visit' | 'Before the girls' | 'All six';
  description: string;
  detail?: string;
};

type RoutePhoto = {
  src: string;
  stop: string;
  title: string;
  alt: string;
  note: string;
  credit: string;
  license: string;
  source: string;
};

const parentsVisit: Day = {
  date: 'Fri–Sun · Dec 18–20',
  title: 'With the grandparents in Menlo Park',
  drive: 'No planned drive',
  stay: 'Menlo Park · nights 1 to 3',
  group: 'Parents visit',
  description: 'Your time with the grandparents comes first, so the road trip can start the moment Ayelet and Tal land. Fly out of SFO on the morning of Dec 21.',
};

const utahDays: Day[] = [
  parentsVisit,
  {
    date: 'Mon · Dec 21',
    title: 'Fly to Las Vegas, drive to Death Valley',
    drive: 'SFO → LAS flight · about 1½ hr, then ≈ 125 mi · 2½ hr',
    stay: 'Death Valley · night 1 of 2',
    group: 'Before the girls',
    description: 'You fly out of SFO in the morning while Ayelet and Tal land in Las Vegas. Collect the one-way rental, stock up on food and water, and reach Furnace Creek before the early winter dusk.',
    detail: 'Aim to land by about noon. Fill the tank in Pahrump, because fuel inside the park costs more and services are thin after dark.',
  },
  {
    date: 'Tue · Dec 22',
    title: 'Death Valley in winter',
    drive: 'Local touring · ≈ 100 mi',
    stay: 'Death Valley · night 2 of 2',
    group: 'Before the girls',
    description: 'Zabriskie Point at sunrise, Badwater Basin at 282 feet below sea level, Artists Drive, Dante’s View, and the Mesquite Flat Sand Dunes at sunset. Winter is the comfortable season here.',
    detail: 'Roads can close for days after heavy rain, and washes flood fast. Check NPS conditions each morning and keep a sheltered-walk backup.',
  },
  {
    date: 'Wed · Dec 23',
    title: 'Death Valley to Las Vegas via Red Rock',
    drive: '≈ 130 mi · 3 hr before stops',
    stay: 'Las Vegas airport hotel · 1 night',
    group: 'Before the girls',
    description: 'Leave by mid-morning and cross to Red Rock Canyon for a short loop, then finish near the airport so tomorrow’s pickup is easy.',
    detail: 'Red Rock Canyon’s scenic drive has required timed-entry reservations in recent winters. Check before counting on it.',
  },
  {
    date: 'Thu · Dec 24',
    title: 'Girls arrive in Las Vegas, drive to Zion',
    drive: '≈ 160 mi · 3¼ hr',
    stay: 'Springdale · night 1 of 2',
    group: 'All six',
    description: 'Collect Shelly and Maia at LAS, shop for the week before leaving the city, and drive to Springdale for Christmas Eve at the foot of Zion Canyon.',
    detail: 'Do the major grocery run in Las Vegas. Springdale and park-town services are thin on Christmas.',
  },
  {
    date: 'Fri · Dec 25',
    title: 'Christmas in Zion Canyon',
    drive: 'Park touring only',
    stay: 'Springdale · night 2 of 2',
    group: 'All six',
    description: 'Walk the Riverside Walk and the Pa’rus Trail, and choose Emerald Pools or the Watchman Trail by ice and daylight. A low-pressure first full day for all six.',
    detail: 'Check NPS for Zion Canyon shuttle and road status, and avoid narrow canyons when rain or snowmelt creates flood risk.',
  },
  {
    date: 'Sat · Dec 26',
    title: 'Zion to Bryce Canyon',
    drive: '≈ 90 mi · 2¼ hr',
    stay: 'Bryce Canyon area · 1 night',
    group: 'All six',
    description: 'Drive the Zion–Mount Carmel Highway through the east side, then north on US-89 and Highway 12 to Bryce. Reach the rim for sunset over the amphitheater.',
    detail: 'Bryce sits above 8,000 ft, and winter storms bring ice and short closures. Carry traction gear the rental permits, and check NPS and UDOT before leaving. Check the Zion tunnel size limits before choosing a large van.',
  },
  {
    date: 'Sun · Dec 27',
    title: 'Highway 12 to Torrey',
    drive: '≈ 115 mi · about 3 hr before stops',
    stay: 'Torrey · night 1 of 2',
    group: 'All six',
    description: 'The scenic centerpiece: Grand Staircase country and Boulder Mountain on the way to Torrey. Take a short sunrise walk on the Bryce rim before leaving.',
    detail: 'This is the trip’s main weather gate. Highway 12 reaches roughly 9,600 ft near Boulder Mountain. Use US-89 alternatives if the pass is unsafe.',
  },
  {
    date: 'Mon · Dec 28',
    title: 'A full day in Capitol Reef',
    drive: 'Local park touring',
    stay: 'Torrey · night 2 of 2',
    group: 'All six',
    description: 'Explore Fruita, the petroglyphs, Scenic Drive, and Grand Wash as conditions allow. The two-night base keeps this from becoming a pass-through, and it is the day to sacrifice if Highway 12 slips.',
  },
  {
    date: 'Tue · Dec 29',
    title: 'Torrey to Moab',
    drive: '≈ 155 mi · 3¼ hr',
    stay: 'Moab · night 1 of 2',
    group: 'All six',
    description: 'Cross the San Rafael desert to Moab, with the afternoon left for the Windows section of Arches or a Moab walk.',
  },
  {
    date: 'Wed · Dec 30',
    title: 'Arches and Canyonlands',
    drive: 'Park touring only',
    stay: 'Moab · night 2 of 2',
    group: 'All six',
    description: 'Spend the morning at Arches, choosing Delicate Arch or Devils Garden by ice and daylight, then drive up to the Island in the Sky overlooks if time allows.',
    detail: 'Microspikes add options after snow, but turn around when sandstone or exposed slickrock is icy.',
  },
  {
    date: 'Thu · Dec 31',
    title: 'Moab to Salt Lake City',
    drive: '≈ 235 mi · 4½ hr',
    stay: 'Salt Lake City · night 1 of 2',
    group: 'All six',
    description: 'A long final transfer on good highway. Start by 9 am and reach the city well before dark on New Year’s Eve.',
    detail: 'US-6 over Soldier Summit can ice during storms. Check UDOT before leaving Moab.',
  },
  {
    date: 'Fri · Jan 1',
    title: 'Salt Lake City slack day',
    drive: 'Local · optional day trip',
    stay: 'Salt Lake City · night 2 of 2',
    group: 'All six',
    description: 'Keep the day loose. Antelope Island and the Great Salt Lake are the easy outing, and the Bonneville Salt Flats are about 2 hr west if the sky is clear. The slack also absorbs a delay from any earlier storm.',
  },
  {
    date: 'Sat · Jan 2',
    title: 'Fly home from SLC',
    drive: 'Hotel → airport',
    stay: 'Trip complete',
    group: 'All six',
    description: 'Return the one-way rental at SLC. The airport is a short ride from downtown.',
  },
];

const coastDays: Day[] = [
  parentsVisit,
  {
    date: 'Mon · Dec 21',
    title: 'Fly to Portland, into the Columbia Gorge',
    drive: 'SFO → PDX flight · about 1¾ hr, then ≈ 65 mi · 1¼ hr',
    stay: 'Hood River · night 1 of 2',
    group: 'Before the girls',
    description: 'You fly out of SFO in the morning while Ayelet and Tal land in Portland. Collect the one-way rental and drive east up the Columbia River Gorge to Hood River.',
    detail: 'Winter ice storms occasionally close I-84 through the Gorge. Check TripCheck before leaving the airport, and keep Portland as the fallback base.',
  },
  {
    date: 'Tue · Dec 22',
    title: 'Waterfalls of the Gorge',
    drive: 'Local touring · ≈ 60 mi',
    stay: 'Hood River · night 2 of 2',
    group: 'Before the girls',
    description: 'Walk to Multnomah Falls and the other falls along the Historic Columbia River Highway, with lunch in the Hood River valley. Pick short walks, because trails ice over after cold snaps.',
    detail: 'Ice on the Multnomah Falls trail and the Historic Highway is common in winter. Bring traction and keep to the lower trails.',
  },
  {
    date: 'Wed · Dec 23',
    title: 'Gorge to Portland',
    drive: '≈ 65 mi · 1¼ hr',
    stay: 'Portland airport hotel · 1 night',
    group: 'Before the girls',
    description: 'A short, soft day: back in Portland by early afternoon for groceries and a few hours in the city before the girls land tomorrow.',
  },
  {
    date: 'Thu · Dec 24',
    title: 'Girls arrive in Portland, drive to Cannon Beach',
    drive: '≈ 80 mi · 1¾ hr',
    stay: 'Cannon Beach · night 1 of 2',
    group: 'All six',
    description: 'Collect Shelly and Maia at PDX and take US-26 to the coast for Christmas Eve at Haystack Rock.',
    detail: 'The north Oregon coast is the wettest stretch of the route. Check TripCheck, and keep US-26 as the inland exit.',
  },
  {
    date: 'Fri · Dec 25',
    title: 'Christmas at Cannon Beach',
    drive: 'Local touring',
    stay: 'Cannon Beach · night 2 of 2',
    group: 'All six',
    description: 'Ecola State Park, tidepools at low tide, and a long beach walk. Carry food because Christmas services are uncertain.',
  },
  {
    date: 'Sat · Dec 26',
    title: 'Cannon Beach to Yachats',
    drive: '≈ 135 mi · 3¾ hr before stops',
    stay: 'Yachats · 1 night',
    group: 'All six',
    description: 'Follow US-101 south past Lincoln City and Newport, with Cape Perpetua as the last stop before Yachats. Keep distance from exposed rocks during high surf.',
  },
  {
    date: 'Sun · Dec 27',
    title: 'Yachats to Bandon',
    drive: '≈ 100 mi · 2½ hr before stops',
    stay: 'Bandon · 1 night',
    group: 'All six',
    description: 'A compact day along the dunes and sea stacks, with room for the Oregon Dunes, lighthouses, and Bandon Beach at sunset.',
  },
  {
    date: 'Mon · Dec 28',
    title: 'Bandon to Trinidad',
    drive: '≈ 170 mi · about 4 hr before stops',
    stay: 'Trinidad or Arcata · night 1 of 2',
    group: 'All six',
    description: 'Cross into California through the Samuel H. Boardman corridor and reach the Humboldt coast before dark. Stop selectively so the short winter day does not disappear in the car.',
    detail: 'US-101 over Last Chance Grade, south of Crescent City, is the slide-prone link in wet winters. Check Caltrans before leaving Bandon, because a closure can add hours.',
  },
  {
    date: 'Tue · Dec 29',
    title: 'Redwood National and State Parks',
    drive: 'Local park touring',
    stay: 'Trinidad or Arcata · night 2 of 2',
    group: 'All six',
    description: 'Pair Newton B. Drury Scenic Parkway with Prairie Creek or Lady Bird Johnson Grove. Pick trails after checking current closures.',
    detail: 'Do not rely on Davison Road or Fern Canyon after heavy rain. The giant trees are the main event, not a single permit-dependent trail.',
  },
  {
    date: 'Wed · Dec 30',
    title: 'Avenue of the Giants to Mendocino',
    drive: '≈ 170 mi · about 4 hr before stops',
    stay: 'Mendocino · night 1 of 2',
    group: 'All six',
    description: 'Drive south through the Avenue of the Giants and on to the Mendocino coast, finishing with the headlands at sunset.',
    detail: 'Low sections of the Eel River corridor, including parts of Avenue of the Giants, have flooded in past wet winters. Check conditions before committing.',
  },
  {
    date: 'Thu · Dec 31',
    title: 'Mendocino headlands',
    drive: 'Local touring',
    stay: 'Mendocino · night 2 of 2',
    group: 'All six',
    description: 'Use Mendocino Headlands, Russian Gulch, or Van Damme to match the wind and rain. New Year’s Eve on the quiet end of the coast, and a day that doubles as slack after an earlier storm.',
  },
  {
    date: 'Fri · Jan 1',
    title: 'Mendocino to Menlo Park',
    drive: '≈ 185 mi · 4 to 4¼ hr',
    stay: 'Menlo Park · 1 night',
    group: 'All six',
    description: 'A final run south over the Golden Gate on a quiet holiday morning, ending with an evening with the grandparents, 30 minutes from SFO.',
    detail: 'Check Caltrans for Highway 128 and Highway 1 closures before leaving.',
  },
  {
    date: 'Sat · Jan 2',
    title: 'Fly home from SFO',
    drive: 'Menlo → SFO · about 30 min',
    stay: 'Trip complete',
    group: 'All six',
    description: 'Return the one-way rental at SFO.',
  },
];

const southDays: Day[] = [
  parentsVisit,
  {
    date: 'Mon · Dec 21',
    title: 'Fly to San Diego',
    drive: 'SFO → SAN flight · about 1½ hr',
    stay: 'San Diego · 1 night',
    group: 'Before the girls',
    description: 'You fly out of SFO in the morning while Ayelet and Tal land in San Diego. Collect the one-way rental, walk Torrey Pines or the Coronado shoreline, and keep the first evening easy.',
  },
  {
    date: 'Tue · Dec 22',
    title: 'San Diego to Anza-Borrego',
    drive: '≈ 85 mi · 2 hr',
    stay: 'Borrego Springs · 1 night',
    group: 'Before the girls',
    description: 'Climb through the Peninsular Ranges and descend to Borrego Springs for an afternoon at Borrego Palm Canyon. It is a certified dark-sky community, so the night sky is the main event.',
    detail: 'Anza-Borrego’s dirt roads and washes close after rain. Keep to Borrego Palm Canyon and the paved overlooks if the forecast is wet.',
  },
  {
    date: 'Wed · Dec 23',
    title: 'Borrego Springs to Palm Springs',
    drive: '≈ 85 mi · 1¾ hr',
    stay: 'Palm Springs · 1 night',
    group: 'Before the girls',
    description: 'Cross the desert to Palm Springs, and ride the Aerial Tramway up San Jacinto if conditions allow. It puts you at the airport for tomorrow’s pickup.',
    detail: 'The tramway can close for wind or ice, and the top is much colder than the valley.',
  },
  {
    date: 'Thu · Dec 24',
    title: 'Girls arrive at Palm Springs, drive to Joshua Tree',
    drive: '≈ 35 mi · 1 hr',
    stay: 'Joshua Tree · night 1 of 2',
    group: 'All six',
    description: 'Collect Shelly and Maia at PSP and drive up to the high desert for Christmas Eve.',
    detail: 'Winter flights into PSP are often connections and fill early. LAX is about 2½ to 3 hr from Joshua Tree if the girls end up there instead.',
  },
  {
    date: 'Fri · Dec 25',
    title: 'Joshua Tree National Park',
    drive: 'Park touring only',
    stay: 'Joshua Tree · night 2 of 2',
    group: 'All six',
    description: 'Build the day around Hidden Valley, the Cholla Cactus Garden, and Keys View, with Skull Rock or Cap Rock for sunset. Winter days are mild and nights can freeze.',
    detail: 'Washes and low-water crossings flood quickly after storms. Skip dirt roads when rain is in the forecast.',
  },
  {
    date: 'Sat · Dec 26',
    title: 'Joshua Tree to Ventura',
    drive: '≈ 195 mi · 4 to 4½ hr with Los Angeles traffic',
    stay: 'Ventura · night 1 of 2',
    group: 'All six',
    description: 'Cross the Los Angeles basin early and reach Ventura by mid-afternoon, with a walk along the harbor.',
    detail: 'Holiday-week traffic in the LA basin is the main variable. Leave Joshua Tree by 8 am.',
  },
  {
    date: 'Sun · Dec 27',
    title: 'Channel Islands day',
    drive: 'Boat crossing · about 1 hr each way',
    stay: 'Ventura · night 2 of 2',
    group: 'All six',
    description: 'Take the boat to Santa Cruz Island for a morning hike and a quiet lunch at the water’s edge. If the boats cancel, fall back to Ojai and the Ventura coast.',
    detail: 'Island boats cancel for swell and wind, and winter schedules are thin. Reserve as soon as the dates are firm and read the cancellation terms.',
  },
  {
    date: 'Mon · Dec 28',
    title: 'Ventura to Morro Bay via Santa Barbara',
    drive: '≈ 140 mi · about 3 hr before stops',
    stay: 'Morro Bay · night 1 of 2',
    group: 'All six',
    description: 'Follow the Gaviota coast north with lunch and a harbor walk in Santa Barbara, and reach Morro Bay by late afternoon.',
    detail: 'Slide and flood closures on US-101 around Santa Barbara have lasted days in past wet winters. Check Caltrans before leaving Ventura.',
  },
  {
    date: 'Tue · Dec 29',
    title: 'Elephant seals and Montaña de Oro',
    drive: 'Local · ≈ 70 mi round trip',
    stay: 'Morro Bay · night 2 of 2',
    group: 'All six',
    description: 'Drive north to the Piedras Blancas rookery, where elephant seals breed and pup in winter, then spend the afternoon at Montaña de Oro or Morro Rock.',
    detail: 'Stay on the marked viewing areas and give the animals distance.',
  },
  {
    date: 'Wed · Dec 30',
    title: 'Morro Bay to Monterey',
    drive: '≈ 145 mi · 3 hr',
    stay: 'Monterey · night 1 of 2',
    group: 'All six',
    description: 'Follow US-101 north through the Salinas Valley to the Monterey Peninsula, with Cannery Row at sunset.',
    detail: 'Do not plan a through-drive of Highway 1 in Big Sur. US-101 is the dependable road.',
  },
  {
    date: 'Thu · Dec 31',
    title: 'Point Lobos and the Monterey shoreline',
    drive: 'Local · ≈ 20 mi',
    stay: 'Monterey · night 2 of 2',
    group: 'All six',
    description: 'Hike Point Lobos in the morning, then spend the afternoon at the Monterey Bay Aquarium or on the Carmel shoreline. This day doubles as slack after an earlier storm.',
  },
  {
    date: 'Fri · Jan 1',
    title: 'Monterey to Menlo Park',
    drive: '≈ 85 mi · 1¾ hr',
    stay: 'Menlo Park · 1 night',
    group: 'All six',
    description: 'A short drive up the Peninsula for an evening with the grandparents, 30 minutes from SFO.',
  },
  {
    date: 'Sat · Jan 2',
    title: 'Fly home from SFO',
    drive: 'Menlo → SFO · about 30 min',
    stay: 'Trip complete',
    group: 'All six',
    description: 'Return the one-way rental at SFO.',
  },
];

const utahPhotoStory: RoutePhoto[] = [
  {
    src: 'desert-dunes.jpg',
    stop: 'Dec 22 · Mesquite Flat Dunes',
    title: 'Winter is the gentle season in the valley',
    alt: 'Sand dunes in evening light with rugged mountains rising behind in Death Valley National Park',
    note: 'Go near sunset, when the light rakes across the dunes and the walk is cool.',
    credit: 'Tuxyso',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Death_Valley_Mesquite_Flats_Sand_Dunes_2013.jpg',
  },
  {
    src: 'utah-zion.jpg',
    stop: 'Dec 25 · Zion',
    title: 'Christmas under snow-dusted cliffs',
    alt: 'Snowy red cliffs on the east side of Zion National Park',
    note: 'A low-pressure first full day in the park for all six.',
    credit: 'Zion National Park',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Winter_on_the_East_Side_(6888172987).jpg',
  },
  {
    src: 'utah-bryce.jpg',
    stop: 'Dec 26 · Bryce Canyon',
    title: 'Hoodoos under snow',
    alt: 'Snow around the hoodoos at Bryce Canyon National Park',
    note: 'Reach the rim for sunset, then return for a short sunrise walk before Highway 12.',
    credit: 'Bigwiggy',
    license: 'CC BY 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Bryce_Canyon_National_Park,_Utah,_In_winter.jpg',
  },
  {
    src: 'utah-highway12.jpg',
    stop: 'Dec 27 · Highway 12',
    title: 'The road is the centerpiece',
    alt: 'A wide view across colorful mountains from Scenic Byway 12 near Boulder Mountain',
    note: 'Take the high route only when the forecast and pavement both cooperate.',
    credit: 'S. Clyde / NARA',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Scenic_Byway_12_-_A_Sweeping_View_from_Boulder_Mountain_-_NARA_-_7721710.jpg',
  },
  {
    src: 'utah-capitol-reef.jpg',
    stop: 'Dec 28 · Capitol Reef',
    title: 'Red rock under winter snow',
    alt: 'Snowy desert valley and Chimney Rock in Capitol Reef National Park',
    note: 'A full park day from Torrey, with room to adjust to ice and short daylight.',
    credit: 'National Park Service',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Chimney_Rock_Loop_in_Winter_(9d1158db-8cb4-4db0-ba52-897559007cc4).JPG',
  },
  {
    src: 'utah-arches.jpg',
    stop: 'Dec 30 · Arches',
    title: 'Delicate Arch, if the slickrock allows',
    alt: 'Delicate Arch surrounded by winter snow in Arches National Park',
    note: 'Choose Delicate Arch or Devils Garden by ice and daylight.',
    credit: 'Guyyoung1966',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Delicate_Arch_in_Arches_National_Park_draped_in_a_winter_snow.jpg',
  },
  {
    src: 'utah-canyonlands.jpg',
    stop: 'Dec 30 · Canyonlands',
    title: 'One last immense Moab view',
    alt: 'Layered red canyons seen from Grand View Point in Canyonlands National Park',
    note: 'Island in the Sky works as an afternoon detour from Moab.',
    credit: 'Myrabella',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Canyonlands_NP_Grand_View_Point_Overlook.jpg',
  },
  {
    src: 'utah-antelope.jpg',
    stop: 'Jan 1 · Antelope Island',
    title: 'The easy outing on the slack day',
    alt: 'Bison on Antelope Island above the Great Salt Lake at sunset',
    note: 'Use it only if everyone’s energy and the winter daylight allow.',
    credit: 'Matthew Dillon',
    license: 'CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Antelope_Island_State_Park,_Great_Salt_Lake_(49408253886).jpg',
  },
];

const coastPhotoStory: RoutePhoto[] = [
  {
    src: 'coast-cannon-beach.jpg',
    stop: 'Dec 24 · Cannon Beach',
    title: 'Christmas Eve at Haystack Rock',
    alt: 'Haystack Rock and the Needles rising from the sea at low tide on Cannon Beach',
    note: 'Walk the beach at low tide, and stay off the rocks when surf is running high.',
    credit: 'King of Hearts',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Cannon_Beach_October_2019_003.jpg',
  },
  {
    src: 'coast-cape-perpetua.jpg',
    stop: 'Dec 26 · Cape Perpetua',
    title: 'Forest meets an exposed winter ocean',
    alt: 'High viewpoint over forested Cape Perpetua and the Oregon coastline',
    note: 'Use overlooks and sheltered walks according to wind and surf conditions.',
    credit: 'U.S. Forest Service',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Cape_Perpetua_Whispering_Spruce_View_4.jpg',
  },
  {
    src: 'coast-yachats.jpg',
    stop: 'Dec 26 · Yachats',
    title: 'A night at the Pacific edge',
    alt: 'Sun breaking through winter clouds over waves and dark rocks near Yachats, Oregon',
    note: 'Keep well back from exposed rocks when swell and sneaker-wave risk are high.',
    credit: 'Little Mountain 5',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Coast_near_Yachats,_Oregon_1.JPG',
  },
  {
    src: 'coast-boardman.jpg',
    stop: 'Dec 28 · Samuel H. Boardman',
    title: 'Fog and sea stacks, heading south',
    alt: 'Forested cliffs and sea stacks in fog along the southern Oregon coast',
    note: 'Choose a few viewpoints rather than racing every pullout before dark.',
    credit: 'Dougtone',
    license: 'CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Samuel_H._Boardman_State_Scenic_Corridor_-_Oregon_-_7405365820.jpg',
  },
  {
    src: 'coast-prairie-creek.jpg',
    stop: 'Dec 29 · Prairie Creek',
    title: 'A full day beneath the canopy',
    alt: 'Lush green ferns and enormous redwood trunks in Prairie Creek Redwoods State Park',
    note: 'The forest remains the main event even when rain closes secondary roads.',
    credit: 'California State Parks',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Prairie_Creek_Redwoods_State_Park.jpg',
  },
  {
    src: 'coast-avenue-giants.jpg',
    stop: 'Dec 30 · Avenue of the Giants',
    title: 'The long drive earns its name',
    alt: 'A narrow road passing between towering redwoods on Avenue of the Giants',
    note: 'Make this the major stop between the redwoods and Mendocino.',
    credit: 'Dougtone',
    license: 'CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Avenue_of_the_Giants_-_California_-_7402263454.jpg',
  },
];

const ninoStats = [
  ['Niño-3.4 index in the Oct 8 update', '+2.1 °C'],
  ['Chance of a strong-to-very strong El Niño through Jan–Mar 2027', '> 83%'],
  ['Chance Nov–Jan is a record event, stronger than any since 1950', '70%'],
  ['Above-normal precipitation odds near the California coast, Dec–Feb', '50–60%'],
];

const ninoRows = [
  [
    'Death Valley + Utah',
    'Death Valley sits in a rain shadow, and southern Utah is at the edge of the Four Corners wet tilt. The outlook text names the Four Corners rather than Utah itself, so check the CPC map before relying on it.',
    'Flash floods and road closures in Death Valley. Snow and ice at Bryce, Boulder Mountain, and Highway 12 on Dec 26 and 27. Ice on US-6 over Soldier Summit on Dec 31.',
    'Moderate',
  ],
  [
    'Pacific coast',
    'The strongest wet tilt on the West Coast: California coast odds reach 50 to 60%, and the favored area may extend through central Oregon or farther north. The interior Northwest leans drier.',
    'Atmospheric rivers, large surf and sneaker waves, slides on US-101, river flooding, and ice storms in the Gorge. One main road, and mostly one-night moves.',
    'Highest',
  ],
  [
    'Southern coast + desert',
    'The southern half of California is inside the wet tilt, but the days between storms are mild, and the desert stops sit in the rain shadow of the coastal ranges. Monterey is nearer the strongest coastal odds.',
    'Mudslides and closures on US-101 near Santa Barbara, cancelled island boats, flash floods in desert washes, Los Angeles basin traffic. No snow passes.',
    'High rain, no snow',
  ],
];

const ninoDates = [
  ['Oct 15', 'CPC releases its next seasonal outlooks. Check whether the California and Southwest odds rose; CPC said they might.'],
  ['Nov 12', 'CPC’s next ENSO update. Pick a route and book flights soon after: the three options use different first airports (LAS, PDX, SAN), so flights commit the choice. Prefer changeable fares until then.'],
  ['Dec 17', 'CPC’s December outlook, and a first look at the 8 to 14 day outlook for Dec 21 to 31. Use it to settle car class, traction gear, and which days are slack, not to change airports.'],
  ['Dec 20', 'Last look before you leave Menlo. Every route has three soft days before the girls arrive, so a storm in the first days means swapping the order of early stops, not cancelling.'],
];

const sources = [
  ['NOAA ENSO diagnostic discussion, Oct 8 2026', 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.shtml'],
  ['NOAA seasonal outlook discussion, Sept 17 2026', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/fxus05.html'],
  ['NOAA seasonal outlook maps', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/'],
  ['NOAA 8 to 14 day outlook', 'https://www.cpc.ncep.noaa.gov/products/predictions/814day/'],
  ['Death Valley conditions', 'https://www.nps.gov/deva/planyourvisit/conditions.htm'],
  ['Zion seasons and weather', 'https://home.nps.gov/zion/planyourvisit/seasons.htm'],
  ['Bryce Canyon in winter', 'https://www.nps.gov/brca/planyourvisit/winter.htm'],
  ['Capitol Reef Scenic Drive', 'https://www.nps.gov/care/planyourvisit/scenicdrive.htm'],
  ['Capitol Reef directions and Highway 12', 'https://home.nps.gov/care/planyourvisit/directions.htm'],
  ['Arches winter guide', 'https://www.nps.gov/arch/planyourvisit/winter.htm'],
  ['Southern Utah parks in winter', 'https://www.nps.gov/articles/000/national-parks-in-southern-utah.htm'],
  ['Utah road conditions (UDOT)', 'https://www.udottraffic.utah.gov/'],
  ['Nevada winter driving', 'https://www.dot.nv.gov/safety/safe-winter-driving'],
  ['Oregon winter driving and TripCheck', 'https://www.oregon.gov/odot/Pages/Winter-Driver-Responsibilities.aspx'],
  ['Redwood current conditions', 'https://www.nps.gov/redw/planyourvisit/conditions.htm'],
  ['Redwood scenic drives', 'https://www.nps.gov/redw/planyourvisit/drives.htm'],
  ['Caltrans chain requirements', 'https://dot.ca.gov/travel/winter-driving-tips/chain-requirements'],
  ['California road conditions (QuickMap)', 'https://quickmap.dot.ca.gov/'],
  ['Channel Islands conditions', 'https://www.nps.gov/chis/planyourvisit/conditions.htm'],
  ['Joshua Tree weather', 'https://www.nps.gov/jotr/planyourvisit/weather.htm'],
];

function Itinerary({ days, tone }: { days: Day[]; tone: Tone }) {
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

function RoutePhotoAtlas({
  photos,
  tone,
  heading,
  description,
}: {
  photos: RoutePhoto[];
  tone: 'utah' | 'coast';
  heading: string;
  description: string;
}) {
  return (
    <section className={`photo-atlas photo-atlas-${tone}`} aria-label={`${heading} photo guide`}>
      <header className="atlas-header">
        <p className="kicker">The route in pictures</p>
        <h3>{heading}</h3>
        <p>{description}</p>
      </header>
      <div className="atlas-grid">
        {photos.map((photo) => (
          <figure className="atlas-photo" key={photo.src}>
            <div className="atlas-image">
              <img
                src={`${siteBasePath}/photos/${photo.src}`}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
              />
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
    </section>
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
            <a href="#elnino">El Niño</a>
            <a href="#utah">Utah</a>
            <a href="#coast">Coast</a>
            <a href="#south">South</a>
            <a href="#decision">Compare</a>
          </div>
          <span>Dec 21, 2026 · Jan 2, 2027</span>
        </nav>

        <div className="hero-copy" id="top">
          <p className="kicker">Three airports, three roads</p>
          <h1>One family.<br />Three wild directions.</h1>
          <p className="lede">
            See the grandparents first. Meet Ayelet and Tal at a western airport on Dec 21, gather all six by Christmas Eve,
            then choose red rock, redwoods, or the southern deserts, with a very strong El Niño now shaping the odds.
          </p>
        </div>

        <div className="hero-choices" aria-label="Route summaries">
          <a className="hero-choice hero-utah" href="#utah">
            <span>01 · Death Valley + Utah</span>
            <strong>LAS → Zion → Moab → SLC</strong>
          </a>
          <a className="hero-choice hero-coast" href="#coast">
            <span>02 · Pacific edge</span>
            <strong>PDX → Redwoods → SFO</strong>
          </a>
          <a className="hero-choice hero-south" href="#south">
            <span>03 · Southern coast + desert</span>
            <strong>SAN → Joshua Tree → SFO</strong>
          </a>
        </div>
      </section>

      <div id="main-content">
        <section className="brief-section" aria-labelledby="brief-heading">
          <div className="section-label">The fixed pieces</div>
          <div className="brief-copy">
            <h2 id="brief-heading">The route bends around the family calendar.</h2>
            <p>
              You spend Dec 18 to 20 with the grandparents, then fly from SFO on Dec 21 to meet Ayelet and Tal
              at the route’s first airport. Shelly and Maia join Dec 24, and everyone flies home Jan 2.
              Starting from a western airport rather than SFO opens roads that were out of reach, and none includes a ski day.
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
            <h2 id="map-heading">Three roads, three starting airports.</h2>
            <p>Tap a route to isolate it. Scroll-wheel zoom stays off so the page remains easy to navigate; use the map controls to zoom.</p>
          </div>
          <RouteMap />
        </section>

        <section className="nino-section" id="elnino" aria-labelledby="nino-heading">
          <header className="nino-header">
            <div>
              <p className="route-number">The forecast</p>
              <p className="kicker">NOAA Climate Prediction Center · Oct 8, 2026</p>
            </div>
            <h2 id="nino-heading">A very strong El Niño is building. Plan for storms.</h2>
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
                <li>Wetter than normal is favored across the southern half of California and the Four Corners. California odds rise toward the coast through winter and may reach central Oregon, or farther north.</li>
                <li>The interior Northwest leans drier than normal, and most of the West leans warmer. The warm tilt over the Southwest fades to equal chances as winter goes on.</li>
                <li>A negative Pacific Decadal Oscillation and cooler water near the West Coast may dampen the usual El Niño effects in places. NOAA says impacts are more likely, though not guaranteed.</li>
              </ul>
            </div>
            <div>
              <p className="kicker">How to use it</p>
              <div className="prose-stack">
                <p>A strong El Niño tilts the storm track. It does not schedule storms, and most West Coast winter rain arrives in a few large systems with dry stretches between them.</p>
                <p>So the useful question is not which route stays dry. It is which route loses the least when a storm lands on a travel day. That favors routes with two-night bases and an inland way out.</p>
              </div>
            </div>
          </div>

          <div className="nino-table" role="table" aria-label="El Niño exposure by route">
            <div className="comparison-row comparison-head" role="row">
              <div role="columnheader">Route</div>
              <div role="columnheader">What the outlook points to</div>
              <div role="columnheader">What can go wrong</div>
              <div role="columnheader">Exposure</div>
            </div>
            {ninoRows.map(([route, signal, risk, exposure]) => (
              <div className="comparison-row" role="row" key={route}>
                <div role="rowheader">{route}</div>
                <div role="cell">{signal}</div>
                <div role="cell">{risk}</div>
                <div role="cell"><strong>{exposure}</strong></div>
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

        <section className="more-section" id="more" aria-labelledby="more-heading">
          <div className="section-label">What changed</div>
          <div className="brief-copy">
            <h2 id="more-heading">A Dec 21 meet-up frees the route from SFO.</h2>
            <p>
              The earlier plans started from SFO because the whole group was in Menlo Park together. With you joining
              Ayelet and Tal at the first stop, each route now begins at its own airport and, for two of them, ends at SFO,
              30 minutes from the grandparents for a free evening on Jan 1.
            </p>
          </div>
          <div className="more-notes">
            <p className="kicker">Considered and set aside</p>
            <ul className="nino-list">
              <li>Salt Lake City to Las Vegas, the earlier Utah plan: three early days in northern Utah are the weakest part, and the Death Valley start replaces them.</li>
              <li>Phoenix, Sedona, and the Grand Canyon: inside the Southwest wet tilt, with snow likely at the South Rim.</li>
              <li>Sequoia and Yosemite: no longer on the way, and chain controls are common in winter.</li>
            </ul>
          </div>
        </section>

        <section className="route-section utah-section" id="utah" aria-labelledby="utah-heading">
          <header className="route-header">
            <div>
              <p className="route-number">Option 01</p>
              <p className="kicker">Rain shadow · red rock · high plateau</p>
            </div>
            <h2 id="utah-heading">Death Valley to the Utah parks</h2>
            <p className="route-deck">
              Start in the lowest, warmest desert, return to Las Vegas for the girls, then climb through Zion, Bryce,
              and Capitol Reef to Moab and Salt Lake City. Treat Highway 12 as a weather gate, not a commitment.
            </p>
          </header>

          <div className="route-stats" aria-label="Death Valley and Utah route statistics">
            <div><span>Planning distance</span><strong>≈ 1,250 mi</strong></div>
            <div><span>Longest normal leg</span><strong>4½ hr</strong></div>
            <div><span>Full-family bases</span><strong>5 + DV</strong></div>
            <div><span>Airports</span><strong>SFO · LAS · SLC</strong></div>
          </div>

          <figure className="panorama panorama-utah">
            <img src={`${siteBasePath}/photos/desert-zabriskie.jpg`} alt="Golden light on the badlands at Zabriskie Point in Death Valley National Park" />
            <figcaption>Zabriskie Point, Death Valley. Photo: Mac H, CC BY-SA 2.0. <a href="https://commons.wikimedia.org/wiki/File:Zabriskie_Point,_Death_Valley_National_Park_-_Flickr_-_Mac_H_(media601).jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
          </figure>

          <div className="route-summary-grid">
            <div>
              <p className="kicker">Why this route</p>
              <h3>Warm desert first, then a plateau of red rock.</h3>
            </div>
            <div className="prose-stack">
              <p>The first three days are Death Valley and Red Rock, in the season when the valley is comfortable and the Sierra rain shadow often keeps it clear. Shelly and Maia land in Las Vegas on Dec 24, and all six drive north together to Zion.</p>
              <p>The weak point is high-elevation weather on Highway 12 and Bryce on Dec 26 and 27. The route has two-night bases at Death Valley, Springdale, Torrey, and Moab, a Capitol Reef day that can be sacrificed, and a Jan 1 slack day in Salt Lake City.</p>
            </div>
          </div>

          <Itinerary days={utahDays} tone="utah" />

          <RoutePhotoAtlas
            photos={utahPhotoStory}
            tone="utah"
            heading="From the lowest desert to the high red rock."
            description="Eight views follow the road in order, so the landscape changes with the itinerary instead of appearing as a disconnected gallery."
          />

          <div className="rule-row">
            <aside className="weather-card">
              <p className="kicker">The Utah rule</p>
              <blockquote>Book the landscape. Do not book your attachment to one exact road.</blockquote>
              <p>Reserve cancellable lodging and rentals, carry traction gear the vehicle permits, and choose the lower route whenever the high road is questionable.</p>
            </aside>
          </div>

          <aside className="compressed-plan">
            <div>
              <p className="kicker">If a storm closes Highway 12</p>
              <h3>Hold in Bryce, not on the pass.</h3>
            </div>
            <p>If Boulder Mountain is closed on Dec 27, stay put, then take a US-89 alternative to Torrey when roads allow. Capitol Reef is the day to sacrifice: you still reach Moab on Dec 29, and the Jan 1 slack in Salt Lake City absorbs the rest.</p>
          </aside>
        </section>

        <section className="route-section coast-section" id="coast" aria-labelledby="coast-heading">
          <header className="route-header">
            <div>
              <p className="route-number">Option 02</p>
              <p className="kicker">Gorge · sea stacks · redwoods</p>
            </div>
            <h2 id="coast-heading">Portland down the coast to Menlo Park</h2>
            <p className="route-deck">
              The coast run in reverse: the Columbia Gorge before the girls, then Oregon and California south
              to the grandparents. No snow passes, more rain exposure, and a finish at SFO.
            </p>
          </header>

          <div className="route-stats" aria-label="Pacific coast route statistics">
            <div><span>Planning distance</span><strong>≈ 1,050 mi</strong></div>
            <div><span>Longest normal leg</span><strong>4¼ hr</strong></div>
            <div><span>Full-family bases</span><strong>5 + Menlo</strong></div>
            <div><span>Airports</span><strong>SFO · PDX · SFO</strong></div>
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
              <p>The three days before the girls are the Columbia Gorge and Portland. From Dec 24 all six move south with no mid-trip flight, ending with two nights each at Cannon Beach and Mendocino, a redwoods stay, and an evening with the grandparents.</p>
              <p>This trades snow risk for the full force of the El Niño outlook: rain, wind, surf, flooding, slides, and treefall. It is the route most directly under the strongest wet tilt, so it works only by choosing among nearby walks instead of depending on one marquee trail.</p>
            </div>
          </div>

          <Itinerary days={coastDays} tone="coast" />

          <RoutePhotoAtlas
            photos={coastPhotoStory}
            tone="coast"
            heading="From Haystack Rock to giant redwoods."
            description="Six views trace the coastal route south, with the shoreline wilder at first and the forest denser after the California line."
          />

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
              <p className="kicker">If an atmospheric river lines up</p>
              <h3>Hold a night, then go.</h3>
            </div>
            <p>Stay where you are for one more night and swap headlands for forest walks. Mendocino’s second night on Dec 31 is built-in slack, and Menlo Park is only 30 minutes from the airport on Jan 2.</p>
          </aside>
        </section>

        <section className="route-section south-section" id="south" aria-labelledby="south-heading">
          <header className="route-header">
            <div>
              <p className="route-number">Option 03</p>
              <p className="kicker">Dark skies · islands · elephant seals</p>
            </div>
            <h2 id="south-heading">San Diego north to Menlo Park</h2>
            <p className="route-deck">
              The mildest winter temperatures of any option and no snow passes, with the most rain on paper.
              Storms arrive in pulses, and the desert stops let you drive out from under them.
            </p>
          </header>

          <div className="route-stats" aria-label="Southern route statistics">
            <div><span>Planning distance</span><strong>≈ 900 mi</strong></div>
            <div><span>Longest normal leg</span><strong>4¼ hr</strong></div>
            <div><span>Full-family bases</span><strong>4 + Menlo</strong></div>
            <div><span>Airports</span><strong>SAN · PSP · SFO</strong></div>
          </div>

          <figure className="panorama panorama-south">
            <img src={`${siteBasePath}/photos/south-joshua-tree.jpg`} alt="Teddy bear cholla cactus with desert mountains under a blue sky in Joshua Tree National Park" />
            <figcaption>Cholla Cactus Garden, Joshua Tree National Park. Photo: Mojnsen, CC BY 4.0. <a href="https://commons.wikimedia.org/wiki/File:Cholla_Cactus_Garden,_Joshua_Tree_National_Park.jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
          </figure>

          <div className="route-summary-grid">
            <div>
              <p className="kicker">Why this route</p>
              <h3>Desert first, then the coast home without touching snow.</h3>
            </div>
            <div className="prose-stack">
              <p>Anza-Borrego, Palm Springs, and Joshua Tree fill the days before and just after the girls arrive, at a comfortable winter temperature. Then the road turns to the Channel Islands, the Piedras Blancas elephant seals, and Monterey, ending with the grandparents.</p>
              <p>The cost is weather exposure on the coast: slides on US-101 and cancelled island boats. The desert sits in the rain shadow of the coastal ranges, so a wet coast does not always mean a wet desert, although desert washes flood quickly.</p>
            </div>
          </div>

          <Itinerary days={southDays} tone="south" />

          <div className="photo-grid coast-photos">
            <figure className="photo-tall">
              <img src={`${siteBasePath}/photos/south-point-lobos.jpg`} alt="Rocky coves and blue Pacific water at Point Lobos State Natural Reserve" />
              <figcaption>Point Lobos, Dec 31. Photo: Brocken Inaglory, CC BY-SA 3.0. <a href="https://commons.wikimedia.org/wiki/File:Point_Lobos_3.jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
            </figure>
            <figure>
              <img src={`${siteBasePath}/photos/south-channel-islands.jpg`} alt="A cove with kayakers below steep green cliffs on Santa Cruz Island" />
              <figcaption>Santa Cruz Island, Dec 27. Photo: Joyful Graphics, CC BY-SA 4.0. <a href="https://commons.wikimedia.org/wiki/File:Channel_Islands_National_Park_-_Santa_Cruz_Island_-_beach_area_with_kayakers.jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
            </figure>
            <aside className="weather-card">
              <p className="kicker">The southern rule</p>
              <blockquote>Let the storm decide which side of the mountains you sleep on.</blockquote>
              <p>When the coast is soaked, the desert is usually the dry side of the storm, and when the desert is cold and windy, the coast is mild. Keep both ready and move early.</p>
            </aside>
          </div>

          <aside className="compressed-plan">
            <div>
              <p className="kicker">If a storm sits on Southern California</p>
              <h3>Move to the dry side.</h3>
            </div>
            <p>If the coast is soaked from Dec 26 to 29, stay in the desert a night longer and shorten the coast to Santa Barbara and Morro Bay, skipping the island boat. Monterey on Dec 31 is slack, and Menlo Park is 30 minutes from the airport on Jan 2.</p>
          </aside>
        </section>

        <section className="decision-section" id="decision" aria-labelledby="decision-heading">
          <div className="section-intro">
            <p className="kicker">The decision</p>
            <h2 id="decision-heading">Pick the risk you prefer.</h2>
            <p>All three options fit the family calendar. The choice is not “good versus bad weather.” It is snow and elevation versus rain and coastal disruption, with a strong El Niño changing the odds on each.</p>
          </div>

          <div className="comparison-table" role="table" aria-label="Route comparison">
            <div className="comparison-row comparison-head" role="row">
              <div role="columnheader">Question</div>
              <div role="columnheader">01 Death Valley + Utah</div>
              <div role="columnheader">02 Pacific coast</div>
              <div role="columnheader">03 Southern coast + desert</div>
            </div>
            {[
              ['Visual payoff', 'Highest: badlands, snow, red rock, immense scale', 'High: redwoods, sea stacks, storm light', 'Medium-high: islands, seals, Joshua Tree, dark skies'],
              ['Solitude', 'High in Death Valley and between parks; mixed in Zion and Arches', 'Medium-high throughout, especially north of Mendocino', 'Medium: busy holiday coast, quiet in Anza-Borrego'],
              ['Weather exposure', 'Snow and ice on high roads; flash floods in the desert', 'Rain, surf, slides, river flooding, Gorge ice', 'Rain and mudslides; no snow passes; desert washes flood'],
              ['El Niño exposure', 'Moderate; Death Valley is in a rain shadow', 'Highest; the strongest wet tilt on the West Coast', 'High rain, mild temperatures'],
              ['Hotel rhythm', 'Two-night bases at Death Valley, Springdale, Torrey, Moab', 'Two nights at Hood River, Cannon Beach, Trinidad, Mendocino', 'Two nights at Joshua Tree, Ventura, Morro Bay, Monterey'],
              ['Flights', 'You fly SFO to LAS; girls land LAS; home from SLC', 'You fly SFO to PDX; girls land PDX; home from SFO', 'You fly SFO to SAN; girls land PSP (or LAX); home from SFO'],
              ['Extra time with the grandparents', 'None after Dec 20', 'Jan 1 evening', 'Jan 1 evening'],
              ['Can it switch late?', 'No; flights commit it by mid-November', 'No; flights commit it by mid-November', 'No; flights commit it by mid-November'],
              ['Best for', 'A dramatic, adventurous sequel to the Phoenix trip', 'Avoiding the Rockies while keeping nature dominant', 'The mildest weather and the best finish near the grandparents'],
            ].map(([label, utah, coast, south]) => (
              <div className="comparison-row" role="row" key={label}>
                <div role="rowheader">{label}</div>
                <div role="cell">{utah}</div>
                <div role="cell">{coast}</div>
                <div role="cell">{south}</div>
              </div>
            ))}
          </div>

          <div className="recommendation">
            <p className="kicker">Current lean</p>
            <h3>Lead with Death Valley and Utah.</h3>
            <p>It starts in a rain-shadow desert, has two-night bases at every stop, and keeps a slack day on Jan 1 at an easy airport. Its one high-consequence stretch, Highway 12 on Dec 26 and 27, has a US-89 alternative. The El Niño outlook weighs most heavily against the Pacific coast, which sits under the strongest wet tilt. If the group wants no snow risk at all, option 03 is the fallback. Revisit after the Oct 15 and Nov 12 updates, and before booking flights.</p>
          </div>
        </section>

        <section className="checklist-section" aria-labelledby="checklist-heading">
          <div>
            <p className="kicker">Before anything becomes nonrefundable</p>
            <h2 id="checklist-heading">Four decisions unlock the bookings.</h2>
          </div>
          <ol className="booking-list">
            <li><span>01</span><p>Pick the route by mid-November, then price flights: you from SFO, and Ayelet and Tal, to the first airport on Dec 21; Shelly and Maia to the Dec 24 airport (LAS, PDX, or PSP); everyone home Jan 2 from SLC or SFO.</p></li>
            <li><span>02</span><p>Compare six-person vehicle capacity with luggage, one-way fees (LAS to SLC, PDX to SFO, SAN to SFO), winter tires, and the rental company’s traction-device policy. One six-person vehicle for the whole trip is simplest unless a mid-trip swap is cheaper.</p></li>
            <li><span>03</span><p>Book cancellable two-night bases first: Death Valley, Springdale, Torrey, and Moab; Hood River, Cannon Beach, Trinidad, and Mendocino; or Joshua Tree, Ventura, Morro Bay, and Monterey.</p></li>
            <li><span>04</span><p>Set the weather calls: the NOAA dates in the forecast section, seven days out for major rerouting, and every morning for roads, trails, daylight, and surf.</p></li>
          </ol>
        </section>

        <section className="sources-section" aria-labelledby="sources-heading">
          <div>
            <p className="kicker">Planning sources</p>
            <h2 id="sources-heading">Use live official conditions, not this page, on travel day.</h2>
            <p>Mileage and drive times are rounded planning estimates without major weather delays. The itinerary was assembled in August 2026 and revised in October 2026 for travel from Dec 21, 2026 to Jan 2, 2027. The forecast section reflects NOAA products issued Sept 17 and Oct 8, 2026 and will be out of date after the next releases.</p>
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
          <p className="kicker">Three airports, three roads</p>
          <p>A working family plan for winter break 2026.</p>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
