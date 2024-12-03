const data = await Deno.readTextFile('./day2/input.txt');

console.log("Starting data parsing: ");
const t0 = performance.now();

const rawLines = data.split("\n");
const lines = rawLines.map((line) => {
  const rawLine = line.split(" ");
  const parsedLine: Array<number> = [];
  for (const num of rawLine) {
    parsedLine.push(Number(num));
  }
  return parsedLine;
});

const t1 = performance.now();

console.log(`Parsing data took ${(t1 - t0) * 1000} microseconds!`);

console.log("Starting part 1 solution!");

const t2 = performance.now();

let count = 0;

for (const line of lines) {
  if (isLineSafe(line)) {
    count += 1;
  }
}

const t3 = performance.now();
console.log("Part 1 Count: ", count);
console.log(`Part 1 took ${(t3 - t2) * 1000} microseconds!`);

const t4 = performance.now();

let countTwo = 0;

for (const line of lines) {
  if (isLineSafe(line)) {
    countTwo++;
  } else {
    for (let i = 0; i < line.length; i++) {
      const altLine = [...line.slice(0, i), ...line.slice(i + 1)];
      if (isLineSafe(altLine)) {
        countTwo++;
        break;
      }
    }
  }
}

const t5 = performance.now();

console.log("Part two answer: ", countTwo);
console.log(`Part 2 took ${(t5 - t4) * 1000} microseconds!`);

function isLineSafe(line: Array<number>) {
  const sorted = (
    JSON.stringify(line) === JSON.stringify(line.toSorted((a, b) => a - b))
  ) || 
  (JSON.stringify(line) == JSON.stringify(line.toSorted((a, b) => b - a)))
  if (!sorted) {
    return sorted;
  }
  let safe = false;
  for (let i = 0; i < line.length - 1; i++) {
    const diff = Math.abs(line[i + 1] - line[i]);
    if (diff < 1 || diff > 3) {
      safe = false;
      break;
    }
    safe = true;
  }
  return safe;
}
