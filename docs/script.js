const COMMIT_EMOJIS = [
  "sparkles", "bug", "memo", "recycle", "zap", "fire", "rocket",
  "lock", "test_tube", "art", "tada", "white_check_mark", "arrow_up",
  "arrow_down", "wrench", "hammer", "construction", "green_heart",
  "bookmark", "rotating_light", "lipstick", "pencil2", "wastebasket",
  "passport_control", "package", "alien", "truck", "page_facing_up",
  "bulb", "beers", "speech_balloon", "card_file_box", "loud_sound",
  "mute", "busts_in_silhouette", "children_crossing", "building_construction",
  "iphone", "clown_face", "egg", "see_no_evil", "camera_flash", "alembic",
  "mag", "label", "seedling", "triangular_flag_on_post", "goal_net",
  "dizzy", "coffin", "chart_with_upwards_trend"
];

const CATEGORIES = [
  { id: "all",     label: "All" },
  { id: "faces",   label: "😀 Faces",   match: (n) => /smile|grin|laugh|cry|sob|face|wink|blush|angry|weary|sweat|joy|hushed|pensive|frown|scream|kissing|sunglasses|thinking|cowboy|nerd|pleading|yum|neutral|expressionless|smirk|sleepy|unamused|relieved|persevere|grimace|tired|worried|zipper|monocle|partying|drooling|sneezing|lying|shushing|hot_face|cold_face|woozy|exploding|star_struck/.test(n) },
  { id: "dev",     label: "🚀 Dev",     match: (n) => /rocket|bug|zap|gear|wrench|fire|computer|keyboard|terminal|robot|alembic|test_tube|dna|microscope|telescope|satellite|octocat|bulb|battery|electric|screwdriver|toolbox|magnet|petri|abacus/.test(n) },
  { id: "animals", label: "🐾 Animals", match: (n) => /dog|cat|bear|panda|fox|wolf|lion|tiger|horse|cow|pig|sheep|rabbit|monkey|bird|fish|whale|dolphin|snake|frog|turtle|spider|bee|ant|butterfly|penguin|eagle|owl|duck|chicken|hamster|bat|hedgehog|chipmunk|mouse|crocodile|octopus|squid|crab|shrimp|lobster|snail|scorpion|cricket|beetle|mosquito|parrot|peacock|kangaroo|flamingo|sloth|otter|skunk|gorilla|orangutan|animal|paw/.test(n) },
  { id: "food",    label: "🍔 Food",    match: (n) => /pizza|burger|taco|sushi|ramen|cake|cookie|bread|egg|bacon|steak|fish|rice|curry|hotdog|sandwich|waffle|pretzel|apple|banana|cherry|grape|lemon|mango|melon|orange|peach|pear|pineapple|strawberry|watermelon|coconut|beer|wine|coffee|tea|juice|milk|cocktail|champagne|candy|chocolate|ice_cream|lollipop|doughnut|pancakes|popcorn|food|drink|fruit|salad|broccoli|carrot|corn|tomato|mushroom|avocado|eggplant|cucumber|pepper|potato|garlic|onion|honey|cheese|peanut|bento|dumpling|fondue/.test(n) },
  { id: "flags",   label: "🌎 Flags",   match: (n) => /flag/.test(n) },
  { id: "misc",    label: "📦 Misc",    match: () => true },
];

let allEmojis = [];
let activeCategory = "all";
let commitMode = false;

function categorize(name) {
  for (const cat of CATEGORIES) {
    if (cat.id === "all" || cat.id === "misc") continue;
    if (cat.match(name)) return cat.id;
  }
  return "misc";
}

async function init() {
  const response = await fetch("emojis.json");
  const raw = await response.json();
  allEmojis = raw.map(e => ({ ...e, category: categorize(e.name) }));

  document.getElementById("total-counter").textContent =
    `✨ ${allEmojis.length} GitHub emojis available`;

  buildCategoryBar();
  setupModeToggle();

  document.getElementById("search").addEventListener("input", applyFilters);

  // Deep link via URL hash
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

function setupModeToggle() {
  document.getElementById("btn-all-emojis").addEventListener("click", () => {
    commitMode = false;
    document.getElementById("btn-all-emojis").classList.add("active");
    document.getElementById("btn-commit").classList.remove("active");
    applyFilters();
  });
  document.getElementById("btn-commit").addEventListener("click", () => {
    commitMode = true;
    document.getElementById("btn-commit").classList.add("active");
    document.getElementById("btn-all-emojis").classList.remove("active");
    applyFilters();
  });
}

function applyFilters() {
  const query = document.getElementById("search").value.toLowerCase().trim();

  let filtered = commitMode
    ? allEmojis.filter(e => COMMIT_EMOJIS.includes(e.name))
    : allEmojis;

  if (!commitMode && activeCategory !== "all") {
    filtered = filtered.filter(e => e.category === activeCategory);
  }

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

  emojis.forEach(({ name, url }) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${url}" alt="${name}" loading="lazy" />
      <span class="code">:${name}:</span>
    `;
    card.addEventListener("click", () => {
      navigator.clipboard.writeText(`:${name}:`).then(() => {
        card.classList.add("copied");
        setTimeout(() => card.classList.remove("copied"), 400);
        showToast(`:${name}:`);
      });
    });
    grid.appendChild(card);
  });
}

function showToast(code) {
  const toast = document.getElementById("toast");
  toast.textContent = `Copied ${code}`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1000);
}

init();
