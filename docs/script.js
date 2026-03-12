let allEmojis = [];

async function init() {
  const response = await fetch("emojis.json");
  allEmojis = await response.json();

  // Total counter
  const totalCounter = document.getElementById("total-counter");
  totalCounter.textContent = `✨ ${allEmojis.length} GitHub emojis available`;

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
  setTimeout(() => toast.classList.remove("show"), 1800);
}

init();
