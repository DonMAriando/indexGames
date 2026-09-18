const STATUS_LABEL = {
  jugable: "Jugable",
  demo: "Demo",
  prototipo: "Prototipo",
};

const state = {
  catalog: null,
  tag: "todos",
  query: "",
};

const els = {
  filters: document.getElementById("filters"),
  search: document.getElementById("search"),
  featured: document.getElementById("featured"),
  grid: document.getElementById("grid"),
  empty: document.getElementById("empty"),
  heroCount: document.getElementById("heroCount"),
};

init();

function init() {
  state.catalog = window.CATALOG;
  if (!state.catalog || !Array.isArray(state.catalog.games)) {
    els.heroCount.textContent = "No se pudieron cargar los juegos.";
    return;
  }

  const games = state.catalog.games;
  els.heroCount.textContent = `${games.length} ${games.length === 1 ? "juego" : "juegos"}`;
  renderFilters(games);
  render();

  els.search.addEventListener("input", () => {
    state.query = els.search.value.trim().toLowerCase();
    render();
  });
}

function renderFilters(games) {
  const tags = ["todos", ...new Set(games.flatMap((game) => game.tags || []))];
  els.filters.replaceChildren(
    ...tags.map((tag) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter";
      btn.textContent = labelTag(tag);
      btn.setAttribute("aria-pressed", tag === state.tag ? "true" : "false");
      btn.addEventListener("click", () => {
        state.tag = tag;
        for (const other of els.filters.querySelectorAll(".filter")) {
          other.setAttribute("aria-pressed", other === btn ? "true" : "false");
        }
        render();
      });
      return btn;
    }),
  );
}

function render() {
  const games = visibleGames();
  const featured = games.find((game) => game.featured);
  const rest = games.filter((game) => game !== featured);

  els.featured.hidden = !featured;
  els.featured.replaceChildren();
  if (featured) els.featured.append(cardEl(featured, true));

  els.grid.replaceChildren(...rest.map((game) => cardEl(game, false)));
  els.empty.hidden = games.length > 0;
}

function visibleGames() {
  const q = state.query;
  return (state.catalog.games || []).filter((game) => {
    const tagOk = state.tag === "todos" || (game.tags || []).includes(state.tag);
    if (!tagOk) return false;
    if (!q) return true;
    const haystack = [game.title, game.subtitle, game.blurb, ...(game.tags || [])]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

function cardEl(game, wide) {
  const article = document.createElement("article");
  article.className = wide ? "card wide" : "card";
  article.style.setProperty("--accent", game.accent || "#c6a45b");

  const cover = document.createElement("div");
  cover.className = "cover";
  const img = document.createElement("img");
  img.src = game.cover;
  img.alt = `Tapa de ${game.title}`;
  cover.append(img);

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = STATUS_LABEL[game.status] || game.status || "Juego";
  cover.append(badge);

  const body = document.createElement("div");
  body.className = "body";

  const kicker = document.createElement("p");
  kicker.className = "kicker";
  kicker.textContent = [game.year, game.subtitle].filter(Boolean).join(" · ");

  const title = document.createElement("h3");
  title.textContent = game.title;

  const blurb = document.createElement("p");
  blurb.className = "blurb";
  blurb.textContent = game.blurb;

  const tags = document.createElement("ul");
  tags.className = "tags";
  for (const tag of game.tags || []) {
    const li = document.createElement("li");
    li.textContent = tag;
    tags.append(li);
  }

  const actions = document.createElement("div");
  actions.className = "actions";
  if (game.play) {
    actions.append(linkEl("Jugar", game.play, "btn play"));
  }
  if (game.repo) {
    actions.append(linkEl("Código", game.repo, "btn repo"));
  }

  body.append(kicker, title, blurb, tags, actions);
  article.append(cover, body);
  return article;
}

function linkEl(label, href, className) {
  const a = document.createElement("a");
  a.className = className;
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.textContent = label;
  return a;
}

function labelTag(tag) {
  if (tag === "todos") return "Todos";
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}
