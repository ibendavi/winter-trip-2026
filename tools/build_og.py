"""Build public/og.png (1200x630) from the Superstitions photo and the site title. Run: py -3 tools/build_og.py"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(__file__), "..")
photo = Image.open(os.path.join(ROOT, "public", "photos", "az-superstitions.jpg")).convert("RGB")
W, H = 1200, 630
scale = max(W / photo.width, H / photo.height)
photo = photo.resize((int(photo.width * scale), int(photo.height * scale)))
left, top = (photo.width - W) // 2, (photo.height - H) // 2 - 20
canvas = photo.crop((left, max(top, 0), left + W, max(top, 0) + H))

overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(overlay)
for y in range(H):
    alpha = int(210 * (y / H) ** 1.4)
    d.line([(0, y), (W, y)], fill=(18, 26, 22, alpha))
canvas = Image.alpha_composite(canvas.convert("RGBA"), overlay)

draw = ImageDraw.Draw(canvas)
fonts = r"C:\Windows\Fonts"
title = ImageFont.truetype(os.path.join(fonts, "georgia.ttf"), 96)
sub = ImageFont.truetype(os.path.join(fonts, "georgiab.ttf"), 30)
small = ImageFont.truetype(os.path.join(fonts, "arialbd.ttf"), 22)
draw.text((70, 330), "The warm desert loop", font=title, fill=(255, 250, 240))
draw.text((74, 450), "Superstitions, Organ Pipe, Tucson, Bisbee", font=sub, fill=(255, 250, 240))
draw.text((74, 530), "WINTER BREAK 2026  ·  DEC 21 – JAN 2  ·  PHOENIX LOOP", font=small, fill=(233, 180, 76))
canvas.convert("RGB").save(os.path.join(ROOT, "public", "og.png"), optimize=True)
print("wrote og.png")
