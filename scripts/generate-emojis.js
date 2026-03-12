const fs = require("fs");

async function generate() {
  const response = await fetch("https://api.github.com/emojis");
  const emojis = await response.json();

  let md = "# GitHub Emoji Cheat Sheet\n\n";
  md += "Automatically generated from the GitHub Emoji API.\n\n";
  md += "| Emoji | Code |\n";
  md += "|------|------|\n";

  const names = Object.keys(emojis).sort();

  names.forEach(name => {
    const url = emojis[name];
    md += `| ![](${url}) | \`:${name}:\` |\n`;
  });

  fs.writeFileSync("emojis.md", md);
  console.log("Emoji file generated.");
}

generate();
