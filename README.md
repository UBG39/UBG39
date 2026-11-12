# UBG39 — Colorful Graffiti Game Portal

```
index.html   style.css   script.js   games.json
images/      35 thumbnails (SVG, one per game)
games/       game-01 … game-35, each with an index.html
```

## Deploy (GitHub Pages)
Upload everything to the repo root, then Settings → Pages → deploy from `main` / root.
`games.json` is loaded with `fetch()`, so the site must be served over HTTP (GitHub Pages works;
locally use `python3 -m http.server`). Double-clicking `index.html` will show a load error.

## Add / edit a game
1. Put your game in `games/game-XX/index.html`.
2. Replace `images/game-XX.svg` with your own thumbnail (any image; update the path in `games.json`).
3. Edit that entry in `games.json`: `title`, `category`, `description`, `image`, `url`.
   Categories: `Arcade`, `Action`, `Sports`, `Puzzle`, `Other`. A new category name also works (it gets its own filter button).

The game and filter counts update automatically from `games.json`.
The 35 games are placeholders — each `games/game-XX/index.html` is a styled stub.
