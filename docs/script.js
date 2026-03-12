let allEmojis = [];

async function init() {
  const response = await fetch("emojis.json");
  allEmojis = await response.json();
  render(allEmojis);

  document.getElementById("search").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = query
      ? allEmojis.filter(({ name }) => name.includes(query))
      : allEmojis;
    render(filtered);
  });
}

function render(emojis) {
  const grid = document.getElementById("grid");
  const count = document.getElementById("count");

  count.textContent = `${emojis.length} emoji${emojis.length !== 1 ? "s" : ""}`;

  grid.innerHTML = emojis
    .map(
      ({ name, url }) => `
      <div class="card" onclick="copy('${name}')">
        <img src="${url}" alt="${name}" loading="lazy" />
        <span class="code">:${name}:</span>
      </div>`
    )
    .join("");
}

function copy(name) {
  navigator.clipboard.writeText(`:${name}:`).then(() => showToast());
}

function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

init();
