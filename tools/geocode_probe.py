import json, time, urllib.parse, urllib.request

QUERIES = [
    "Grand Canyon Skywalk, Peach Springs, AZ",
    "Guano Point, Grand Canyon West, AZ",
    "Hualapai Ranch, Grand Canyon West, AZ",
    "Hualapai Lodge, Peach Springs, AZ",
    "Hoover Dam",
    "Boulder Dam Hotel, Boulder City, NV",
    "Harry Reid International Airport, Las Vegas",
    "Red Rock Canyon Visitor Center, Nevada",
    "Cable Mountain Lodge, Springdale, UT",
    "Desert Pearl Inn, Springdale, UT",
    "Zion Lodge, Zion National Park",
    "Temple of Sinawava, Zion National Park",
    "Ruby's Inn, Bryce Canyon City, UT",
    "Sunset Point, Bryce Canyon National Park",
    "Red Sands Hotel, Torrey, UT",
    "Aquarius Motel, Torrey, UT",
    "Boulder Mountain Lodge, Boulder, UT",
    "Fruita, Capitol Reef National Park",
    "Red Cliffs Lodge, Moab, UT",
    "Dead Horse Point State Park",
    "Hoodoo Moab, Moab, UT",
    "Delicate Arch, Arches National Park",
    "Mesa Arch, Canyonlands National Park",
    "Grand View Point Overlook, Canyonlands",
    "Antelope Island State Park",
    "Temple Square, Salt Lake City",
    "Hotel Monaco, Salt Lake City",
    "Grand America Hotel, Salt Lake City",
    "Salt Lake City International Airport",
    "Hotel Peery, Salt Lake City",
    "Capitol Reef Resort, Torrey, UT",
    "Cottonwood Canyon Road Grand Staircase Escalante",
    "Calf Creek Falls, Utah",
    "Kodachrome Basin State Park",
    "Kolob Canyons Visitor Center",
]
for q in QUERIES:
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({"q": q, "format": "json", "limit": 1})
    req = urllib.request.Request(url, headers={"User-Agent": "winter-trip-planner/1.0 (family project; contact via GitHub ibendavi)"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            d = json.load(r)
        if d:
            print(f"{q:<55} {float(d[0]['lat']):.4f}, {float(d[0]['lon']):.4f}  {d[0]['display_name'][:60]}")
        else:
            print(f"{q:<55} NONE")
    except Exception as e:  # noqa: BLE001
        print(q, "ERR", e)
    time.sleep(1.3)
