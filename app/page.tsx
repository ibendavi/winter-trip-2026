import RouteMap from './RouteMap';

const siteBasePath = '/winter-trip-2026';

type Tone = 'yellowstone' | 'oregon' | 'utah';

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

const yellowstoneDays: Day[] = [
  parentsVisit,
  {
    date: 'Mon · Dec 21',
    title: 'Fly to Bozeman, soak in Paradise Valley',
    drive: 'SFO → BZN flight · about 2¼ hr, then ≈ 60 mi · 1¼ hr',
    stay: 'Chico Hot Springs · 1 night',
    group: 'Before the girls',
    description: 'You fly out of SFO in the morning while Ayelet and Tal land in Bozeman. Collect the rental and drive south through Paradise Valley to the hot springs, with the Absaroka range on one side and the Yellowstone River on the other.',
    detail: 'Winter daylight is short, so plan to be at the springs by dusk. Pack for real cold: single-digit nights are normal.',
  },
  {
    date: 'Tue · Dec 22',
    title: 'Mammoth Hot Springs and the Lamar Valley',
    drive: '≈ 40 mi · 1 hr, plus ≈ 55 mi round trip to Lamar',
    stay: 'Mammoth Hot Springs · night 1 of 2',
    group: 'Before the girls',
    description: 'Enter at Gardiner and walk the snow-covered Mammoth terraces, then drive the one road that stays open to cars into the Lamar Valley for wildlife at dusk.',
    detail: 'Only the road from Gardiner through Mammoth to Cooke City is open to ordinary cars in winter. Keep 25 yards from bison and elk and 100 yards from wolves and bears.',
  },
  {
    date: 'Wed · Dec 23',
    title: 'A dawn in the Lamar Valley',
    drive: 'Local · ≈ 55 mi round trip',
    stay: 'Mammoth Hot Springs · night 2 of 2',
    group: 'Before the girls',
    description: 'Wolves, bison, elk, bighorn sheep, and coyotes are most active at first light, and a quiet valley is the point. Spend the afternoon on a short terrace walk and keep the evening unscheduled.',
    detail: 'A guided wildlife tour from Gardiner adds spotting scopes and knowledge. Book it before the holiday week fills.',
  },
  {
    date: 'Thu · Dec 24',
    title: 'Girls arrive in Bozeman',
    drive: '≈ 90 mi · 1¾ to 2 hr',
    stay: 'Bozeman · 1 night',
    group: 'All six',
    description: 'Drive north out of the park to collect Shelly and Maia at BZN, then spend Christmas Eve in Bozeman with a main-street dinner.',
    detail: 'Bozeman Pass on I-90 and the Paradise Valley road can ice over in storms. Check the Montana road report before leaving Mammoth.',
  },
  {
    date: 'Fri · Dec 25',
    title: 'Bozeman to West Yellowstone',
    drive: '≈ 90 mi · 2 hr',
    stay: 'West Yellowstone · 1 night',
    group: 'All six',
    description: 'Drive up the Gallatin Canyon along the Gallatin River to West Yellowstone, the gateway for the snowcoach. A quiet Christmas afternoon, with food bought in Bozeman because services are limited.',
    detail: 'US-191 through Gallatin Canyon has avalanche closures after heavy snow. Leave early and check conditions.',
  },
  {
    date: 'Sat · Dec 26',
    title: 'Snowcoach to Old Faithful',
    drive: 'Snowcoach · about 2 hr each way',
    stay: 'Old Faithful Snow Lodge · night 1 of 2',
    group: 'All six',
    description: 'A heated snowcoach carries you through the Madison valley, with bison and steam along the river. Check in at the Snow Lodge, then walk the plowed Upper Geyser Basin boardwalks at dusk.',
    detail: 'The lodge opens Dec 16 and is reachable in winter only by snowcoach or snowmobile. It sells out for holiday week, so confirm it before anything else.',
  },
  {
    date: 'Sun · Dec 27',
    title: 'Old Faithful and the geyser basins',
    drive: 'Snowcoach and boardwalk only',
    stay: 'Old Faithful Snow Lodge · night 2 of 2',
    group: 'All six',
    description: 'See Old Faithful erupt against snow in the morning, and spend the day on the boardwalks. If the group is up for a long day, the park lodges offer a snowcoach day trip to the Grand Canyon of the Yellowstone.',
    detail: 'Daytime highs near freezing and nights well below are typical. Layer, and keep hands and faces covered near the steam.',
  },
  {
    date: 'Mon · Dec 28',
    title: 'Snowcoach out, then to Bozeman',
    drive: 'Snowcoach about 2 hr, then ≈ 90 mi · 2 hr',
    stay: 'Bozeman · night 1 of 2',
    group: 'All six',
    description: 'Ride the snowcoach back to West Yellowstone, collect the car, and drive to Bozeman for a long, easy evening with indoor options.',
  },
  {
    date: 'Tue · Dec 29',
    title: 'Museum of the Rockies and a frozen canyon',
    drive: 'Local · ≈ 40 mi',
    stay: 'Bozeman · night 2 of 2',
    group: 'All six',
    description: 'The Museum of the Rockies has one of the largest dinosaur collections in the country, and Hyalite Canyon has frozen waterfalls for those who want a short winter walk.',
    detail: 'Check the museum’s holiday hours and the Hyalite road condition before going.',
  },
  {
    date: 'Wed · Dec 30',
    title: 'Back to Paradise Valley',
    drive: '≈ 50 mi · 1 hr',
    stay: 'Chico Hot Springs · night 1 of 2',
    group: 'All six',
    description: 'Drive south through Livingston and Paradise Valley to the hot springs for a quiet day of soaking, with a short drive to Gardiner if the group wants one more wildlife morning.',
  },
  {
    date: 'Thu · Dec 31',
    title: 'New Year’s Eve at the hot springs',
    drive: 'Local only',
    stay: 'Chico Hot Springs · night 2 of 2',
    group: 'All six',
    description: 'A deliberately empty day. Soak, walk the river, and celebrate in a resort with few other agendas.',
  },
  {
    date: 'Fri · Jan 1',
    title: 'Chico to Bozeman',
    drive: '≈ 50 mi · 1 hr',
    stay: 'Bozeman airport hotel · 1 night',
    group: 'All six',
    description: 'A short, easy drive to the airport hotel. Keep the rest of the day free, because this is the slack day before the flight.',
    detail: 'Bozeman Pass and the Paradise Valley road can ice over. Leave early if snow is forecast.',
  },
  {
    date: 'Sat · Jan 2',
    title: 'Fly home from BZN',
    drive: 'Hotel → airport',
    stay: 'Trip complete',
    group: 'All six',
    description: 'Return the rental at BZN, where the trip started. There is no spare day after this one, so keep Jan 1 loose.',
  },
];

const oregonDays: Day[] = [
  parentsVisit,
  {
    date: 'Mon · Dec 21',
    title: 'Fly to Redmond, settle in Bend',
    drive: 'SFO → RDM flight · about 1¾ hr, then ≈ 20 mi',
    stay: 'Bend · night 1 of 4',
    group: 'Before the girls',
    description: 'You fly out of SFO in the morning while Ayelet and Tal land in Redmond. Collect the rental, check in, and walk the Deschutes River trail in the afternoon.',
  },
  {
    date: 'Tue · Dec 22',
    title: 'Smith Rock and the high desert',
    drive: 'Local · ≈ 50 mi round trip',
    stay: 'Bend · night 2 of 4',
    group: 'Before the girls',
    description: 'Walk the Smith Rock canyon rim above the Crooked River in cold, clear air, then return to Bend for the High Desert Museum’s wildlife and history exhibits.',
    detail: 'Trails can be icy in shade after cold nights. Bring traction and keep to the lower paths.',
  },
  {
    date: 'Wed · Dec 23',
    title: 'Lava, rivers, and an easy day',
    drive: 'Local touring',
    stay: 'Bend · night 3 of 4',
    group: 'Before the girls',
    description: 'Use the Deschutes River falls near Bend and the volcanic landscape around Newberry as a loose agenda, and keep the evening free for packing and a good dinner.',
    detail: 'Forest roads into the Newberry caldera close in winter. Stay on plowed highways.',
  },
  {
    date: 'Thu · Dec 24',
    title: 'Girls arrive in Redmond',
    drive: '≈ 20 mi',
    stay: 'Bend · night 4 of 4',
    group: 'All six',
    description: 'Collect Shelly and Maia at RDM, then enjoy Christmas Eve in Bend with an unhurried dinner.',
  },
  {
    date: 'Fri · Dec 25',
    title: 'Bend to Summer Lake Hot Springs',
    drive: '≈ 130 mi · 3¼ hr',
    stay: 'Summer Lake Hot Springs · 1 night',
    group: 'All six',
    description: 'Drive south through the high desert past Fort Rock, a volcanic tuff ring rising from the sagebrush, to remote hot springs on the edge of a dry lake. A quiet, warm Christmas night.',
    detail: 'Lodging at the springs is limited and should be reserved well ahead. The area has no services after dark, so carry food and fuel.',
  },
  {
    date: 'Sat · Dec 26',
    title: 'Summer Lake to Klamath Falls',
    drive: '≈ 100 mi · 3¼ hr',
    stay: 'Klamath Falls · night 1 of 2',
    group: 'All six',
    description: 'Cross to the Klamath Basin and look for wintering bald eagles at the wildlife refuges near the California line in the late afternoon.',
    detail: 'Rural roads are lightly plowed. Carry chains and check TripCheck before leaving.',
  },
  {
    date: 'Sun · Dec 27',
    title: 'Crater Lake in the snow',
    drive: '≈ 125 mi round trip · 3¼ hr',
    stay: 'Klamath Falls · night 2 of 2',
    group: 'All six',
    description: 'Drive the plowed southern road to the rim for a view of the lake under snow. Keep it to overlooks and short walks, and a ranger-led snowshoe walk if one is running that week.',
    detail: 'The north entrance and Rim Drive are closed to cars in winter, and there is no winter lodging or fuel inside the park. Storms can close the Rim Village road. Carry chains.',
  },
  {
    date: 'Mon · Dec 28',
    title: 'Klamath Falls to Bend',
    drive: '≈ 135 mi · 2¾ hr',
    stay: 'Bend · 1 night',
    group: 'All six',
    description: 'A straightforward drive north on US-97 back to Bend, with a stop at Lava Butte or a long dinner as the day’s only agenda.',
  },
  {
    date: 'Tue · Dec 29',
    title: 'Bend to Hood River',
    drive: '≈ 155 mi · 3½ hr',
    stay: 'Hood River · night 1 of 2',
    group: 'All six',
    description: 'Cross the high desert to the Columbia River Gorge at Hood River, with views of Mount Hood on the way.',
    detail: 'Winter ice storms occasionally close I-84 through the Gorge. Check TripCheck before leaving Bend.',
  },
  {
    date: 'Wed · Dec 30',
    title: 'Waterfalls of the Gorge',
    drive: 'Local touring · ≈ 60 mi',
    stay: 'Hood River · night 2 of 2',
    group: 'All six',
    description: 'Walk to Multnomah Falls and the other falls along the Historic Columbia River Highway, with lunch in Hood River. Pick short walks, because trails ice over after cold snaps.',
    detail: 'Ice on the Multnomah Falls trail and the Historic Highway is common in winter. Bring traction and keep to the lower trails.',
  },
  {
    date: 'Thu · Dec 31',
    title: 'Hood River to Portland',
    drive: '≈ 60 mi · 1¼ hr',
    stay: 'Portland · night 1 of 2',
    group: 'All six',
    description: 'A short drive into Portland for New Year’s Eve in a real city, with restaurants and plenty of indoor choices.',
  },
  {
    date: 'Fri · Jan 1',
    title: 'Portland slack day',
    drive: 'Local only',
    stay: 'Portland airport hotel · 1 night',
    group: 'All six',
    description: 'Keep the day loose, and move to the airport hotel by evening. Slack here absorbs a delay from any earlier storm.',
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

const utahDays: Day[] = [
  parentsVisit,
  {
    date: 'Mon · Dec 21',
    title: 'Fly to Las Vegas, drive to Zion',
    drive: 'SFO → LAS flight · about 1½ hr, then ≈ 160 mi · 3¼ hr',
    stay: 'Springdale · night 1 of 3',
    group: 'Before the girls',
    description: 'You fly out of SFO in the morning while Ayelet and Tal land in Las Vegas. Collect the one-way rental, shop before leaving the city, and drive to Springdale at the foot of Zion Canyon.',
    detail: 'Aim to land by about noon so the drive finishes before dark.',
  },
  {
    date: 'Tue · Dec 22',
    title: 'Zion Canyon in winter',
    drive: 'Park touring only',
    stay: 'Springdale · night 2 of 3',
    group: 'Before the girls',
    description: 'Walk the Riverside Walk and the Pa’rus Trail, and choose Emerald Pools or the Watchman Trail by ice and daylight.',
    detail: 'Check NPS for Zion Canyon shuttle and road status, and avoid narrow canyons when rain or snowmelt creates flood risk.',
  },
  {
    date: 'Wed · Dec 23',
    title: 'Zion’s quieter edges',
    drive: 'About 1 to 2 hr, depending on choice',
    stay: 'Springdale · night 3 of 3',
    group: 'Before the girls',
    description: 'Choose Kolob Canyons for a quiet drive and short walks, or Snow Canyon State Park near St. George for red sand and lava rock.',
  },
  {
    date: 'Thu · Dec 24',
    title: 'Girls arrive in St. George, drive to Bryce',
    drive: '≈ 190 mi · about 4 hr',
    stay: 'Bryce Canyon area · night 1 of 2',
    group: 'All six',
    description: 'Collect Shelly and Maia at the St. George airport, then continue to Bryce for Christmas Eve on the rim at sunset.',
    detail: 'St. George has limited flights. If the girls can only reach Las Vegas, the group meets them there on Dec 24 and ends the day in Springdale, which adds a night and drops Kolob and Snow Canyon.',
  },
  {
    date: 'Fri · Dec 25',
    title: 'Christmas at Bryce Canyon',
    drive: 'Park touring only',
    stay: 'Bryce Canyon area · night 2 of 2',
    group: 'All six',
    description: 'Walk the rim between Sunrise and Sunset Points and, if the paths are clear, drop into the amphitheater for a short loop among the hoodoos.',
    detail: 'Bryce sits above 8,000 ft. Winter storms bring ice and short closures. Carry traction gear the rental permits.',
  },
  {
    date: 'Sat · Dec 26',
    title: 'Highway 12 to Torrey',
    drive: '≈ 115 mi · about 3 hr before stops',
    stay: 'Torrey · night 1 of 2',
    group: 'All six',
    description: 'The scenic centerpiece: Grand Staircase country and Boulder Mountain on the way to Torrey.',
    detail: 'This is the trip’s main weather gate. Highway 12 reaches roughly 9,600 ft near Boulder Mountain. Use US-89 alternatives if the pass is unsafe.',
  },
  {
    date: 'Sun · Dec 27',
    title: 'A full day in Capitol Reef',
    drive: 'Local park touring',
    stay: 'Torrey · night 2 of 2',
    group: 'All six',
    description: 'Explore Fruita, the petroglyphs, Scenic Drive, and Grand Wash as conditions allow. It is the day to sacrifice if Highway 12 slips.',
  },
  {
    date: 'Mon · Dec 28',
    title: 'Torrey to Moab',
    drive: '≈ 155 mi · 3¼ hr',
    stay: 'Moab · night 1 of 3',
    group: 'All six',
    description: 'Cross the San Rafael desert to Moab, with the afternoon left for Dead Horse Point or a Moab walk.',
  },
  {
    date: 'Tue · Dec 29',
    title: 'Arches in winter',
    drive: 'Park touring only',
    stay: 'Moab · night 2 of 3',
    group: 'All six',
    description: 'Build the day from short stops at the Windows and Balanced Rock, then choose Delicate Arch or Devils Garden according to ice and daylight.',
    detail: 'Microspikes add options after snow, but turn around when sandstone or exposed slickrock is icy.',
  },
  {
    date: 'Wed · Dec 30',
    title: 'Canyonlands, Island in the Sky',
    drive: '≈ 70 mi round trip',
    stay: 'Moab · night 3 of 3',
    group: 'All six',
    description: 'Spend the day at the Island in the Sky overlooks above the Colorado and Green River canyons, with a short walk to Mesa Arch.',
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
    description: 'Keep the day loose. Antelope Island and the Great Salt Lake are the easy outing, and the slack absorbs a delay from any earlier storm.',
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

const yellowstonePhotoStory: RoutePhoto[] = [
  {
    src: 'yellowstone-mammoth.jpg',
    stop: 'Dec 22 · Mammoth Hot Springs',
    title: 'Steam rising from the terraces',
    alt: 'Steam drifting over snow-covered travertine terraces at Mammoth Hot Springs',
    note: 'The one hot-spring area you can reach by car in winter.',
    credit: 'Yellowstone National Park / NPS',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Steamy,_winter_morning_at_the_Mammoth_Hot_Springs_Terraces_(52559000847).jpg',
  },
  {
    src: 'yellowstone-bison.jpg',
    stop: 'Dec 23 · Lamar Valley',
    title: 'A quiet valley, a lone bison',
    alt: 'A bison grazing on a snowy slope below Specimen Ridge in Yellowstone',
    note: 'Dawn and dusk are the best hours for wildlife, so plan around them.',
    credit: 'Jacob W. Frank / NPS',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Bison_with_Specimen_Ridge_Backdrop_(6b848ec7-023e-4f4e-94bb-1d458560a1e3).jpg',
  },
  {
    src: 'yellowstone-snowcoach.jpg',
    stop: 'Dec 26 · The snowcoach road',
    title: 'The way in is the experience',
    alt: 'A yellow snowcoach on a snowy road below snow-covered mountains at Swan Lake Flat',
    note: 'Old Faithful is reached by snowcoach or snowmobile, not a car.',
    credit: 'Neal Herbert / NPS',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Snowcoach_on_Swan_Lake_Flat_(23814044045).jpg',
  },
  {
    src: 'yellowstone-falls.jpg',
    stop: 'Dec 27 · Grand Canyon of the Yellowstone',
    title: 'A frozen Upper Falls',
    alt: 'A partly frozen waterfall in a snowy forest in the Grand Canyon of the Yellowstone',
    note: 'Reached on the optional snowcoach day trip from Old Faithful.',
    credit: 'YellowstoneNPS',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:A_snowy_Upper_Falls_in_Grand_Canyon_of_the_Yellowstone_(54364374807).jpg',
  },
];

const utahPhotoStory: RoutePhoto[] = [
  {
    src: 'utah-zion.jpg',
    stop: 'Dec 22 · Zion',
    title: 'Snow-dusted cliffs',
    alt: 'Snowy red cliffs on the east side of Zion National Park',
    note: 'The first all-park day, and the warmest of the trip.',
    credit: 'Zion National Park',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Winter_on_the_East_Side_(6888172987).jpg',
  },
  {
    src: 'utah-bryce.jpg',
    stop: 'Dec 24 · Bryce Canyon',
    title: 'Hoodoos under snow',
    alt: 'Snow around the hoodoos at Bryce Canyon National Park',
    note: 'Reach the rim for Christmas Eve sunset.',
    credit: 'Bigwiggy',
    license: 'CC BY 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Bryce_Canyon_National_Park,_Utah,_In_winter.jpg',
  },
  {
    src: 'utah-highway12.jpg',
    stop: 'Dec 26 · Highway 12',
    title: 'The road is the centerpiece',
    alt: 'A wide view across colorful mountains from Scenic Byway 12 near Boulder Mountain',
    note: 'Take the high route only when the forecast and pavement both cooperate.',
    credit: 'S. Clyde / NARA',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Scenic_Byway_12_-_A_Sweeping_View_from_Boulder_Mountain_-_NARA_-_7721710.jpg',
  },
  {
    src: 'utah-capitol-reef.jpg',
    stop: 'Dec 27 · Capitol Reef',
    title: 'Red rock under winter snow',
    alt: 'Snowy desert valley and Chimney Rock in Capitol Reef National Park',
    note: 'A full park day from Torrey, with room to adjust to ice and short daylight.',
    credit: 'National Park Service',
    license: 'Public domain',
    source: 'https://commons.wikimedia.org/wiki/File:Chimney_Rock_Loop_in_Winter_(9d1158db-8cb4-4db0-ba52-897559007cc4).JPG',
  },
  {
    src: 'utah-canyonlands.jpg',
    stop: 'Dec 30 · Canyonlands',
    title: 'One last immense Moab view',
    alt: 'Layered red canyons seen from Grand View Point in Canyonlands National Park',
    note: 'Island in the Sky is a full-day outing from Moab.',
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

const ninoStats = [
  ['Niño-3.4 index in the Oct 8 update', '+2.1 °C'],
  ['Chance of a strong-to-very strong El Niño through Jan–Mar 2027', '> 83%'],
  ['Chance Nov–Jan is a record event, stronger than any since 1950', '70%'],
  ['Above-normal precipitation odds near the California coast, Dec–Feb', '50–60%'],
];

const ninoRows = [
  [
    'Yellowstone in winter',
    'NOAA leans drier across the interior Northwest and warmer across the northern tier, with 50 to 60% odds of above-normal temperatures in the interior Northwest. Private forecasters put northwest Wyoming on the dry side of the El Niño split, but NOAA’s text does not name Yellowstone itself.',
    'Cold-air outbreaks, which NOAA says remain possible across the northwestern states, can bring nights well below zero. Blizzards can close Bozeman Pass and US-191 in Gallatin Canyon, and snowcoaches cancel in bad weather. Rooms inside the park are limited and likely to sell out.',
    'Lowest',
  ],
  [
    'Central Oregon',
    'Inside the interior Northwest dry tilt, and milder than Montana. The Cascades are the least reliable part of the El Niño pattern, so storms can still arrive.',
    'Freezing rain and ice on passes and in the Gorge, chains at Crater Lake, closures of the Rim Village road in storms, and warmer air turning Cascade snow into rain.',
    'Low',
  ],
  [
    'Utah red rock',
    'Southern Utah is at the edge of the Four Corners wet tilt. The outlook text names the Four Corners rather than Utah itself, so check the CPC map before relying on it.',
    'Snow and ice at Bryce, Boulder Mountain, and Highway 12 on Dec 24 to 26. Flash floods in desert washes. Ice on US-6 over Soldier Summit on Dec 31.',
    'Moderate',
  ],
];

const ninoDates = [
  ['Now', 'Check Yellowstone lodging and snowcoach availability before anything else. Holiday week sells out first, and the answer decides whether option 01 is possible.'],
  ['Oct 15', 'CPC releases its next seasonal outlooks. Check whether the northern-tier dry and warm tilt holds, and whether California and Southwest odds rose.'],
  ['Nov 12', 'CPC’s next ENSO update. Pick a route and book flights soon after: the three options use different first airports (BZN, RDM, LAS), so flights commit the choice. Prefer changeable fares until then.'],
  ['Dec 17', 'CPC’s December outlook, and a first look at the 8 to 14 day outlook for Dec 21 to 31. Use it to settle cold gear, car class, and traction, not to change airports.'],
];

const sources = [
  ['NOAA ENSO diagnostic discussion, Oct 8 2026', 'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.shtml'],
  ['NOAA seasonal outlook discussion, Sept 17 2026', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/fxus05.html'],
  ['NOAA seasonal outlook maps', 'https://www.cpc.ncep.noaa.gov/products/predictions/long_range/'],
  ['NOAA 8 to 14 day outlook', 'https://www.cpc.ncep.noaa.gov/products/predictions/814day/'],
  ['Yellowstone winter lodging and snowcoach', 'https://www.yellowstonenationalparklodges.com/winter/'],
  ['Yellowstone current conditions', 'https://www.nps.gov/yell/planyourvisit/conditions.htm'],
  ['Yellowstone wildlife and winter safety', 'https://www.nps.gov/yell/planyourvisit/safety.htm'],
  ['Montana road conditions', 'https://www.mdt.mt.gov/travinfo/'],
  ['NWS Billings forecast', 'https://www.weather.gov/byz/'],
  ['Chico Hot Springs', 'https://www.chicohotsprings.com/'],
  ['Museum of the Rockies', 'https://www.museumoftherockies.org/'],
  ['Oregon road conditions (TripCheck)', 'https://tripcheck.com/'],
  ['Oregon winter driving', 'https://www.oregon.gov/odot/Pages/Winter-Driver-Responsibilities.aspx'],
  ['Crater Lake conditions', 'https://www.nps.gov/crla/planyourvisit/conditions.htm'],
  ['Summer Lake Hot Springs', 'https://www.summerlakehotsprings.com/'],
  ['High Desert Museum', 'https://www.highdesertmuseum.org/'],
  ['NWS Pendleton forecast', 'https://www.weather.gov/pdt/'],
  ['Zion seasons and weather', 'https://home.nps.gov/zion/planyourvisit/seasons.htm'],
  ['Bryce Canyon in winter', 'https://www.nps.gov/brca/planyourvisit/winter.htm'],
  ['Capitol Reef Scenic Drive', 'https://www.nps.gov/care/planyourvisit/scenicdrive.htm'],
  ['Capitol Reef directions and Highway 12', 'https://home.nps.gov/care/planyourvisit/directions.htm'],
  ['Arches winter guide', 'https://www.nps.gov/arch/planyourvisit/winter.htm'],
  ['Southern Utah parks in winter', 'https://www.nps.gov/articles/000/national-parks-in-southern-utah.htm'],
  ['Utah road conditions (UDOT)', 'https://www.udottraffic.utah.gov/'],
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
  tone: Tone;
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
            <a href="#yellowstone">Yellowstone</a>
            <a href="#oregon">Oregon</a>
            <a href="#utah">Utah</a>
            <a href="#decision">Compare</a>
          </div>
          <span>Dec 21, 2026 · Jan 2, 2027</span>
        </nav>

        <div className="hero-copy" id="top">
          <p className="kicker">Three airports, three roads</p>
          <h1>One family.<br />Three wild directions.</h1>
          <p className="lede">
            See the grandparents first. Meet Ayelet and Tal at a western airport on Dec 21, gather all six by Christmas Eve,
            then choose Yellowstone in winter, the Oregon high desert, or Utah’s red rock, with a very strong El Niño now shaping the odds.
          </p>
        </div>

        <div className="hero-choices" aria-label="Route summaries">
          <a className="hero-choice hero-yellowstone" href="#yellowstone">
            <span>01 · Dry side · coldest</span>
            <strong>BZN → Mammoth → Old Faithful → BZN</strong>
          </a>
          <a className="hero-choice hero-oregon" href="#oregon">
            <span>02 · Dry side · milder</span>
            <strong>RDM → Crater Lake → PDX</strong>
          </a>
          <a className="hero-choice hero-utah" href="#utah">
            <span>03 · Warmest · most exposed</span>
            <strong>LAS → Zion → Moab → SLC</strong>
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
              All three options avoid places you have already been, and none includes a winter sport.
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
            <h2 id="nino-heading">A very strong El Niño is building. Go where the storms are not.</h2>
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
                <li>The interior Northwest leans drier than normal, and most of the West leans warmer, with the highest odds of warmth (50 to 60%) in the interior Northwest and along the northern tier. The warm tilt over the Southwest fades to equal chances as winter goes on.</li>
                <li>NOAA warns that one or more cold-air outbreaks remain possible across the northwestern states, though they should not change the three-month average much. A negative Pacific Decadal Oscillation may also dampen the usual El Niño effects in places.</li>
              </ul>
            </div>
            <div>
              <p className="kicker">How to use it</p>
              <div className="prose-stack">
                <p>A strong El Niño tilts the storm track south. It does not schedule storms, and most winter precipitation arrives in a few large systems with dry stretches between them.</p>
                <p>That makes the northern Rockies and the interior Northwest the safer bets: the storms that matter, atmospheric rivers and flooding, mostly miss them. The trade-off is cold and snow, which are predictable and plowed, rather than storms that close coastal roads.</p>
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
            <h2 id="more-heading">The options moved to the dry side.</h2>
            <p>
              You have already been to Death Valley, Joshua Tree, the Grand Canyon, and the Tetons, and El Niño is
              the main concern. The earlier plans, which ran through the wettest part of the outlook, are replaced by
              routes in the northern Rockies and the interior Northwest, with Utah kept as the warm, higher-exposure comparison.
            </p>
          </div>
          <div className="more-notes">
            <p className="kicker">Considered and set aside</p>
            <ul className="nino-list">
              <li>The Pacific coast from Oregon to San Diego: the strongest wet tilt on the West Coast, and slides and surf can close its main road.</li>
              <li>Glacier National Park in winter: road access is limited, and flights usually connect through another hub.</li>
              <li>Colorado, Tahoe, and Sun Valley: built around skiing, which you do not want, and not on the dry side.</li>
            </ul>
          </div>
        </section>

        <section className="route-section yellowstone-section" id="yellowstone" aria-labelledby="yellowstone-heading">
          <header className="route-header">
            <div>
              <p className="route-number">Option 01</p>
              <p className="kicker">Wildlife · geysers · hot springs</p>
            </div>
            <h2 id="yellowstone-heading">Yellowstone in winter</h2>
            <p className="route-deck">
              The park at its quietest: wolves and bison in the Lamar Valley, Old Faithful by snowcoach,
              and hot springs to thaw in. Short drives, a lot of cold, and the driest, warmest side of the El Niño outlook.
            </p>
          </header>

          <div className="route-stats" aria-label="Yellowstone route statistics">
            <div><span>Planning distance</span><strong>≈ 650 mi</strong></div>
            <div><span>Longest normal leg</span><strong>2 hr</strong></div>
            <div><span>Full-family bases</span><strong>4</strong></div>
            <div><span>Airports</span><strong>SFO · BZN</strong></div>
          </div>

          <figure className="panorama panorama-yellowstone">
            <img src={`${siteBasePath}/photos/yellowstone-old-faithful.jpg`} alt="Old Faithful erupting against a blue sky above a snow-covered geyser basin" />
            <figcaption>Old Faithful in winter. Photo: YellowstoneNPS, public domain. <a href="https://commons.wikimedia.org/wiki/File:Winter_Old_Faithful_eruption_(54366091548).jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
          </figure>

          <div className="route-summary-grid">
            <div>
              <p className="kicker">Why this route</p>
              <h3>The quietest season in America’s busiest wildlife park.</h3>
            </div>
            <div className="prose-stack">
              <p>The first three days are Paradise Valley hot springs, Mammoth, and the Lamar Valley, the one road in the park that stays open to cars. Shelly and Maia land in Bozeman on Dec 24, and all six ride the snowcoach to Old Faithful for two nights.</p>
              <p>The cost is cold and lodging. Nights can fall below zero, and the two lodges inside the park, which have limited rooms, may already be sold out for holiday week. Check them first. If they are, base in Gardiner and West Yellowstone and add a day snowcoach tour.</p>
            </div>
          </div>

          <Itinerary days={yellowstoneDays} tone="yellowstone" />

          <RoutePhotoAtlas
            photos={yellowstonePhotoStory}
            tone="yellowstone"
            heading="A quiet park under snow."
            description="Four views follow the route in order, from the Mammoth terraces to the frozen Upper Falls."
          />

          <div className="rule-row">
            <aside className="weather-card">
              <p className="kicker">The Yellowstone rule</p>
              <blockquote>Dress for the night, not the afternoon.</blockquote>
              <p>Pack layers that work below zero, hand and foot warmers, and a full tank. Keep the wildlife distances: 25 yards from bison and elk, 100 yards from wolves and bears.</p>
            </aside>
          </div>

          <aside className="compressed-plan">
            <div>
              <p className="kicker">If the park lodges are full</p>
              <h3>Base outside, ride in by day.</h3>
            </div>
            <p>Stay in Gardiner for the Lamar Valley days and in West Yellowstone for the Old Faithful days, and book a full-day snowcoach tour in place of the overnight at the Snow Lodge. Keep Bozeman and Paradise Valley as they are.</p>
          </aside>
        </section>

        <section className="route-section oregon-section" id="oregon" aria-labelledby="oregon-heading">
          <header className="route-header">
            <div>
              <p className="route-number">Option 02</p>
              <p className="kicker">High desert · crater · hot springs</p>
            </div>
            <h2 id="oregon-heading">Central Oregon to Portland</h2>
            <p className="route-deck">
              Volcanic desert, Crater Lake under snow, remote hot springs, and wintering eagles. Milder than Montana,
              also on the dry side of the outlook, with fewer headline sights.
            </p>
          </header>

          <div className="route-stats" aria-label="Central Oregon route statistics">
            <div><span>Planning distance</span><strong>≈ 900 mi</strong></div>
            <div><span>Longest normal leg</span><strong>3½ hr</strong></div>
            <div><span>Full-family bases</span><strong>4 + PDX</strong></div>
            <div><span>Airports</span><strong>SFO · RDM · PDX</strong></div>
          </div>

          <figure className="panorama panorama-oregon">
            <img src={`${siteBasePath}/photos/oregon-crater-lake.jpg`} alt="Wizard Island in Crater Lake under low cloud, with snow in the foreground" />
            <figcaption>Crater Lake in winter. Photo: National Park Service, public domain. <a href="https://commons.wikimedia.org/wiki/File:Crater_Lake_in_Winter_3,_Crater_Lake_National_Park.jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
          </figure>

          <div className="route-summary-grid">
            <div>
              <p className="kicker">Why this route</p>
              <h3>A volcanic desert on the dry side of the Cascades.</h3>
            </div>
            <div className="prose-stack">
              <p>Four nights in Bend before the girls arrive give the group a base with restaurants and day trips, then the road runs through high-desert hot springs and the Klamath Basin to Crater Lake and back, ending in the Columbia Gorge and Portland.</p>
              <p>The weak points are ice on passes and in the Gorge, and the Rim Village road at Crater Lake, which can close in storms. It is also a quieter set of sights than Yellowstone, so it works best as the milder fallback.</p>
            </div>
          </div>

          <Itinerary days={oregonDays} tone="oregon" />

          <div className="photo-grid oregon-photos">
            <figure className="photo-tall">
              <img src={`${siteBasePath}/photos/oregon-eagles.jpg`} alt="Bald eagles feeding on an icy surface at Lower Klamath National Wildlife Refuge" />
              <figcaption>Bald eagles, Klamath Basin, Dec 26. Photo: U.S. Fish and Wildlife Service, public domain. <a href="https://commons.wikimedia.org/wiki/File:Bald_eagles_on_Lower_Klamath_NWR,_Siskiyou_County,_California_(5710534166).jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
            </figure>
            <figure>
              <img src={`${siteBasePath}/photos/oregon-fort-rock.jpg`} alt="A tall tuff cliff and rocky ridge under a blue sky at Fort Rock State Natural Area" />
              <figcaption>Fort Rock, Dec 25. Photo: U.S. Forest Service, public domain. <a href="https://commons.wikimedia.org/wiki/File:Fort_Rock,_Fort_Rock_State_Natural_Area,_Oregon_States_Parks_%26_Recreation_(35941871990).jpg" target="_blank" rel="noreferrer">Source ↗</a></figcaption>
            </figure>
            <aside className="weather-card">
              <p className="kicker">The Oregon rule</p>
              <blockquote>Cold and clear is the good case. Freezing rain is the bad one.</blockquote>
              <p>Check TripCheck each morning, carry chains, and trade a long drive for a local one whenever ice is forecast on a pass.</p>
            </aside>
          </div>

          <aside className="compressed-plan">
            <div>
              <p className="kicker">If an ice storm sits on the Gorge</p>
              <h3>Stay in Bend, skip the Gorge.</h3>
            </div>
            <p>If I-84 is closed on Dec 29, stay in Bend, shorten the route to Portland by a day, and take US-26 over the Cascades only after the highway is clear. The Dec 28 Bend night and the Jan 1 Portland day are the slack.</p>
          </aside>
        </section>

        <section className="route-section utah-section" id="utah" aria-labelledby="utah-heading">
          <header className="route-header">
            <div>
              <p className="route-number">Option 03</p>
              <p className="kicker">Plateau · red rock · high desert</p>
            </div>
            <h2 id="utah-heading">Zion to the Utah parks</h2>
            <p className="route-deck">
              The most dramatic scenery of the three and the warmest days, and the highest exposure to the El Niño
              wet tilt. Treat Highway 12 as a weather gate, not a commitment.
            </p>
          </header>

          <div className="route-stats" aria-label="Utah route statistics">
            <div><span>Planning distance</span><strong>≈ 1,100 mi</strong></div>
            <div><span>Longest normal leg</span><strong>4½ hr</strong></div>
            <div><span>Full-family bases</span><strong>3 + SLC</strong></div>
            <div><span>Airports</span><strong>SFO · LAS · SLC</strong></div>
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
              <p>The first three days are Zion Canyon and its quieter edges, then the girls land in St. George and all six climb to Bryce for Christmas. From there the road runs through Capitol Reef and Moab, with two-night bases at Bryce and Torrey and three nights in Moab.</p>
              <p>The weak point is high-elevation weather on Dec 24 to 26 and a four-hour drive on Dec 31. Southern Utah sits at the edge of the Four Corners wet tilt, so it carries more El Niño uncertainty than the northern options, and the girls’ St. George flights need checking.</p>
            </div>
          </div>

          <Itinerary days={utahDays} tone="utah" />

          <RoutePhotoAtlas
            photos={utahPhotoStory}
            tone="utah"
            heading="From Zion’s canyon walls to the Great Salt Lake."
            description="Six views follow the road in order, so the landscape changes with the itinerary instead of appearing as a disconnected gallery."
          />

          <aside className="compressed-plan">
            <div>
              <p className="kicker">If a storm closes Highway 12</p>
              <h3>Hold in Bryce, not on the pass.</h3>
            </div>
            <p>If Boulder Mountain is closed on Dec 26, stay another night at Bryce, then take a US-89 alternative to Torrey when roads allow. Capitol Reef is the day to sacrifice: you still reach Moab on Dec 28, and the Jan 1 slack in Salt Lake City absorbs the rest.</p>
          </aside>
        </section>

        <section className="decision-section" id="decision" aria-labelledby="decision-heading">
          <div className="section-intro">
            <p className="kicker">The decision</p>
            <h2 id="decision-heading">Pick the risk you prefer.</h2>
            <p>All three options fit the family calendar. The choice is cold and short days on the dry side, a milder dry-side fallback, or warmer days and more exposure. A strong El Niño changes the odds on each.</p>
          </div>

          <div className="comparison-table" role="table" aria-label="Route comparison">
            <div className="comparison-row comparison-head" role="row">
              <div role="columnheader">Question</div>
              <div role="columnheader">01 Yellowstone in winter</div>
              <div role="columnheader">02 Central Oregon</div>
              <div role="columnheader">03 Utah red rock</div>
            </div>
            {[
              ['Visual payoff', 'Highest: geysers, steam, wildlife, deep snow', 'Medium-high: Crater Lake, desert, hot springs', 'Highest: red rock, snow, immense scale'],
              ['Solitude', 'Very high in winter; quiet park', 'High; remote high desert', 'High between parks; mixed in Zion and Arches'],
              ['Weather exposure', 'Cold, snow, and Gallatin Canyon avalanche closures', 'Ice on passes and in the Gorge', 'Snow and ice on high roads; flash floods'],
              ['El Niño exposure', 'Lowest; dry and warm side of the outlook', 'Low; dry tilt, but the Cascades are unreliable', 'Moderate; edge of the Four Corners wet tilt'],
              ['Driving', 'Short: nothing over 2 hr', 'Medium: up to 3½ hr', 'Long: up to 4½ hr'],
              ['Hotel rhythm', 'Two-night bases at Mammoth, Old Faithful, Bozeman, Chico', 'Four nights in Bend, then mostly short stays', 'Two-night bases at Bryce and Torrey, three each at Springdale and Moab'],
              ['Flights', 'You fly SFO to BZN; girls land BZN; home from BZN, so no one-way fee', 'You fly SFO to RDM; girls land RDM; home from PDX', 'You fly SFO to LAS; girls land SGU (or LAS); home from SLC'],
              ['Biggest booking risk', 'Park lodging and snowcoaches may already be full', 'Summer Lake cabins are limited', 'St. George flights are limited'],
              ['Can it switch late?', 'No; flights commit it by mid-November', 'No; flights commit it by mid-November', 'No; flights commit it by mid-November'],
              ['Best for', 'Wildlife and a true winter, with the safest El Niño odds', 'A milder dry-side fallback', 'Scenery and warmer days, with more exposure'],
            ].map(([label, yellowstone, oregon, utah]) => (
              <div className="comparison-row" role="row" key={label}>
                <div role="rowheader">{label}</div>
                <div role="cell">{yellowstone}</div>
                <div role="cell">{oregon}</div>
                <div role="cell">{utah}</div>
              </div>
            ))}
          </div>

          <div className="recommendation">
            <p className="kicker">Current lean</p>
            <h3>Lead with Yellowstone, if the lodging can be booked now.</h3>
            <p>It sits on the dry, warm side of the El Niño outlook, keeps every drive near two hours, has the most solitude and wildlife, and needs no one-way rental. The trade-off is real cold, and holiday-week rooms inside the park that may already be full. If they are, central Oregon is the fallback, also on the dry side and milder, with fewer headline sights. Utah is the most scenic but the most exposed. This is our reading of the outlook, not NOAA’s. Revisit after the Oct 15 and Nov 12 updates, and before booking flights.</p>
          </div>
        </section>

        <section className="checklist-section" aria-labelledby="checklist-heading">
          <div>
            <p className="kicker">Before anything becomes nonrefundable</p>
            <h2 id="checklist-heading">Four decisions unlock the bookings.</h2>
          </div>
          <ol className="booking-list">
            <li><span>01</span><p>This week, check Yellowstone lodging and snowcoach availability. Mammoth Hotel and Old Faithful Snow Lodge open Dec 15 and 16, and both sell out. Without in-park rooms, base in Gardiner and West Yellowstone and book a day snowcoach.</p></li>
            <li><span>02</span><p>Pick the route by mid-November, then price flights: you from SFO, and Ayelet and Tal, to the first airport on Dec 21 (BZN, RDM, or LAS); Shelly and Maia to the Dec 24 airport (BZN, RDM, or SGU); everyone home Jan 2. SFO to BZN and SFO to RDM appear to have nonstop service, but I have not confirmed winter schedules.</p></li>
            <li><span>03</span><p>Compare six-person vehicle capacity with luggage, winter tires or chains, and the rental company’s traction-device policy. Only options 02 (RDM to PDX) and 03 (LAS to SLC) carry a one-way fee; Yellowstone starts and ends at Bozeman.</p></li>
            <li><span>04</span><p>Set the weather calls: the NOAA dates in the forecast section, seven days out for major rerouting, and every morning for roads, trails, daylight, and cold. For Yellowstone, pack for below-zero nights.</p></li>
          </ol>
        </section>

        <section className="sources-section" aria-labelledby="sources-heading">
          <div>
            <p className="kicker">Planning sources</p>
            <h2 id="sources-heading">Use live official conditions, not this page, on travel day.</h2>
            <p>Mileage and drive times are rounded planning estimates without major weather delays. The itinerary was assembled in August 2026 and revised in October 2026 for travel from Dec 21, 2026 to Jan 2, 2027. The forecast section reflects NOAA products issued Sept 17 and Oct 8, 2026 and will be out of date after the next releases. Yellowstone’s 2026-27 winter season dates are from the park lodges and may shift with weather.</p>
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
