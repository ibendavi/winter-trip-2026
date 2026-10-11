import RouteMap from './RouteMap';

const siteBasePath = '/winter-trip-2026';

type Tone = 'utah' | 'coast' | 'south' | 'desert';

type Day = {
  date: string;
  title: string;
  drive: string;
  stay: string;
  group: 'Core four' | 'All six';
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

// Dec 21 to Dec 24 are identical for every route that starts by car from SFO.
const sfStartDays: Day[] = [
  {
    date: 'Mon · Dec 21',
    title: 'Arrive SFO, settle in Menlo Park',
    drive: 'SFO → Menlo · about 30 min',
    stay: 'Menlo Park · night 1 of 4',
    group: 'Core four',
    description: 'Land and keep the first evening quiet with the grandparents. No rental yet: the one-way car starts when Shelly and Maia land on Dec 24.',
  },
  {
    date: 'Tue · Dec 22',
    title: 'Parents day',
    drive: 'No planned drive',
    stay: 'Menlo Park · night 2 of 4',
    group: 'Core four',
    description: 'A full family day with no sightseeing agenda. This protects the required parents time before the road trip begins.',
  },
  {
    date: 'Wed · Dec 23',
    title: 'Parents day, groceries, forecast check',
    drive: 'Local only',
    stay: 'Menlo Park · night 3 of 4',
    group: 'Core four',
    description: 'Second full parents day. Buy road food and make the first forecast call from the NWS 7-day forecast and the CPC 8 to 14 day outlook.',
    detail: 'Options 02, 03, and 04 all start from SFO with the same four Menlo nights, so the final choice among them can wait until this evening. Book the first night’s lodging with free cancellation.',
  },
  {
    date: 'Thu · Dec 24',
    title: 'Girls arrive at SFO',
    drive: 'Airport transfer, rental pickup',
    stay: 'Menlo Park · night 4 of 4',
    group: 'All six',
    description: 'Shelly and Maia land at SFO. Collect the one-way rental, load the car for the morning, and keep Christmas Eve with the grandparents.',
  },
];

const utahDays: Day[] = [
  {
    date: 'Mon · Dec 21',
    title: 'Arrive SFO, settle in Menlo Park',
    drive: 'SFO → Menlo · about 30 min',
    stay: 'Menlo Park · night 1 of 3',
    group: 'Core four',
    description: 'Land and keep the first evening quiet with the grandparents. No rental yet: the Utah car starts in Salt Lake City.',
    detail: 'Reserve the one-way SLC → LAS rental now with free cancellation, in a class that explicitly permits compatible traction devices.',
  },
  {
    date: 'Tue · Dec 22',
    title: 'Parents day',
    drive: 'No planned drive',
    stay: 'Menlo Park · night 2 of 3',
    group: 'Core four',
    description: 'A full family day with no sightseeing agenda. This protects the required parents time before the road trip begins.',
  },
  {
    date: 'Wed · Dec 23',
    title: 'Parents day, packing, forecast check',
    drive: 'Local only',
    stay: 'Menlo Park · night 3 of 3',
    group: 'Core four',
    description: 'Second full parents day. Pack for desert cold, buy road snacks, and confirm the Dec 24 flight from SFO to Salt Lake City.',
    detail: 'A very strong El Niño raises the odds of Sierra storms, so this version flies over Donner Pass instead of driving it. To drive I-80 instead, the core four must leave Menlo on Dec 22, which cuts parents time to the arrival evening.',
  },
  {
    date: 'Thu · Dec 24',
    title: 'Fly to Salt Lake City, girls arrive',
    drive: 'SFO → SLC flight · about 1¾ hr',
    stay: 'Salt Lake City · 1 night',
    group: 'All six',
    description: 'The core four take a morning flight to Salt Lake City while Shelly and Maia land the same day. Collect the one-way rental, shop for the week, and use Antelope Island or the Great Salt Lake as a first outing if daylight allows.',
    detail: 'Do the major grocery run here. Christmas Day dining and park-town services can be sparse.',
  },
  {
    date: 'Fri · Dec 25',
    title: 'Salt Lake City to Moab',
    drive: '≈ 235 mi · 4 to 4½ hr',
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
    drive: '≈ 155 mi · 3¼ hr, plus about 1¼ hr for Canyonlands',
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
    drive: '≈ 195 mi · about 4¾ hr before stops',
    stay: 'Kanab · night 1 of 2',
    group: 'All six',
    description: 'The scenic centerpiece: Boulder Mountain, Grand Staircase country, and the Bryce amphitheater before finishing in Kanab.',
    detail: 'This is the trip’s main weather gate. Highway 12 reaches roughly 9,600 ft near Boulder Mountain. Use US-89 alternatives if the pass is unsafe.',
  },
  {
    date: 'Wed · Dec 30',
    title: 'Kanab buffer day',
    drive: 'About 1 to 3 hr, depending on choice',
    stay: 'Kanab · night 2 of 2',
    group: 'All six',
    description: 'Take the quieter Grand Staircase day with Toadstool Hoodoos and Coral Pink Sand Dunes. It is also the slack day: if a storm delayed Highway 12, this is where the slip lands.',
    detail: 'Skip dirt roads after rain, because the clay turns impassable. Avoid narrow washes and slot canyons when rain or snowmelt creates flood risk.',
  },
  {
    date: 'Thu · Dec 31',
    title: 'Kanab to Zion Canyon',
    drive: '≈ 45 mi · 1¼ hr',
    stay: 'Springdale · 1 night',
    group: 'All six',
    description: 'Drive the Zion–Mount Carmel Highway through the east side, then use the afternoon in the main canyon. Springdale makes an easy New Year’s Eve.',
    detail: 'Check the NPS size limits for the Zion–Mount Carmel tunnel before choosing a large van; standard SUVs and minivans fit.',
  },
  {
    date: 'Fri · Jan 1',
    title: 'Zion to Las Vegas',
    drive: '≈ 165 mi · 3¼ hr',
    stay: 'Las Vegas airport hotel · 1 night',
    group: 'All six',
    description: 'A deliberately easy final transfer. Add Valley of Fire State Park, about 1½ hr extra, only if everyone is up early and the roads are dry.',
    detail: 'Book the airport hotel well ahead: Dec 31 to Jan 1 is the most expensive stretch of the year in Las Vegas.',
  },
  {
    date: 'Sat · Jan 2',
    title: 'Fly home from LAS',
    drive: 'Hotel → airport',
    stay: 'Trip complete',
    group: 'All six',
    description: 'Return the one-way rental at LAS. There is no spare day after this one, so keep Jan 1 loose.',
  },
];

const coastDays: Day[] = [
  ...sfStartDays,
  {
    date: 'Fri · Dec 25',
    title: 'Menlo Park to Mendocino',
    drive: '≈ 185 mi · 4 to 4¼ hr',
    stay: 'Mendocino · night 1 of 2',
    group: 'All six',
    description: 'Cross the Golden Gate early and make a measured run to Mendocino. Carry food because Christmas services are uncertain.',
    detail: 'Check Caltrans for Highway 128 and Highway 1 closures before leaving.',
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
    drive: '≈ 170 mi · about 4 hr before stops',
    stay: 'Trinidad or Arcata · night 1 of 2',
    group: 'All six',
    description: 'Leave early, use Avenue of the Giants as the major stop, and reach the Humboldt coast before dark.',
    detail: 'Low sections of the Eel River corridor, including parts of Avenue of the Giants, have flooded in past wet winters. Check conditions before committing.',
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
    drive: '≈ 170 mi · about 4 hr before stops',
    stay: 'Bandon · 1 night',
    group: 'All six',
    description: 'Cross into Oregon and use selected Samuel H. Boardman viewpoints. Stop selectively so the short winter day does not disappear in the car.',
    detail: 'US-101 over Last Chance Grade, south of Crescent City, is the slide-prone link in wet winters. Check Caltrans before leaving Trinidad, because a closure can add hours.',
  },
  {
    date: 'Wed · Dec 30',
    title: 'Bandon to Yachats',
    drive: '≈ 100 mi · 2½ hr before stops',
    stay: 'Yachats · 1 night',
    group: 'All six',
    description: 'A compact coast day with room for shore walks, lighthouses, and Cape Perpetua. Keep distance from exposed rocks during high surf.',
  },
  {
    date: 'Thu · Dec 31',
    title: 'Yachats to Cannon Beach',
    drive: '≈ 135 mi · 3¾ hr before stops',
    stay: 'Cannon Beach · 1 night',
    group: 'All six',
    description: 'Follow US-101 north past Newport and Lincoln City to Haystack Rock and Ecola State Park. A small town makes a good New Year’s Eve, but book dinner early.',
    detail: 'The north Oregon coast is the wettest stretch of the route. If US-101 is blocked, US-26 from the Cannon Beach area is the quick inland exit to Portland.',
  },
  {
    date: 'Fri · Jan 1',
    title: 'Cannon Beach to Portland',
    drive: '≈ 80 mi · 1¾ hr',
    stay: 'Portland airport hotel · 1 night',
    group: 'All six',
    description: 'A short day by design. Walk Ecola in the morning if it is dry, then drive US-26 into Portland. The PDX night protects the Jan 2 flight from coastal weather.',
  },
  {
    date: 'Sat · Jan 2',
    title: 'Fly home from PDX',
    drive: 'Hotel → airport',
    stay: 'Trip complete',
    group: 'All six',
    description: 'Return the one-way rental at PDX. There is no spare day after this one, so keep Jan 1 loose.',
  },
];

const southDays: Day[] = [
  ...sfStartDays,
  {
    date: 'Fri · Dec 25',
    title: 'Menlo Park to Morro Bay',
    drive: '≈ 205 mi · 4 to 4¼ hr',
    stay: 'Morro Bay · night 1 of 2',
    group: 'All six',
    description: 'Take US-101 through the Salinas Valley and reach Morro Bay by mid-afternoon. Walk the Embarcadero at sunset and carry dinner options because Christmas services are uncertain.',
    detail: 'Do not plan a through-drive of Highway 1 in Big Sur. US-101 is the dependable road.',
  },
  {
    date: 'Sat · Dec 26',
    title: 'Elephant seals and Montaña de Oro',
    drive: 'Local · ≈ 70 mi round trip',
    stay: 'Morro Bay · night 2 of 2',
    group: 'All six',
    description: 'Drive north to the Piedras Blancas rookery, where elephant seals breed and pup in winter, then spend the afternoon at Montaña de Oro or Morro Rock.',
    detail: 'Stay on the marked viewing areas and give the animals distance.',
  },
  {
    date: 'Sun · Dec 27',
    title: 'Morro Bay to Ventura via Santa Barbara',
    drive: '≈ 135 mi · about 2½ hr before stops',
    stay: 'Ventura · night 1 of 2',
    group: 'All six',
    description: 'Follow the Gaviota coast to Santa Barbara for lunch and a harbor walk, then continue to Ventura so the boat day starts easily.',
    detail: 'Slide and flood closures on US-101 around Santa Barbara have lasted days in past wet winters. Check Caltrans before leaving Morro Bay.',
  },
  {
    date: 'Mon · Dec 28',
    title: 'Channel Islands day',
    drive: 'Boat crossing · about 1 hr each way',
    stay: 'Ventura · night 2 of 2',
    group: 'All six',
    description: 'Take the boat to Santa Cruz Island for a morning hike and a quiet lunch at the water’s edge. If the boats cancel, fall back to Ojai and the Ventura coast.',
    detail: 'Island boats cancel for swell and wind, and winter schedules are thin. Reserve as soon as the dates are firm and read the cancellation terms.',
  },
  {
    date: 'Tue · Dec 29',
    title: 'Ventura to Joshua Tree',
    drive: '≈ 195 mi · 4 to 4½ hr with Los Angeles traffic',
    stay: 'Joshua Tree · night 1 of 2',
    group: 'All six',
    description: 'Cross the Los Angeles basin before the afternoon build, then climb to the high desert for sunset near the park.',
    detail: 'Holiday-week traffic in the LA basin is the main variable. Leave Ventura by 8 am.',
  },
  {
    date: 'Wed · Dec 30',
    title: 'Joshua Tree National Park',
    drive: 'Park touring only',
    stay: 'Joshua Tree · night 2 of 2',
    group: 'All six',
    description: 'Build the day around Hidden Valley, the Cholla Cactus Garden, and Keys View, with Skull Rock or Cap Rock for sunset. Winter days are mild and nights can freeze.',
    detail: 'Washes and low-water crossings flood quickly after storms. Skip dirt roads when rain is in the forecast.',
  },
  {
    date: 'Thu · Dec 31',
    title: 'Joshua Tree to Borrego Springs',
    drive: '≈ 120 mi · 2½ hr',
    stay: 'Borrego Springs · 1 night',
    group: 'All six',
    description: 'Cross to Anza-Borrego, California’s largest state park, and spend the afternoon at Borrego Palm Canyon. Borrego Springs is a certified dark-sky community, a good place for New Year’s Eve.',
  },
  {
    date: 'Fri · Jan 1',
    title: 'Anza-Borrego to San Diego',
    drive: '≈ 90 mi · 2 hr',
    stay: 'San Diego airport hotel · 1 night',
    group: 'All six',
    description: 'Take a short morning walk, then head west to San Diego. The airport sits close to downtown, so the last night stays easy.',
    detail: 'Anza-Borrego’s dirt roads and washes close after rain. Keep to Borrego Palm Canyon and the paved overlooks if the forecast is wet.',
  },
  {
    date: 'Sat · Jan 2',
    title: 'Fly home from SAN',
    drive: 'Hotel → airport',
    stay: 'Trip complete',
    group: 'All six',
    description: 'Return the one-way rental at SAN. There is no spare day after this one, so keep Jan 1 loose.',
  },
];

const desertDays: Day[] = [
  ...sfStartDays,
  {
    date: 'Fri · Dec 25',
    title: 'Menlo Park to the Sequoia foothills',
    drive: '≈ 240 mi · 4¾ hr',
    stay: 'Three Rivers · night 1 of 2',
    group: 'All six',
    description: 'Cross the Central Valley and reach Three Rivers before dark. It is the longest day of the route, and Christmas services are uncertain, so carry food.',
  },
  {
    date: 'Sat · Dec 26',
    title: 'Giant Forest, Sequoia National Park',
    drive: 'Park roads · ≈ 60 mi round trip',
    stay: 'Three Rivers · night 2 of 2',
    group: 'All six',
    description: 'Spend the day among the largest trees on Earth: General Sherman, the Congress Trail, and the Giant Forest Museum.',
    detail: 'Chains are required on the Generals Highway during storms, and snow can close the upper park. Carry chains the rental permits, or hold the day for the foothills if the road is closed.',
  },
  {
    date: 'Sun · Dec 27',
    title: 'Three Rivers to Ridgecrest',
    drive: '≈ 170 mi · about 4 hr',
    stay: 'Ridgecrest · 1 night',
    group: 'All six',
    description: 'Cross Walker Pass into the Mojave and use Ridgecrest as a plain overnight base. The payoff is an easy approach to Death Valley tomorrow.',
    detail: 'Walker Pass, at about 5,250 ft, can ice during storms. Check Caltrans; the alternative through Mojave adds time.',
  },
  {
    date: 'Mon · Dec 28',
    title: 'Panamint Valley to Death Valley',
    drive: '≈ 120 mi · 2½ hr before stops',
    stay: 'Death Valley · night 1 of 2',
    group: 'All six',
    description: 'Follow Highway 190 across Panamint Valley, stop at the Mesquite Flat Sand Dunes near Stovepipe Wells, and settle in at Furnace Creek.',
  },
  {
    date: 'Tue · Dec 29',
    title: 'Death Valley in winter',
    drive: 'Local touring · ≈ 100 mi',
    stay: 'Death Valley · night 2 of 2',
    group: 'All six',
    description: 'Zabriskie Point at sunrise, Badwater Basin at 282 feet below sea level, Artists Drive, and Dante’s View at sunset. Winter is the comfortable season here.',
    detail: 'Roads can close for days after heavy rain, and washes flood fast. Check NPS conditions each morning and keep a sheltered-walk backup.',
  },
  {
    date: 'Wed · Dec 30',
    title: 'Death Valley to Mesquite',
    drive: '≈ 210 mi · 4 hr',
    stay: 'Mesquite · 1 night',
    group: 'All six',
    description: 'Leave by mid-morning, pass through Pahrump and Las Vegas, and finish at Mesquite, about 1¾ hr from Zion.',
    detail: 'Las Vegas traffic and hotel prices peak from Dec 30 to Jan 1. Mesquite or St. George keeps the night off the Strip.',
  },
  {
    date: 'Thu · Dec 31',
    title: 'Mesquite to Zion, then Springdale',
    drive: '≈ 80 mi · 1¾ hr',
    stay: 'Springdale · 1 night',
    group: 'All six',
    description: 'Reach Zion by late morning for a canyon day on the Riverside Walk and the Pa’rus Trail, then settle in Springdale for New Year’s Eve.',
    detail: 'Check NPS for Zion Canyon shuttle and road status, and avoid narrow canyons when rain or snowmelt creates flood risk.',
  },
  {
    date: 'Fri · Jan 1',
    title: 'Zion to Las Vegas',
    drive: '≈ 165 mi · 3¼ hr',
    stay: 'Las Vegas airport hotel · 1 night',
    group: 'All six',
    description: 'A deliberately easy final transfer. Add Valley of Fire State Park, about 1½ hr extra, only if everyone is up early and the roads are dry.',
    detail: 'Book the airport hotel well ahead: Dec 31 to Jan 1 is the most expensive stretch of the year in Las Vegas.',
  },
  {
    date: 'Sat · Jan 2',
    title: 'Fly home from LAS',
    drive: 'Hotel → airport',
    stay: 'Trip complete',
    group: 'All six',
    description: 'Return the one-way rental at LAS. There is no spare day after this one, so keep Jan 1 loose.',
  },
];

const utahPhotoStory: RoutePhoto[] = [
  {
    src: 'utah-antelope.jpg',
    stop: 'Dec 24 · Antelope Island',
    title: 'A flexible arrival-day escape',
    alt: 'Bison on Antelope Island above the Great Salt Lake at sunset',
    note: 'Use it only if everyone’s flight timing leaves enough winter daylight.',
    credit: 'Matthew Dillon',
    license: 'CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Antelope_Island_State_Park,_Great_Salt_Lake_(49408253886).jpg',
  },
  {
    src: 'utah-canyonlands.jpg',
    stop: 'Dec 27 · Canyonlands',
    title: 'One last immense Moab view',
    alt: 'Layered red canyons seen from Grand View Point in Canyonlands National Park',
    note: 'Island in the Sky works as a morning detour before the drive to Torrey.',
    credit: 'Myrabella',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Canyonlands_NP_Grand_View_Point_Overlook.jpg',
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
    src: 'utah-highway12.jpg',
    stop: 'Dec 29 · Highway 12',
    title: 'The road is the centerpiece',
    alt: 'A wide view across colorful mountains from Scenic Byway 12 near Boulder Mountain',
    note: 'Take the high route only when the forecast and pavement both cooperate.',
    credit: 'S. Clyde / NARA',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Scenic_Byway_12_-_A_Sweeping_View_from_Boulder_Mountain_-_NARA_-_7721710.jpg',
  },
  {
    src: 'utah-toadstools.jpg',
    stop: 'Dec 30 · Grand Staircase',
    title: 'The quieter Kanab choice',
    alt: 'Red and white hoodoo formations at Toadstool Hoodoos in southern Utah',
    note: 'A low-commitment buffer day when the higher country is icy.',
    credit: 'Chris06',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:2015_Toadstool_Hoodoos_Utah_(1).jpg',
  },
  {
    src: 'utah-valley-of-fire.jpg',
    stop: 'Jan 1 · Valley of Fire',
    title: 'An optional last detour',
    alt: 'A winding paved road through red and white sandstone in Valley of Fire State Park',
    note: 'Adds about 1½ hr to the drive into Las Vegas, so use it only on a clear, early morning.',
    credit: 'Gzzz',
    license: 'CC BY 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Road_in_Valley_of_Fire.jpg',
  },
];

const coastPhotoStory: RoutePhoto[] = [
  {
    src: 'coast-avenue-giants.jpg',
    stop: 'Dec 27 · Avenue of the Giants',
    title: 'The long drive earns its name',
    alt: 'A narrow road passing between towering redwoods on Avenue of the Giants',
    note: 'Make this the major stop between Mendocino and the Humboldt coast.',
    credit: 'Dougtone',
    license: 'CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Avenue_of_the_Giants_-_California_-_7402263454.jpg',
  },
  {
    src: 'coast-prairie-creek.jpg',
    stop: 'Dec 28 · Prairie Creek',
    title: 'A full day beneath the canopy',
    alt: 'Lush green ferns and enormous redwood trunks in Prairie Creek Redwoods State Park',
    note: 'The forest remains the main event even when rain closes secondary roads.',
    credit: 'California State Parks',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Prairie_Creek_Redwoods_State_Park.jpg',
  },
  {
    src: 'coast-boardman.jpg',
    stop: 'Dec 29 · Samuel H. Boardman',
    title: 'Oregon arrives in fog and sea stacks',
    alt: 'Forested cliffs and sea stacks in fog along the southern Oregon coast',
    note: 'Choose a few viewpoints rather than racing every pullout before dark.',
    credit: 'Dougtone',
    license: 'CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Samuel_H._Boardman_State_Scenic_Corridor_-_Oregon_-_7405365820.jpg',
  },
  {
    src: 'coast-cape-perpetua.jpg',
    stop: 'Dec 30 · Cape Perpetua',
    title: 'Forest meets an exposed winter ocean',
    alt: 'High viewpoint over forested Cape Perpetua and the Oregon coastline',
    note: 'Use overlooks and sheltered walks according to wind and surf conditions.',
    credit: 'U.S. Forest Service',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Cape_Perpetua_Whispering_Spruce_View_4.jpg',
  },
  {
    src: 'coast-yachats.jpg',
    stop: 'Dec 30 · Yachats',
    title: 'A night at the Pacific edge',
    alt: 'Sun breaking through winter clouds over waves and dark rocks near Yachats, Oregon',
    note: 'Keep well back from exposed rocks when swell and sneaker-wave risk are high.',
    credit: 'Little Mountain 5',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Coast_near_Yachats,_Oregon_1.JPG',
  },
  {
    src: 'coast-cannon-beach.jpg',
    stop: 'Dec 31 · Cannon Beach',
    title: 'A New Year’s Eve at Haystack Rock',
    alt: 'Haystack Rock and the Needles rising from the sea at low tide on Cannon Beach',
    note: 'Walk the beach at low tide, and stay off the rocks when surf is running high.',
    credit: 'King of Hearts',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Cannon_Beach_October_2019_003.jpg',
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
    'Utah parks',
    'The outlook text names the Four Corners rather than Utah itself, so check the CPC map for the Dec–Feb tilt over southern Utah before relying on it.',
    'Snow and ice on Highway 12, Boulder Mountain, and Bryce. Flash floods in washes near Kanab and Zion. The Sierra crossing is avoided by the Dec 24 flight.',
    'Moderate',
  ],
  [
    'Pacific coast',
    'The most direct wet tilt on any route: California coast odds reach 50 to 60%, and the favored area may extend through central Oregon or farther north.',
    'Atmospheric rivers, large surf and sneaker waves, slides on US-101 and Highway 1, river and creek flooding. One main road, and mostly one-night moves.',
    'Highest',
  ],
  [
    'Southern coast + desert',
    'The southern half of California is inside the wet tilt, but the days between storms are mild, and the desert stops sit in the rain shadow of the coastal ranges.',
    'Mudslides and closures on US-101 near Santa Barbara, cancelled Channel Islands boats, flash floods in desert washes, Los Angeles basin traffic. No snow passes.',
    'High rain, no snow',
  ],
  [
    'Sequoia + Death Valley',
    'Three weather zones: the southern Sierra wet tilt at Sequoia, the rain shadow at Death Valley, and the edge of the Four Corners tilt at Zion.',
    'Chains on the Generals Highway, ice on Walker Pass, road closures in Death Valley after rain. Each zone can fail on its own, and few stops depend on a high pass.',
    'Moderate',
  ],
];

const ninoDates = [
  ['Oct 15', 'CPC releases its next seasonal outlooks. Check whether the California and Southwest odds rose; CPC said they might.'],
  ['Nov 12', 'CPC’s next ENSO update. Decide Utah versus an SFO start before booking flights, because Utah is the only route where Shelly and Maia fly into SLC and the core four fly SFO to SLC.'],
  ['Dec 17', 'CPC’s December outlook, and a first look at the 8 to 14 day outlook for Dec 24 to 31.'],
  ['Dec 23', 'Last day to switch among options 02, 03, and 04. They share the same SFO start and Menlo nights, so the choice can wait until the car is collected, provided the first night’s lodging is cancellable.'],
];

const sources = [
  ['NOAA ENSO diagnostic discussion, Oct 8 2026', 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.shtml'],
  ['NOAA seasonal outlook discussion, Sept 17 2026', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/fxus05.html'],
  ['NOAA seasonal outlook maps', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/'],
  ['NOAA 8 to 14 day outlook', 'https://www.cpc.ncep.noaa.gov/products/predictions/814day/'],
  ['Caltrans chain requirements', 'https://dot.ca.gov/travel/winter-driving-tips/chain-requirements'],
  ['California road conditions (QuickMap)', 'https://quickmap.dot.ca.gov/'],
  ['Southern Utah parks in winter', 'https://www.nps.gov/articles/000/national-parks-in-southern-utah.htm'],
  ['Arches winter guide', 'https://www.nps.gov/arch/planyourvisit/winter.htm'],
  ['Capitol Reef Scenic Drive', 'https://www.nps.gov/care/planyourvisit/scenicdrive.htm'],
  ['Capitol Reef directions and Highway 12', 'https://home.nps.gov/care/planyourvisit/directions.htm'],
  ['Bryce Canyon in winter', 'https://www.nps.gov/brca/planyourvisit/winter.htm'],
  ['Zion seasons and weather', 'https://home.nps.gov/zion/planyourvisit/seasons.htm'],
  ['Redwood current conditions', 'https://www.nps.gov/redw/planyourvisit/conditions.htm'],
  ['Redwood scenic drives', 'https://www.nps.gov/redw/planyourvisit/drives.htm'],
  ['Oregon winter driving and TripCheck', 'https://www.oregon.gov/odot/Pages/Winter-Driver-Responsibilities.aspx'],
  ['Channel Islands conditions', 'https://www.nps.gov/chis/planyourvisit/conditions.htm'],
  ['Joshua Tree weather', 'https://www.nps.gov/jotr/planyourvisit/weather.htm'],
  ['Sequoia and Kings Canyon conditions', 'https://www.nps.gov/seki/planyourvisit/conditions.htm'],
  ['Death Valley conditions', 'https://www.nps.gov/deva/planyourvisit/conditions.htm'],
  ['Nevada winter driving', 'https://www.dot.nv.gov/safety/safe-winter-driving'],
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
            <a href="#more">More roads</a>
            <a href="#decision">Compare</a>
          </div>
          <span>Dec 21, 2026 · Jan 2, 2027</span>
        </nav>

        <div className="hero-copy" id="top">
          <p className="kicker">Two roads west, and two more</p>
          <h1>One family.<br />Four wild directions.</h1>
          <p className="lede">
            Start with the grandparents in Menlo Park. Gather all six by Christmas Eve.
            Then choose red rock, redwoods, or the southern deserts, with a very strong El Niño now shaping the odds.
          </p>
        </div>

        <div className="hero-choices" aria-label="Route summaries">
          <a className="hero-choice hero-utah" href="#utah">
            <span>01 · Red rock</span>
            <strong>SFO → SLC → Utah parks → LAS</strong>
          </a>
          <a className="hero-choice hero-coast" href="#coast">
            <span>02 · Pacific edge</span>
            <strong>SFO → Redwoods → PDX</strong>
          </a>
          <a className="hero-choice hero-south" href="#south">
            <span>03 · Southern coast + desert</span>
            <strong>SFO → Joshua Tree → SAN</strong>
          </a>
          <a className="hero-choice hero-desert" href="#desert">
            <span>04 · Sequoia + Death Valley</span>
            <strong>SFO → Death Valley → Zion → LAS</strong>
          </a>
        </div>
      </section>

      <div id="main-content">
        <section className="brief-section" aria-labelledby="brief-heading">
          <div className="section-label">The fixed pieces</div>
          <div className="brief-copy">
            <h2 id="brief-heading">The route bends around the family calendar.</h2>
            <p>
              The core four land Dec 21, and two full days with the grandparents come first.
              Shelly and Maia join Dec 24, and everyone flies home Jan 2.
              No option returns to SFO at the end, and none includes a ski day.
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
            <h2 id="map-heading">Two lines north and east, two loops south.</h2>
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

        <section className="route-section utah-section" id="utah" aria-labelledby="utah-heading">
          <header className="route-header">
            <div>
              <p className="route-number">Option 01</p>
              <p className="kicker">Fly-in · red rock · high plateau</p>
            </div>
            <h2 id="utah-heading">Salt Lake City to the Utah parks</h2>
            <p className="route-deck">
              The bigger visual payoff, now with a flight over the Sierra. Treat Highway 12 and southern Utah snow
              as weather gates, not commitments.
            </p>
          </header>

          <div className="route-stats" aria-label="Utah route statistics">
            <div><span>Planning distance</span><strong>≈ 850 mi</strong></div>
            <div><span>Longest normal leg</span><strong>4¾ hr</strong></div>
            <div><span>Full-family bases</span><strong>5 + LAS</strong></div>
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
              <p>The core four spend three nights with the grandparents, then fly to Salt Lake City on Dec 24 to meet Shelly and Maia. The all-family section settles into two-night bases at Moab, Torrey, and Kanab, and finishes with a Zion night.</p>
              <p>The weak point is not the daily mileage. It is high-elevation weather on Highway 12. Flying also removes the Donner Pass crossing, the part of the old plan that a wet El Niño winter makes most exposed. The cost is the I-80 drive across Nevada, which is gone.</p>
            </div>
          </div>

          <Itinerary days={utahDays} tone="utah" />

          <RoutePhotoAtlas
            photos={utahPhotoStory}
            tone="utah"
            heading="From the Great Salt Lake to sculpted desert."
            description="Six more views follow the road in order, so the landscape changes with the itinerary instead of appearing as a disconnected gallery."
          />

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
              <p className="kicker">If a storm closes Highway 12</p>
              <h3>Hold in Torrey, not on the pass.</h3>
            </div>
            <p>If Boulder Mountain is closed on Dec 29, stay a third night in Torrey and repeat a short Capitol Reef walk, then take a US-89 alternative to Kanab when the roads allow. The Dec 30 buffer day absorbs a one-day slip, and Zion on Dec 31 stays intact.</p>
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
              A single continuous road trip with no snow passes, more rain exposure,
              and long stretches where the road itself is the destination.
            </p>
          </header>

          <div className="route-stats" aria-label="Pacific coast route statistics">
            <div><span>Planning distance</span><strong>≈ 900 mi</strong></div>
            <div><span>Longest normal leg</span><strong>4¼ hr</strong></div>
            <div><span>Full-family bases</span><strong>5 + PDX</strong></div>
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
              <p>All six leave Menlo together on Dec 25 and move north with no mid-trip flight and no return to the Bay Area. The coast has two-night stops at Mendocino and in the redwoods, then one-night moves to Portland.</p>
              <p>This trades snow risk for the full force of the El Niño outlook: rain, wind, surf, flooding, slides, and treefall. It is the route most directly under the strongest wet tilt, so it works only by choosing among nearby walks instead of depending on one marquee trail.</p>
            </div>
          </div>

          <Itinerary days={coastDays} tone="coast" />

          <RoutePhotoAtlas
            photos={coastPhotoStory}
            tone="coast"
            heading="From giant redwoods to Oregon surf."
            description="Six more views trace the coastal route north, with the forest becoming denser and the shoreline wilder after Mendocino."
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
            <p>Stay where you are for one more night, swap headlands for forest walks, and treat Jan 1 as slack. Cannon Beach to Portland is a short day, so a lost Dec 31 can be recovered without losing the flight.</p>
          </aside>
        </section>

        <section className="more-section" id="more" aria-labelledby="more-heading">
          <div className="section-label">Also worth a look</div>
          <div className="brief-copy">
            <h2 id="more-heading">Two more roads out of San Francisco.</h2>
            <p>
              Both start from SFO with the same four Menlo nights as the coast option, so they can be chosen as late as Dec 24.
              They were picked to avoid snow passes, keep legs near four hours, and finish at an airport with one-way rental service.
            </p>
          </div>
          <div className="more-notes">
            <p className="kicker">Considered and set aside</p>
            <ul className="nino-list">
              <li>Yosemite and Tahoe high country: Tioga Road is closed in winter, chain controls are common, and the plan has no ski days.</li>
              <li>Big Sur as a through-drive: Highway 1 closures make it unreliable in a wet winter.</li>
              <li>Phoenix and Sedona: far from San Francisco, and inside the same Southwest wet tilt.</li>
            </ul>
          </div>
        </section>

        <section className="route-section south-section" id="south" aria-labelledby="south-heading">
          <header className="route-header">
            <div>
              <p className="route-number">Option 03</p>
              <p className="kicker">Elephant seals · islands · high desert</p>
            </div>
            <h2 id="south-heading">The southern coast and desert</h2>
            <p className="route-deck">
              The mildest winter temperatures of any option and no snow passes, with the most rain on paper.
              Storms arrive in pulses, and the desert stops let you drive out from under them.
            </p>
          </header>

          <div className="route-stats" aria-label="Southern route statistics">
            <div><span>Planning distance</span><strong>≈ 850 mi</strong></div>
            <div><span>Longest normal leg</span><strong>4¼ hr</strong></div>
            <div><span>Full-family bases</span><strong>4 + SAN</strong></div>
            <div><span>Airports</span><strong>SFO · SAN</strong></div>
          </div>

          <figure className="panorama panorama-south">
            <img src={`${siteBasePath}/photos/south-joshua-tree.jpg`} alt="Teddy bear cholla cactus with desert mountains under a blue sky in Joshua Tree National Park" />
            <figcaption>Cholla Cactus Garden, Joshua Tree National Park. Photo: Mojnsen, CC BY 4.0. <a href="https://commons.wikimedia.org/wiki/File:Cholla_Cactus_Garden,_Joshua_Tree_National_Park.jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
          </figure>

          <div className="route-summary-grid">
            <div>
              <p className="kicker">Why this route</p>
              <h3>Sea level to high desert without touching snow.</h3>
            </div>
            <div className="prose-stack">
              <p>Winter is the season for elephant seals at Piedras Blancas, a boat day to the Channel Islands, and Joshua Tree and Anza-Borrego at a comfortable temperature. The route ends in San Diego, an easy airport.</p>
              <p>The cost is weather exposure on the coast: slides on US-101 and cancelled island boats. Joshua Tree and Anza-Borrego sit in the rain shadow of the coastal ranges, so a wet coast does not always mean a wet desert, although desert washes flood quickly.</p>
            </div>
          </div>

          <Itinerary days={southDays} tone="south" />

          <aside className="compressed-plan">
            <div>
              <p className="kicker">If a storm sits on Southern California</p>
              <h3>Move inland early.</h3>
            </div>
            <p>If boats cancel and the coast is soaked, go to Joshua Tree a day early and use the desert as the dry side of the storm. Keep Santa Barbara and Ojai as the Dec 28 fallback, and reserve the island crossing with a flexible fare.</p>
          </aside>
        </section>

        <section className="route-section desert-section" id="desert" aria-labelledby="desert-heading">
          <header className="route-header">
            <div>
              <p className="route-number">Option 04</p>
              <p className="kicker">Sequoias · badlands · red rock</p>
            </div>
            <h2 id="desert-heading">Sequoia, Death Valley, and Zion</h2>
            <p className="route-deck">
              Big landscapes without a Sierra pass crossing and without a flight to Salt Lake City.
              Three weather zones, each with a different failure mode.
            </p>
          </header>

          <div className="route-stats" aria-label="Sequoia and Death Valley route statistics">
            <div><span>Planning distance</span><strong>≈ 1,200 mi</strong></div>
            <div><span>Longest normal leg</span><strong>4¾ hr</strong></div>
            <div><span>Full-family bases</span><strong>5 + LAS</strong></div>
            <div><span>Airports</span><strong>SFO · LAS</strong></div>
          </div>

          <figure className="panorama panorama-desert">
            <img src={`${siteBasePath}/photos/desert-zabriskie.jpg`} alt="Golden light on the badlands at Zabriskie Point in Death Valley National Park" />
            <figcaption>Zabriskie Point, Death Valley. Photo: Mac H, CC BY-SA 2.0. <a href="https://commons.wikimedia.org/wiki/File:Zabriskie_Point,_Death_Valley_National_Park_-_Flickr_-_Mac_H_(media601).jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
          </figure>

          <div className="route-summary-grid">
            <div>
              <p className="kicker">Why this route</p>
              <h3>The largest trees, the lowest basin, then a canyon of red cliffs.</h3>
            </div>
            <div className="prose-stack">
              <p>It shares its Zion and Las Vegas finish with the Utah route but replaces the flight with a drive down the Central Valley and across the Mojave. Winter is the comfortable season in Death Valley, and Giant Forest in snow is a different place.</p>
              <p>Its legs are the longest of the four options. Treat Dec 25 and Dec 30 as driving days, and keep Walker Pass and the Generals Highway as the two places to check conditions before committing.</p>
            </div>
          </div>

          <Itinerary days={desertDays} tone="desert" />

          <aside className="compressed-plan">
            <div>
              <p className="kicker">If Sequoia or Walker Pass closes</p>
              <h3>Skip the high road, keep the valley.</h3>
            </div>
            <p>If chains or closures stop the Generals Highway, walk the Kaweah River foothills instead. If Walker Pass is closed on Dec 27, reach Ridgecrest through Mojave on the longer route, and keep both Death Valley nights, which are the point of the trip.</p>
          </aside>
        </section>

        <section className="decision-section" id="decision" aria-labelledby="decision-heading">
          <div className="section-intro">
            <p className="kicker">The decision</p>
            <h2 id="decision-heading">Pick the risk you prefer.</h2>
            <p>All four options fit the family calendar. The choice is not “good versus bad weather.” It is snow and elevation versus rain and coastal disruption, with a strong El Niño changing the odds on each.</p>
          </div>

          <div className="comparison-table" role="table" aria-label="Route comparison">
            <div className="comparison-row comparison-head" role="row">
              <div role="columnheader">Question</div>
              <div role="columnheader">01 Utah parks</div>
              <div role="columnheader">02 Pacific coast</div>
              <div role="columnheader">03 Southern coast + desert</div>
              <div role="columnheader">04 Sequoia + Death Valley</div>
            </div>
            {[
              ['Visual payoff', 'Highest: snow, red rock, immense scale', 'High: redwoods, sea stacks, storm light', 'Medium-high: islands, seals, Joshua Tree, dark skies', 'High: sequoias, badlands, then Zion'],
              ['Solitude', 'High between parks; mixed in Arches and Zion', 'Medium-high throughout, especially north of Mendocino', 'Medium: busy holiday coast, quiet in Anza-Borrego', 'High in Death Valley; mixed in Sequoia and Zion'],
              ['Weather exposure', 'Snow and ice on high roads; flash floods near Kanab', 'Rain, surf, slides, river flooding', 'Rain and mudslides; no snow passes; desert washes flood', 'Chains in Sequoia, ice on Walker Pass, closures after rain'],
              ['El Niño exposure', 'Moderate; the flight skips the Sierra', 'Highest; the strongest wet tilt on the West Coast', 'High rain, mild temperatures', 'Moderate; spread over three weather zones'],
              ['Hotel rhythm', 'Two-night bases at Moab, Torrey, Kanab', 'Two nights at Mendocino and Trinidad, then one-night moves', 'Two nights at Morro Bay and Ventura', 'Two nights at Three Rivers and Death Valley'],
              ['Flights and airports', 'Core four fly SFO to SLC; girls fly to SLC; home from LAS', 'Everyone starts at SFO; home from PDX', 'Everyone starts at SFO; home from SAN', 'Everyone starts at SFO; home from LAS'],
              ['Can it switch late?', 'No; flights commit it by mid-November', 'Yes, until Dec 24', 'Yes, until Dec 24', 'Yes, until Dec 24'],
              ['Best for', 'A dramatic, adventurous sequel to the Phoenix trip', 'Avoiding the Rockies while keeping nature dominant', 'The mildest weather and the easiest airport finish', 'Big landscapes with no Sierra pass and no flight to SLC'],
            ].map(([label, utah, coast, south, desert]) => (
              <div className="comparison-row" role="row" key={label}>
                <div role="rowheader">{label}</div>
                <div role="cell">{utah}</div>
                <div role="cell">{coast}</div>
                <div role="cell">{south}</div>
                <div role="cell">{desert}</div>
              </div>
            ))}
          </div>

          <div className="recommendation">
            <p className="kicker">Current lean</p>
            <h3>Lead with Utah, flown in at Salt Lake City.</h3>
            <p>It has the most room to absorb a storm day: two-night bases, inland detours, and no single coastal road to depend on. The El Niño outlook weighs most heavily against the Pacific coast, which sits under the strongest wet tilt. If the group wants no snow risk at all, option 03 is the fallback. Revisit after the Oct 15 and Nov 12 updates, and before booking flights.</p>
          </div>
        </section>

        <section className="checklist-section" aria-labelledby="checklist-heading">
          <div>
            <p className="kicker">Before anything becomes nonrefundable</p>
            <h2 id="checklist-heading">Four decisions unlock the bookings.</h2>
          </div>
          <ol className="booking-list">
            <li><span>01</span><p>Confirm Shelly and Maia’s flights: arrive Dec 24 (into SLC for Utah, into SFO for everything else) and depart Jan 2 from the route’s finishing airport.</p></li>
            <li><span>02</span><p>Compare six-person vehicle capacity with luggage, one-way fees (SLC to LAS, or SFO to PDX, SAN, or LAS), winter tires, and the rental company’s traction-device policy.</p></li>
            <li><span>03</span><p>Book cancellable two-night bases first: Moab, Torrey, and Kanab; Mendocino and Trinidad; Morro Bay and Ventura; or Three Rivers and Death Valley.</p></li>
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
          <p className="kicker">Two roads west, and two more</p>
          <p>A working family plan for winter break 2026.</p>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
