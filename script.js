const grid = document.getElementById("gamesGrid");
const searchInput = document.getElementById("gameSearch");
const filters = document.getElementById("categoryFilters");
const emptyState = document.getElementById("emptyState");

let allGames = [];
let activeCategory = "All";

function safeText(value) {
  return String(value ?? "");
}

function renderGames() {
  const term = safeText(searchInput.value).trim().toLowerCase();
  const filtered = allGames.filter((game) => {
    const matchesCategory = activeCategory === "All" ||
      safeText(game.category).toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = safeText(game.title).toLowerCase().includes(term) ||
      safeText(game.category).toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = "";
  emptyState.hidden = filtered.length !== 0;

  for (const game of filtered) {
    const card = document.createElement("article");
    card.className = "game-card";

    const link = document.createElement("a");
    link.href = safeText(game.url);
    link.setAttribute("aria-label", `Play ${safeText(game.title)}`);

    const img = document.createElement("img");
    img.className = "game-thumb";
    img.src = safeText(game.image);
    img.alt = `${safeText(game.title)} thumbnail`;
    img.loading = "lazy";
    img.onerror = () => { img.style.visibility = "hidden"; };

    link.appendChild(img);

    const info = document.createElement("div");
    info.className = "game-info";

    const meta = document.createElement("div");
    meta.className = "game-meta";
    meta.textContent = safeText(game.category);

    const title = document.createElement("h3");
    title.className = "game-title";
    title.textContent = safeText(game.title);

    const bottom = document.createElement("div");
    bottom.className = "game-bottom";

    const description = document.createElement("span");
    description.className = "game-description";
    description.textContent = safeText(game.description || "Ready to play");

    const play = document.createElement("a");
    play.className = "play-link";
    play.href = safeText(game.url);
    play.textContent = "Play →";

    bottom.append(description, play);
    info.append(meta, title, bottom);
    card.append(link, info);
    grid.appendChild(card);
  }
}

async function loadGames() {
  try {
    const response = await fetch("games.json");
    if (!response.ok) throw new Error("Could not load games.json");
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("games.json must contain a JSON array");
    allGames = data;
    renderGames();
  } catch (error) {
    grid.innerHTML = '<div class="loading-state">Could not load games.json. Check that it is in the same folder as index.html and that the JSON is valid.</div>';
  }
}

searchInput.addEventListener("input", renderGames);

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  filters.querySelectorAll(".filter").forEach((item) => {
    item.classList.toggle("active", item === button);
  });
  renderGames();
});

loadGames();
