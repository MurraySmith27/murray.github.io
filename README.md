# murray.github.io

Personal homepage for **Murray Smith**, solo game dev from Toronto.
Hosted on GitHub Pages at [murraydev.site](https://murraydev.site).

Hand-coded early-2000s style: starfield background, Win98 windows, a marquee, and real
GeoCities GIFs rescued via the Internet Archive's [GifCities](https://gifcities.org).

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | All page content: about me, DeckTerra, Paw Pirates, links. |
| `styles.css` | All styling. |
| `script.js` | Sparkly cursor trail + footer year. |
| `img/murray.jpg` | Headshot (YouTube profile picture). |
| `img/deckterra/`, `img/pawpirates/` | Steam header images and screenshots. |
| `img/gifs/` | The silly GIFs. |

## Adding a game

Copy one of the `<section class="window game">` blocks in `index.html`, drop its images in
`img/<game>/`, and add a link to the Navigation list in the sidebar.

## Running locally

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.
