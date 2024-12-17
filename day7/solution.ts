const data = await Deno.readTextFile("./day7/input.txt");

const t0 = performance.now()

const equations = data.split("\n").slice(0, -1)

const eqs: Record<number, Array<number>> = {};

for (let i = 0; i < equations.length; i++) {
  const split = equations[i].split(": ");
  const testVal = Number(split[0]);
  const operands = split[1].split(" ").map(num => Number(num));
  eqs[testVal] = operands;
}

const t1 = performance.now()

console.log(`Parsing complete! Took: ${(t1-t0) * 1000} microseconds!`);

partOne();

function partOne(): number {
  let sum = 0;

  for (const eq in eqs) {
    console.log(eq);
    console.log(eqs[eq]);
  }

  return sum;
}
