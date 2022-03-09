const { difference } = require("lodash");
const fs = require("fs/promises");

const bears = require("./mints-solbears.json");
const bearsReduced = require("./mints-solbears-reduced.json");

async function main() {
  const diff = difference(bears, bearsReduced);

  await fs.writeFile("./diff.json", JSON.stringify(diff, null, 2));
}

main().then(console.log).catch(console.error);
