const fs = require("fs");

function categorize(name) {
  if (name.includes("face") || name.includes("smile") || name.includes("laugh") || name.includes("grin") || name.includes("wink") || name.includes("blush") || name.includes("cry") || name.includes("sob") || name.includes("angry") || name.includes("mood") || name.includes("expressionless") || name.includes("frown") || name.includes("grimace") || name.includes("hushed") || name.includes("neutral") || name.includes("pensive") || name.includes("persevere") || name.includes("relieved") || name.includes("scream") || name.includes("sleepy") || name.includes("smirk") || name.includes("sweat") || name.includes("tired") || name.includes("unamused") || name.includes("weary") || name.includes("worried") || name.includes("yum") || name.includes("kissing") || name.includes("sunglasses") || name.includes("thinking") || name.includes("zipper") || name.includes("monocle") || name.includes("partying") || name.includes("pleading") || name.includes("hot_face") || name.includes("cold_face") || name.includes("woozy") || name.includes("dizzy_face") || name.includes("exploding") || name.includes("cowboy") || name.includes("lying") || name.includes("shushing") || name.includes("star_struck") || name.includes("drooling") || name.includes("sneezing") || name.includes("nerd")) return "😀 Faces & Emotions";
  if (name.includes("flag") || name.includes("_flag") || name.includes("crossed_flags")) return "🌎 Flags";
  if (name.includes("pizza") || name.includes("burger") || name.includes("taco") || name.includes("sushi") || name.includes("ramen") || name.includes("cake") || name.includes("cookie") || name.includes("bread") || name.includes("egg") || name.includes("bacon") || name.includes("steak") || name.includes("poultry") || name.includes("meat") || name.includes("fish") || name.includes("shrimp") || name.includes("crab") || name.includes("lobster") || name.includes("oyster") || name.includes("rice") || name.includes("curry") || name.includes("spaghetti") || name.includes("hotdog") || name.includes("sandwich") || name.includes("falafel") || name.includes("waffle") || name.includes("pretzel") || name.includes("bagel") || name.includes("salt") || name.includes("honey") || name.includes("cheese") || name.includes("salad") || name.includes("broccoli") || name.includes("carrot") || name.includes("corn") || name.includes("onion") || name.includes("garlic") || name.includes("potato") || name.includes("tomato") || name.includes("mushroom") || name.includes("avocado") || name.includes("eggplant") || name.includes("cucumber") || name.includes("leafy") || name.includes("pepper") || name.includes("olive") || name.includes("peanut") || name.includes("chestnut") || name.includes("apple") || name.includes("banana") || name.includes("cherry") || name.includes("grape") || name.includes("kiwi") || name.includes("lemon") || name.includes("mango") || name.includes("melon") || name.includes("orange") || name.includes("peach") || name.includes("pear") || name.includes("pineapple") || name.includes("strawberry") || name.includes("watermelon") || name.includes("blueberries") || name.includes("coconut") || name.includes("fig") || name.includes("fruit") || name.includes("food") || name.includes("drink") || name.includes("beer") || name.includes("wine") || name.includes("coffee") || name.includes("tea") || name.includes("juice") || name.includes("milk") || name.includes("cocktail") || name.includes("champagne") || name.includes("whisky") || name.includes("sake") || name.includes("beverage") || name.includes("candy") || name.includes("chocolate") || name.includes("ice_cream") || name.includes("lollipop") || name.includes("custard") || name.includes("shortcake") || name.includes("doughnut") || name.includes("pancakes") || name.includes("popcorn") || name.includes("bento") || name.includes("fried") || name.includes("dumpling") || name.includes("fondue") || name.includes("moon_cake") || name.includes("tamale") || name.includes("flatbread")) return "🍔 Food & Drink";
  if (name.includes("dog") || name.includes("cat") || name.includes("bear") || name.includes("panda") || name.includes("fox") || name.includes("wolf") || name.includes("lion") || name.includes("tiger") || name.includes("horse") || name.includes("cow") || name.includes("pig") || name.includes("sheep") || name.includes("goat") || name.includes("camel") || name.includes("elephant") || name.includes("rhino") || name.includes("hippo") || name.includes("mouse") || name.includes("rabbit") || name.includes("hamster") || name.includes("chipmunk") || name.includes("hedgehog") || name.includes("bat") || name.includes("bird") || name.includes("chicken") || name.includes("penguin") || name.includes("duck") || name.includes("eagle") || name.includes("owl") || name.includes("peacock") || name.includes("parrot") || name.includes("frog") || name.includes("crocodile") || name.includes("turtle") || name.includes("lizard") || name.includes("snake") || name.includes("dragon") || name.includes("whale") || name.includes("dolphin") || name.includes("seal") || name.includes("fish") || name.includes("octopus") || name.includes("squid") || name.includes("snail") || name.includes("butterfly") || name.includes("bee") || name.includes("beetle") || name.includes("ant") || name.includes("mosquito") || name.includes("cricket") || name.includes("spider") || name.includes("scorpion") || name.includes("crab") || name.includes("shrimp") || name.includes("lobster") || name.includes("animal") || name.includes("paw") || name.includes("feather") || name.includes("sloth") || name.includes("otter") || name.includes("skunk") || name.includes("kangaroo") || name.includes("flamingo") || name.includes("mammoth") || name.includes("bison") || name.includes("dodo") || name.includes("gorilla") || name.includes("orangutan") || name.includes("monkey") || name.includes("baboon")) return "🐾 Animals & Nature";
  if (name.includes("soccer") || name.includes("basketball") || name.includes("football") || name.includes("baseball") || name.includes("tennis") || name.includes("volleyball") || name.includes("rugby") || name.includes("golf") || name.includes("sport") || name.includes("ball") || name.includes("trophy") || name.includes("medal") || name.includes("olympic") || name.includes("running") || name.includes("swimmer") || name.includes("surfer") || name.includes("cyclist") || name.includes("skiing") || name.includes("snowboard") || name.includes("climber") || name.includes("wrestler") || name.includes("boxing") || name.includes("martial") || name.includes("yoga") || name.includes("weight") || name.includes("bow_and") || name.includes("fishing") || name.includes("dart") || name.includes("billiard") || name.includes("ping_pong") || name.includes("badminton") || name.includes("goal") || name.includes("lacrosse") || name.includes("softball") || name.includes("flying_disc") || name.includes("game") || name.includes("joystick") || name.includes("chess") || name.includes("dice") || name.includes("puzzle") || name.includes("slot") || name.includes("ticket") || name.includes("circus") || name.includes("art") || name.includes("performing") || name.includes("palette")) return "⚽ Activities & Sports";
  if (name.includes("bug") || name.includes("gear") || name.includes("rocket") || name.includes("zap") || name.includes("computer") || name.includes("keyboard") || name.includes("mouse") || name.includes("printer") || name.includes("phone") || name.includes("iphone") || name.includes("email") || name.includes("mailbox") || name.includes("inbox") || name.includes("outbox") || name.includes("floppy") || name.includes("cd") || name.includes("dvd") || name.includes("battery") || name.includes("electric") || name.includes("bulb") || name.includes("flashlight") || name.includes("wrench") || name.includes("hammer") || name.includes("screwdriver") || name.includes("nut_and") || name.includes("toolbox") || name.includes("magnet") || name.includes("satellite") || name.includes("telescope") || name.includes("microscope") || name.includes("robot") || name.includes("alembic") || name.includes("test_tube") || name.includes("petri") || name.includes("dna") || name.includes("abacus") || name.includes("coding") || name.includes("terminal") || name.includes("octocat")) return "🚀 Tech & Dev";
  if (name.includes("house") || name.includes("home") || name.includes("office") || name.includes("building") || name.includes("hotel") || name.includes("bank") || name.includes("hospital") || name.includes("school") || name.includes("church") || name.includes("mosque") || name.includes("temple") || name.includes("kaaba") || name.includes("statue") || name.includes("stadium") || name.includes("fountain") || name.includes("tent") || name.includes("european") || name.includes("japanese") || name.includes("derelict") || name.includes("classical") || name.includes("post_office") || name.includes("department") || name.includes("love_hotel") || name.includes("convenience")) return "🏠 Places & Buildings";
  if (name.includes("car") || name.includes("bus") || name.includes("train") || name.includes("plane") || name.includes("ship") || name.includes("boat") || name.includes("bike") || name.includes("truck") || name.includes("taxi") || name.includes("ambulance") || name.includes("fire_engine") || name.includes("police") || name.includes("tractor") || name.includes("metro") || name.includes("monorail") || name.includes("mountain_railway") || name.includes("steam") || name.includes("bullettrain") || name.includes("railway") || name.includes("station") || name.includes("helicopter") || name.includes("small_airplane") || name.includes("seat") || name.includes("anchor") || name.includes("canoe") || name.includes("motor_boat") || name.includes("sailboat") || name.includes("ferry") || name.includes("speedboat") || name.includes("suspension") || name.includes("motorway") || name.includes("fuelpump") || name.includes("scooter") || name.includes("kick_scooter") || name.includes("skateboard") || name.includes("auto_rickshaw") || name.includes("parachute") || name.includes("pickup_truck") || name.includes("minibus")) return "🚗 Travel & Transport";
  if (name.includes("heart") || name.includes("love") || name.includes("kiss") || name.includes("wedding") || name.includes("couple") || name.includes("family") || name.includes("baby") || name.includes("child") || name.includes("boy") || name.includes("girl") || name.includes("man") || name.includes("woman") || name.includes("person") || name.includes("people") || name.includes("adults") || name.includes("elderly") || name.includes("holding_hands")) return "❤️ People & Love";
  if (name.includes("sun") || name.includes("moon") || name.includes("star") || name.includes("cloud") || name.includes("rain") || name.includes("snow") || name.includes("wind") || name.includes("fog") || name.includes("tornado") || name.includes("rainbow") || name.includes("umbrella") || name.includes("lightning") || name.includes("thunder") || name.includes("snowflake") || name.includes("snowman") || name.includes("comet") || name.includes("fire") || name.includes("droplet") || name.includes("ocean") || name.includes("wave") || name.includes("water") || name.includes("earth") || name.includes("world") || name.includes("globe") || name.includes("volcano") || name.includes("desert") || name.includes("island") || name.includes("mountain") || name.includes("camping") || name.includes("sunrise") || name.includes("sunset") || name.includes("cityscape") || name.includes("night") || name.includes("milky_way") || name.includes("partly_sunny") || name.includes("thermometer") || name.includes("cyclone") || name.includes("closed_umbrella") || name.includes("parasol")) return "🌤 Weather & Nature";
  if (name.includes("book") || name.includes("pencil") || name.includes("pen") || name.includes("memo") || name.includes("paperclip") || name.includes("scissors") || name.includes("ruler") || name.includes("pushpin") || name.includes("clipboard") || name.includes("file") || name.includes("folder") || name.includes("calendar") || name.includes("notebook") || name.includes("ledger") || name.includes("card") || name.includes("chart") || name.includes("bar_chart") || name.includes("scroll") || name.includes("page") || name.includes("newspaper") || name.includes("bookmark") || name.includes("label") || name.includes("briefcase") || name.includes("wastebasket") || name.includes("inbox_tray") || name.includes("outbox_tray") || name.includes("package") || name.includes("envelope") || name.includes("stamp") || name.includes("receipt") || name.includes("office")) return "📋 Office & Stationery";
  return "📦 Misc";
}

async function generate() {
  const response = await fetch("https://api.github.com/emojis");
  const emojis = await response.json();

  const names = Object.keys(emojis).sort();

  // Group by category
  const grouped = {};
  names.forEach(name => {
    const cat = categorize(name);
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push({ name, url: emojis[name] });
  });

  // Sort category names (keep Misc last)
  const sortedCats = Object.keys(grouped).sort((a, b) => {
    if (a === "📦 Misc") return 1;
    if (b === "📦 Misc") return -1;
    return a.localeCompare(b);
  });

  // Build markdown
  let md = "# GitHub Emoji Cheat Sheet\n\n";
  md += "Automatically generated from the GitHub Emoji API.\n\n";
  md += `Total emojis: **${names.length}**\n\n`;
  md += "Organized by category for easier browsing.\n\n";

  // Table of contents
  md += "## Categories\n\n";
  sortedCats.forEach(cat => {
    const anchor = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    md += `- [${cat}](#${anchor}) (${grouped[cat].length})\n`;
  });
  md += "\n";

  // Sections
  sortedCats.forEach(cat => {
    md += `## ${cat}\n\n`;
    md += "| Emoji | Code | Emoji | Code | Emoji | Code |\n";
    md += "|:--:|:--|:--:|:--|:--:|:--|\n";

    const items = grouped[cat];
    for (let i = 0; i < items.length; i += 3) {
      const cols = [items[i], items[i + 1], items[i + 2]];
      const row = cols
        .map(e => e
          ? `<img src="${e.url}" width="20"> | \`:${e.name}:\``
          : " | "
        )
        .join(" | ");
      md += `| ${row} |\n`;
    }
    md += "\n";
  });

  fs.writeFileSync("emojis.md", md);

  // Generate docs/emojis.json (unchanged structure for web explorer)
  const json = names.map(name => ({ name, url: emojis[name] }));
  fs.mkdirSync("docs", { recursive: true });
  fs.writeFileSync("docs/emojis.json", JSON.stringify(json, null, 2));

  console.log(`Generated ${names.length} emojis in ${sortedCats.length} categories.`);
}

generate();
