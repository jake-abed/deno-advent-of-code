const data = await Deno.readTextFile('./day4/input.txt');

const TARGET1 = "XMAS";
const TARGET2 = "SAMX";

console.log("Starting data parsing!");
const t0 = performance.now();

const split = data.split("\n");
const parsed = split.map((line) => line.split(""));
const totalLines = parsed.length;
const lineLength = parsed[0].length;

const t1 = performance.now();

console.log(`Parsing complete! Took: ${(t1 - t0) * 1000} microseconds.`);

const t2 = performance.now();
const res = partOne(parsed);
const t3 = performance.now();

console.log(`Part one complete! Took: ${(t3 - t2) * 1000} microseconds.`);
console.log(`Part one solution: ${res}`);

function partOne(inp: Array<Array<string>>): number {
  let count = 0;

  for (let i = 0; i < totalLines; i++) {
    for (let j = 0; j < lineLength; j++) {
      if (i < (totalLines - 3)) {
        const down = inp[i][j] + inp[i+1][j] + inp[i+2][j] + inp[i+3][j];
        if (down === TARGET1 || down === TARGET2) {
          count++;
        }
      }
      if (j < (lineLength - 3)) {
        const right = inp[i][j] + inp[i][j+1] + inp[i][j+2] + inp[i][j+3];
        if (right === TARGET1 || right === TARGET2) {
          count++;
        }
      }
      if ((i < (totalLines - 3)) && (j < (lineLength - 3))) {
        const diagonal = inp[i][j] + inp[i+1][j+1] + inp[i+2][j+2] + inp[i+3][j+3];
        if (diagonal === TARGET1 || diagonal === TARGET2) {
          count++;
        }
      }
      if ((i < (totalLines - 3)) && (j > 2)) {
        const diagonal = inp[i][j] + inp[i+1][j-1] + inp[i+2][j-2] + inp[i+3][j-3];
        if (diagonal === TARGET1 || diagonal === TARGET2) {
          count++;
        }
      }
    }
  }
  
  return count;
}
