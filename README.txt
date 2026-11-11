UBG39 FULL WEBSITE TEMPLATE

This is a FULL website starter pack, including the main homepage files.
It is designed to be uploaded into the ROOT of your GitHub repository.

ROOT FILES:
- index.html  (main UBG39 homepage)
- style.css   (main homepage styling)
- script.js   (loads games.json, search and category filters)
- games.json  (five sample game cards)
- images/     (five included SVG thumbnails)
- games/      (five separate game folders)

UPLOAD:
1. Extract this ZIP on your computer.
2. Upload ALL the contents inside this folder to the ROOT of your GitHub repository.
3. If GitHub asks to replace files with the same names, only replace them if you want this new homepage design.
4. Commit the upload.
5. Enable GitHub Pages from Settings > Pages, using the main branch and /(root).

ADDING YOUR OWN GAME:
1. Open games/game-1 (or another game folder).
2. Replace its starter index.html, style.css and script.js with your game's files.
3. Copy all required assets into that same game folder, keeping relative paths.
4. Edit the matching entry in the root games.json:
   - title: displayed game name
   - category: Arcade, Action, Sports, Puzzle, Racing, or another category
   - image: path to thumbnail inside images/
   - url: path to the game's page, e.g. games/game-1/index.html
5. Upload the new thumbnail into images/ and make sure the filename matches games.json.

IMPORTANT:
- The root index.html is the homepage. Each games/game-N/index.html is a separate game page.
- Do not put the games folder's index.html at the root.
- The sample game pages are placeholders, not finished games.
- This pack uses no AI APIs, AI scripts, or chatbots.
