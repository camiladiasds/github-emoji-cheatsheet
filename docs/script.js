const CATEGORIES = [
  { id: "all",     label: "All" },
  { id: "faces",   label: "😀 Faces",   match: (n) => /smile|grin|laugh|cry|sob|face|wink|blush|angry|weary|sweat|joy|hushed|pensive|frown|scream|kissing|sunglasses|thinking|cowboy|nerd|pleading|yum|neutral|expressionless|smirk|sleepy|unamused|relieved|persevere|grimace|tired|worried|zipper|monocle|partying|drooling|sneezing|lying|shushing|hot_face|cold_face|woozy|exploding|star_struck/.test(n) },
  { id: "dev",     label: "🚀 Dev",     match: (n) => /rocket|bug|zap|gear|wrench|fire|lock|sparkles|recycle|memo|test_tube|art|computer|keyboard|terminal|robot|alembic|dna|microscope|telescope|satellite|octocat|bulb|battery|electric|screwdriver|toolbox|magnet|petri|abacus/.test(n) },
  { id: "animals", label: "🐾 Animals", match: (n) => /dog|cat|bear|panda|fox|wolf|lion|tiger|horse|cow|pig|sheep|rabbit|monkey|bird|fish|whale|dolphin|snake|frog|turtle|spider|bee|ant|butterfly|penguin|eagle|owl|duck|chicken|hamster|bat|hedgehog|chipmunk|mouse|crocodile|octopus|squid|crab|shrimp|lobster|snail|scorpion|cricket|beetle|mosquito|parrot|peacock|kangaroo|flamingo|sloth|otter|skunk|gorilla|orangutan|animal|paw/.test(n) },
  { id: "food",    label: "🍔 Food",    match: (n) => /pizza|burger|taco|sushi|ramen|cake|cookie|bread|egg|bacon|steak|fish|rice|curry|hotdog|sandwich|waffle|pretzel|apple|banana|cherry|grape|lemon|mango|melon|orange|peach|pear|pineapple|strawberry|watermelon|coconut|beer|wine|coffee|tea|juice|milk|cocktail|champagne|candy|chocolate|ice_cream|lollipop|doughnut|pancakes|popcorn|food|drink|fruit|salad|broccoli|carrot|corn|tomato|mushroom|avocado|eggplant|cucumber|pepper|potato|garlic|onion|honey|cheese|peanut|bento|dumpling|fondue/.test(n) },
  { id: "flags",   label: "🌍 Flags",   match: (n) => /flag/.test(n) },
  { id: "misc",    label: "📦 Misc",    match: () => true },
];

let allEmojis = [];
let activeCategory = "all";

function categorize(name) {
  for (const cat of CATEGORIES) {
    if (cat.id === "all" || cat.id === "misc") continue;
    if (cat.match(name)) return cat.id;
  }
  return "misc";
}

// Extract real emoji character from GitHub CDN URL
// e.g. .../unicode/1f680.png → 🚀
// e.g. .../unicode/1f1e8-1f1f3.png → 🇨🇳 (multi-codepoint)
function getEmojiChar(url) {
  const match = url.match(/unicode\/([0-9a-f-]+)\.png/i);
  if (!match) return null;
  try {
    const codepoints = match[1].split("-").map(cp => parseInt(cp, 16));
    return String.fromCodePoint(...codepoints);
  } catch {
    return null;
  }
}

async function init() {
  const response = await fetch("emojis.json");
  const raw = await response.json();
  allEmojis = raw.map(e => ({
    ...e,
    category: categorize(e.name),
    char: getEmojiChar(e.url),
  }));

  document.getElementById("total-counter").textContent =
    `✨ ${allEmojis.length} GitHub emojis available`;

  buildCategoryBar();

  document.getElementById("search").addEventListener("input", applyFilters);

  const hash = window.location.hash.replace("#", "").toLowerCase();
  if (hash && CATEGORIES.find(c => c.id === hash)) {
    setCategory(hash);
  } else {
    applyFilters();
  }
}

function buildCategoryBar() {
  const bar = document.getElementById("category-bar");
  bar.innerHTML = "";
  CATEGORIES.forEach(({ id, label }) => {
    const btn = document.createElement("button");
    btn.className = "cat-btn" + (id === activeCategory ? " active" : "");
    btn.textContent = label;
    btn.dataset.cat = id;
    btn.addEventListener("click", () => setCategory(id));
    bar.appendChild(btn);
  });
}

function setCategory(id) {
  activeCategory = id;
  window.location.hash = id === "all" ? "" : id;
  document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === id);
  });
  applyFilters();
}

function applyFilters() {
  const query = document.getElementById("search").value.toLowerCase().trim();

  let filtered = activeCategory === "all"
    ? allEmojis
    : allEmojis.filter(e => e.category === activeCategory);

  if (query) {
    filtered = filtered.filter(e => e.name.includes(query));
  }

  render(filtered);
}

function render(emojis) {
  const grid = document.getElementById("grid");
  const count = document.getElementById("count");

  count.textContent = `Showing ${emojis.length} emoji${emojis.length !== 1 ? "s" : ""}`;
  grid.innerHTML = "";

  emojis.forEach(({ name, url, char }) => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = url;
    img.alt = name;
    img.loading = "lazy";
    img.title = char ? `Copy ${char}` : `Copy :${name}:`;

    const code = document.createElement("span");
    code.className = "code";
    code.textContent = `:${name}:`;
    code.title = `Copy :${name}:`;

    // Click emoji image → copy real emoji char (fallback to shortcode)
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      const toCopy = char || `:${name}:`;
      navigator.clipboard.writeText(toCopy).then(() => {
        flashCard(card);
        showToast(`Copied ${toCopy}`);
      });
    });

    // Click shortcode → copy GitHub markdown shortcode
    code.addEventListener("click", (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(`:${name}:`).then(() => {
        flashCard(card);
        showToast(`Copied :${name}:`);
      });
    });

    const hint = document.createElement("span");
    hint.className = "copy-hint";
    hint.textContent = "click to copy";

    card.appendChild(img);
    card.appendChild(code);
    card.appendChild(hint);
    grid.appendChild(card);
  });
}

function flashCard(card) {
  card.classList.add("copied");
  setTimeout(() => card.classList.remove("copied"), 400);
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1000);
}

init();
