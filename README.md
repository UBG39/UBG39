# UBG39 Gray Graffiti Game Portal

A polished gray, cartoon stone-brick + graffiti-inspired portal with **35 game slots**, search, category filters, and responsive cards.

## Upload to GitHub Pages
Upload `index.html`, `style.css`, `script.js`, and the `games/` folder to the **root** of your repository. In GitHub: Settings → Pages → deploy from `main` / root.

## Add a game
1. Put the game's HTML in a folder, for example `games/game-01/index.html`.
2. Put its thumbnail in `assets/` (or `images/`) if you have one.
3. Edit `script.js` and replace a slot's title/category/image/url/description. (This starter uses 35 generated placeholder slots.)
   - `url`: `games/game-01/index.html`
   - `image`: `assets/my-game.png` (or empty string)
   - category: `Arcade`, `Action`, `Sports`, `Puzzle`, or `Other`
4. Keep the array at 35 entries if you want exactly 35 cards.

## Note
The 35 starter slots are placeholders, not actual playable games. Replace their links with your own game files.
