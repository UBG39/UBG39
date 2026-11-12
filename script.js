// UBG39 — loads games.json, renders cards, handles search + category filters.
const CATEGORY_COLORS = {
  Arcade: "#f472b6", Action: "#fb923c", Sports: "#34d399", Puzzle: "#38bdf8", Other: "#facc15"
};
const CATEGORY_ORDER = ["Arcade", "Action", "Sports", "Puzzle", "Other"];

let games = [];
let selectedCategory = "All";

const container = document.getElementById("games-container");
const search = document.getElementById("search");
const count = document.getElementById("count");
const empty = document.getElementById("empty");
const filtersEl = document.getElementById("filters");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

function buildFilters() {
  const present = new Set(games.map(g => g.category));
  const cats = [...CATEGORY_ORDER.filter(c => present.has(c)), ...[...present].filter(c => !CATEGORY_ORDER.includes(c))];
  const mk = (cat, label, n) =>
    `<button type="button" class="filter${cat === selectedCategory ? " active" : ""}" data-category="${escapeHtml(cat)}" style="--c:${CATEGORY_COLORS[cat] || "#c084fc"}">${escapeHtml(label)} <small>${n}</small></button>`;
  filtersEl.innerHTML = mk("All", "ALL GAMES", games.length) +
    cats.map(c => mk(c, c.toUpperCase(), games.filter(g => g.category === c).length)).join("");
}

function renderGames() {
  const term = search.value.trim().toLowerCase();
  const visible = games.filter(g =>
    (selectedCategory === "All" || g.category === selectedCategory) &&
    `${g.title} ${g.category} ${g.description}`.toLowerCase().includes(term));

  container.innerHTML = visible.map(g => {
    const color = CATEGORY_COLORS[g.category] || "#c084fc";
    const thumb = g.image
      ? `<img src="${escapeHtml(g.image)}" alt="${escapeHtml(g.title)} thumbnail" loading="lazy">`
      : `<span class="thumb-fallback">U39</span>`;
    return `<a class="game-card" style="--c:${color}" href="${escapeHtml(g.url)}" aria-label="Play ${escapeHtml(g.title)}">
      <div class="thumb">${thumb}<span class="slot-badge">CABINET ${String(g.id).padStart(2, "0")}</span></div>
      <div class="card-info"><div class="game-title">${escapeHtml(g.title)}</div>
      <div class="game-desc">${escapeHtml(g.description)}</div>
      <div class="card-bottom"><span class="category">${escapeHtml(g.category)}</span><span class="play">PLAY ↗</span></div></div>
    </a>`;
  }).join("");

  // broken thumbnails fall back to the U39 mark
  container.querySelectorAll(".thumb img").forEach(img =>
    img.addEventListener("error", () => {
      img.insertAdjacentHTML("afterend", '<span class="thumb-fallback">U39</span>');
      img.remove();
    }, { once: true }));

  count.textContent = `${visible.length} / ${games.length} SHOWN`;
  empty.classList.toggle("hidden", visible.length !== 0);
}

function setTotals() {
  document.getElementById("slot-total").textContent = games.length;
  document.getElementById("footer-count").textContent = `${games.length} CABINETS · 1 ARCADE`;
}

search.addEventListener("input", renderGames);
filtersEl.addEventListener("click", e => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  selectedCategory = btn.dataset.category;
  filtersEl.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === btn));
  renderGames();
});

fetch("games.json")
  .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(data => { games = data; setTotals(); buildFilters(); renderGames(); })
  .catch(() => {
    count.textContent = "ERROR";
    empty.textContent = "Couldn't load games.json. Open this site through a web server (e.g. GitHub Pages or `python3 -m http.server`) rather than double-clicking index.html.";
    empty.classList.remove("hidden");
  });
