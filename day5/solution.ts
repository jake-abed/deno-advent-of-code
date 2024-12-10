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

// A little uggos, but split on newline, take out the final line
// with an artifact, split each line on commas, then convert
// to numbers.
const updates = secondHalf
  .split("\n")
  .slice(0, -1)
  .map((line) => line.split(",").map((num) => Number(num)));

console.log(updates);

const t1 = performance.now();
console.log(`Parsing complete! Took: ${(t1 - t0) * 1000} microseconds.`);

const t2 = performance.now();
const p1 = partOne();
const t3 = performance.now();

console.log(`Part one complete! Took: ${(t3 - t2) * 1000} microseconds.`);
console.log(`Part one solution: ${p1}`);

const t4 = performance.now();
const p2 = partTwo();
const t5 = performance.now();

console.log(`Part two complete! Took: ${(t5 - t4) * 1000} microseconds.`);
console.log(`Part one solution: ${p2}`);

function partOne(): number {
  let sum = 0;

  for (const update of updates) {
    if (isOrdered(update)) {
      sum += update[Math.floor(update.length / 2)];
    }
  }

  return sum;
}

function partTwo(): number {
  let sum = 0;

  for (const update of updates) {
    if (!isOrdered(update)) {
      const sorted = pageSort(update); 
      sum += sorted[Math.floor(sorted.length / 2)];
    }
  }

  return sum;
}

function isOrdered(update: Array<number>): boolean {
  let ordered = true;
  const pagesChecked: Array<number> = [];
  for (let i = 0; i < update.length; i++) {
    const pageToCheck = update[i];
    const mustBeBefore = rulesLookup[pageToCheck];
    if (mustBeBefore) {
      for (let j = 0; j < mustBeBefore.length; j++) {
        if (pagesChecked.includes(mustBeBefore[j])) {
          ordered = false;
          return ordered;
        }
      }
    }
    pagesChecked.push(pageToCheck);
  }

  return ordered;
}

function pageSort(update: Array<number>): Array<number> {
  let copy = [...update];
  let pos = 0;
  let pagesChecked: Array<number> = [];
  while (pos < copy.length) {
    let reset = false;
    const page = copy[pos];
    pagesChecked.push(page);
    const mustBeBefore = rulesLookup[page];
    if (mustBeBefore) {
      for (let i = 0; i < mustBeBefore.length; i++) {
        if (pagesChecked.includes(mustBeBefore[i])) {
          copy.splice(pos, 1);
          const insertPos = copy.indexOf(mustBeBefore[i])
          const left = copy.slice(0, insertPos);
          const center = [page];
          const right = copy.slice(insertPos);
          copy = left.concat(center, right);
          pos = 0;
          pagesChecked = [];
          reset = true;
          break;
        }
      }
    }
    if (reset === true) {
      continue;
    } else {
      pos++;
    }
  }
  return copy;
}
