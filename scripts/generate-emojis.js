const fs = require("fs");

async function generate() {
  const response = await fetch("https://api.github.com/emojis");
  const emojis = await response.json();

  const names = Object.keys(emojis).sort();

  // Generate emojis.md
  let md = "# GitHub Emoji Cheat Sheet\n\n";
  md += "Automatically generated from the GitHub Emoji API.\n\n";
  md += "| Emoji | Code |\n";
  md += "|------|------|\n";
  names.forEach(name => {
    const url = emojis[name];
    md += `| ![](${url}) | \`:${name}:\` |\n`;
  });
  fs.writeFileSync("emojis.md", md);

  // Generate docs/emojis.json
  const json = names.map(name => ({ name, url: emojis[name] }));
  fs.mkdirSync("docs", { recursive: true });
  fs.writeFileSync("docs/emojis.json", JSON.stringify(json, null, 2));

  console.log(`Generated ${names.length} emojis.`);
}

generate();
