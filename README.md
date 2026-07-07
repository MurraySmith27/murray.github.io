# murray.github.io

Personal portfolio for **Murray Smith** — game dev, software engineer, paint.net enthusiast.
Hosted on GitHub Pages at [murraydev.site](https://murraydev.site).

A single-page, 3D-animated portfolio built with [three.js](https://threejs.org/). As you scroll,
a field of cubes, spheres, toruses and torus-knots rotates and drifts in the background while the
camera glides down the scene.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Page markup — top-bar social links, hero, games grid, contact. |
| `styles.css` | All styling. |
| `app.js` | three.js background + game-card rendering + scroll reveals. |
| `lib/three.module.min.js` | Vendored three.js r160 (ES module) — no build step, no CDN. |

## Editing your games

Open `app.js` and edit the `GAMES` array near the top. Each entry:

```js
{
  title: "Neon Drift",
  desc:  "A synthwave arcade racer…",
  emoji: "🏎️",              // shown on the card thumbnail
  tags:  ["Arcade", "Racing"],
  url:   "https://…",        // link to the playable game
  hue:   285,                // 0–360, tints the card thumbnail
}
```

## Editing your social links

The links live in `index.html` inside `<nav class="socials">` — replace each `href`
with your real profile URLs (YouTube, Instagram, TikTok, X, Bluesky, LinkedIn).

## Running locally

Because it uses ES modules, open it through a web server (not `file://`):

```bash
npx serve .
# or
python -m http.server 8000
```

Then visit <http://localhost:8000>.
