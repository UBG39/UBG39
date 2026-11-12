const TOTAL_SLOTS = 35;
const games = Array.from({length: TOTAL_SLOTS}, (_, i) => ({
  title: `Game Slot ${String(i + 1).padStart(2, "0")}`,
  category: "Other",
  image: "",
  url: `games/game-${String(i + 1).padStart(2, "0")}/index.html`,
  description: "Your game goes here. Replace this slot in games.json."
}));

let selectedCategory = "All";
const container = document.getElementById("games-container");
const search = document.getElementById("search");
const count = document.getElementById("count");
const empty = document.getElementById("empty");

function renderGames() {
  const term = search.value.trim().toLowerCase();
  const visible = games.filter(game =>
    (selectedCategory === "All" || game.category === selectedCategory) &&
    `${game.title} ${game.category} ${game.description}`.toLowerCase().includes(term)
  );
  container.innerHTML = visible.map(game => {
    const slot = games.indexOf(game) + 1;
    const thumb = game.image
      ? `<img src="${escapeHtml(game.image)}" alt="${escapeHtml(game.title)} thumbnail" onerror="this.remove();this.parentElement.insertAdjacentHTML('beforeend','<span class=&quot;thumb-fallback&quot;>U39</span>')">`
      : `<span class="thumb-fallback">U39</span>`;
    return `<a class="game-card" href="${escapeHtml(game.url)}" aria-label="Play ${escapeHtml(game.title)}">
      <div class="thumb">${thumb}<span class="slot-badge">CABINET ${String(slot).padStart(2,"0")}</span></div>
      <div class="card-info"><div class="game-title">${escapeHtml(game.title)}</div>
      <div class="game-desc">${escapeHtml(game.description)}</div>
      <div class="card-bottom"><span class="category">${escapeHtml(game.category)}</span><span class="play">PLAY ↗</span></div></div>
    </a>`;
  }).join("");
  count.textContent = `${visible.length} / ${TOTAL_SLOTS} SHOWN`;
  empty.classList.toggle("hidden", visible.length !== 0);
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[char]));
}
search.addEventListener("input", renderGames);
document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelector(".filter.active")?.classList.remove("active");
  button.classList.add("active");
  selectedCategory = button.dataset.category;
  renderGames();
}));
renderGames();
