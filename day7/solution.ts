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

const t2 = performance.now();
const p1 = partOne();
const t3 = performance.now();

console.log(`Part one complete: ${p1}. Took: ${(t3-t2) * 1000} microseconds!`);

const t4 = performance.now();
const p2 = partTwo();
const t5 = performance.now();

console.log(`Part two complete: ${p2}. Took: ${(t5-t4) * 1000} microsecond!`);


function partOne(): number {
  let sum = 0;

  for (const eq in eqs) {
    const match = findMatch(Number(eq), eqs[eq]);
    if (match) {
      sum += Number(eq);
    }
  }

  return sum;
}

function findMatch(num: number, operands: Array<number>): boolean {
  const plus = matchOperate(num, operands.slice(1), operands[0], "+");
  const times = matchOperate(num, operands.slice(1), operands[0], "*");

  return plus || times;
}

function matchOperate(num: number, operands: Array<number>, soFar: number, operator: string): boolean {
  if (soFar > num) {
    return false;
  }
  if (operands.length === 0) {
    return num === soFar;
  }
  let newSoFar = soFar;
  if (operator === "+") {
    newSoFar += operands[0];
  }
  if (operator === "*") {
    newSoFar *= operands[0];
  }

  const plus = matchOperate(num, operands.slice(1), newSoFar, "+");
  const minus = matchOperate(num, operands.slice(1), newSoFar, "*");

  return plus || minus;
}

function findMatchConcat(num: number, operands: Array<number>): boolean {
  const plus = matchOperateConcat(num, operands.slice(1), operands[0], "+");
  const times = matchOperateConcat(num, operands.slice(1), operands[0], "*");
  const concat = matchOperateConcat(num, operands.slice(1), operands[0], "||");

  return plus || times || concat;
}

function matchOperateConcat(
  num: number,
  operands: Array<number>, 
  soFar: number,
  operator: string
): boolean {
  if (soFar > num) {
    return false;
  }
  if (operands.length === 0 ) {
    return num === soFar;
  }
  let newSoFar = soFar;
  if (operator === "+") {
    newSoFar += operands[0];
  }
  if (operator === "*") {
    newSoFar *= operands[0];
  }
  if (operator == "||") {
    newSoFar = Number(soFar.toString() + operands[0].toString());
  }

  const plus = matchOperateConcat(num, operands.slice(1), newSoFar, "+");
  const times = matchOperateConcat(num, operands.slice(1), newSoFar, "*");
  const concat = matchOperateConcat(num, operands.slice(1), newSoFar, "||");

  return plus || times || concat;
}

function partTwo(): number {
  let sum = 0;

  for (const eq in eqs) {
    const match = findMatchConcat(Number(eq), eqs[eq]);
    if (match) {
      sum += Number(eq);
    }
  }

  return sum;
}
