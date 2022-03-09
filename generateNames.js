const { sample } = require("lodash");
const fs = require("fs/promises");

const maleNames = require("./names-male.json");
const femaleNames = require("./names-female.json");

const maleFirstLast = new Set();
const femaleFirstLast = new Set();

function getUniqueMaleFirstLast() {
  const first = sample(maleNames);
  const last = sample(maleNames);
  if (first === last) return getUniqueMaleFirstLast();
  const newName = `${first} ${last}`;
  if (maleFirstLast.has(newName)) return getUniqueMaleFirstLast();
  return newName;
}

function getUniqueFemaleFirstLast() {
  const first = sample(femaleNames);
  const last = sample(maleNames);
  if (first === last) return getUniqueMaleFirstLast();
  const newName = `${first} ${last}`;
  if (femaleFirstLast.has(newName)) return getUniqueMaleFirstLast();
  return newName;
}

async function main() {
  const count = 10001;
  while (maleFirstLast.size < count) {
    const newMaleName = getUniqueMaleFirstLast();
    const newFemaleName = getUniqueFemaleFirstLast();
    maleFirstLast.add(newMaleName);
    femaleFirstLast.add(newFemaleName);
  }

  await fs.writeFile(
    "first-last-male.json",
    JSON.stringify([...maleFirstLast], null, 2)
  );
  await fs.writeFile(
    "first-last-female.json",
    JSON.stringify([...femaleFirstLast], null, 2)
  );
}

main().then(console.log).catch(console.error);
