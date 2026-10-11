import json, sys, urllib.parse, urllib.request, re

QUERIES = sys.argv[1:]
for q in QUERIES:
    params = {
        "action": "query", "format": "json", "generator": "search",
        "gsrsearch": q + " filetype:bitmap", "gsrnamespace": "6", "gsrlimit": "12",
        "prop": "imageinfo", "iiprop": "url|size|extmetadata", "iiurlwidth": "1600",
    }
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "winter-trip-planner/1.0 (family project)"})
    with urllib.request.urlopen(req, timeout=30) as r:
        d = json.load(r)
    print("=== ", q)
    for p in sorted(d.get("query", {}).get("pages", {}).values(), key=lambda x: x.get("index", 0)):
        ii = p["imageinfo"][0]
        m = ii["extmetadata"]
        lic = m.get("LicenseShortName", {}).get("value", "?")
        artist = re.sub("<[^>]+>", "", m.get("Artist", {}).get("value", "?"))[:40]
        print(f"{p['title']} | {ii['width']}x{ii['height']} | {lic} | {artist}")
