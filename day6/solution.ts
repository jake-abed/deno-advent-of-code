const data = await Deno.readTextFile("./day6/input.txt");

const t0 = performance.now();
const xAxis = data.split("\n").slice(0, -1);
const matrix = xAxis.map(line => line.split(""));

enum Direction {NORTH, EAST, SOUTH, WEST};

let curPos: Array<number> = findStart();
let curDir = Direction.NORTH;
const t1 = performance.now();

console.log(`Parsing & setup took: ${Math.floor((t1-t0) * 1000)} microseconds!`);

const t2 = performance.now();
const p1 = partOne();
const t3 = performance.now();

console.log(`Part one solution: ${p1}`);
console.log(`Part one took: ${Math.floor((t3-t2) * 1000)} microseconds!`);

function findStart(): Array<number> {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === "^") {
        return [i, j];
      }
    }
  }
  return [0, 0];
}

function turnRight(): void {
  switch (curDir) {
    case Direction.NORTH:
      curDir = Direction.EAST;
      break;
    case Direction.EAST:
      curDir = Direction.SOUTH;
      break;
    case Direction.SOUTH:
      curDir = Direction.WEST;
      break;
    case Direction.WEST:
      curDir = Direction.NORTH;
      break;
  }
}

function nextMoveOut(): boolean {
  switch (curDir) {
    case Direction.NORTH:
      return (curPos[0] - 1 < 0) ? true : false;
    case Direction.EAST:
      return ((curPos[1] + 1) >= matrix[0].length) ? true: false;
    case Direction.SOUTH:
      return ((curPos[0] + 1 ) >= matrix.length) ? true : false;
    case Direction.WEST:
      return ((curPos[1] - 1) < 0) ? true : false;
  }
}

function nextSpace(): string {
  const y = curPos[0];
  const x = curPos[1];

  switch (curDir) {
    case Direction.NORTH:
      return matrix[y-1][x];
    case Direction.EAST:
      return matrix[y][x+1];
    case Direction.SOUTH:
      return matrix[y+1][x];
    case Direction.WEST:
      return matrix[y][x-1];
  }
}

function moveOnce(): void {
  const y = curPos[0];
  const x = curPos[1];

  switch (curDir) {
    case Direction.NORTH:
      curPos = [y-1, x];
      return;
    case Direction.EAST:
      curPos = [y, x+1];
      return;
    case Direction.SOUTH:
      curPos = [y+1, x];
      return; 
    case Direction.WEST:
      curPos = [y, x-1];
      return;
  }
}

function partOne(): number {
  const visited: Set<string> = new Set();
  visited.add(curPos.toString());
  let exited = false;
  while (exited === false) {
    if (nextMoveOut()) {
      exited = true;
      break;
    }
    switch (nextSpace()) {
      case ".":
        moveOnce();
        visited.add(curPos.toString());
        break;
      case "^":
        moveOnce();
        break;
      case "#":
        turnRight();
        break;
    }
  }

  return visited.size;
}


// Sample solution expects 41 distinct positions as the solution.
