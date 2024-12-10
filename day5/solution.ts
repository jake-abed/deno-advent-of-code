const data = await Deno.readTextFile("./day5/input.txt");

console.log("Begin parsing data!");
const t0 = performance.now();

const [firstHalf, secondHalf] = data.split("\n\n");

const ruleLines = firstHalf.split("\n");
const rules = ruleLines.map((line) => line.split("|"));
const rulesLookup: Record<number, Array<number>> = {};

for (const rule of rules) {
  const left = Number(rule[0]);
  const right = Number(rule[1]);
  if (rulesLookup[left]) {
    rulesLookup[left] = rulesLookup[left].concat([right]);
  } else {
    rulesLookup[left] = [right];
  }
}

const updates = secondHalf
  .split("\n")
  .slice(0,-1)
  .map(line => line.split(","))

console.log(updates);

const t1 = performance.now();
console.log(`Parsing complete! Took: ${(t1 - t0) * 1000} microseconds.`);

