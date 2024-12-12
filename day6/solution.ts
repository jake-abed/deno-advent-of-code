const data = await Deno.readTextFile("./day6/input.txt");

const t0 = performance.now();
const xAxis = data.split("\n").slice(0, -1);
const matrix = xAxis.map(line => line.split(""));

enum Direction {NORTH, EAST, SOUTH, WEST};

const start: Array<number> = findStart();
let curPos: Array<number> = [...start];
let curDir = Direction.NORTH;
const t1 = performance.now();

console.log(`Parsing & setup took: ${Math.floor((t1-t0) * 1000)} microseconds!`);

const t2 = performance.now();
const p1 = partOne();
const t3 = performance.now();

console.log(`Part one solution: ${p1}`);
console.log(`Part one took: ${Math.floor((t3-t2) * 1000)} microseconds!`);

curPos = [...start];
curDir = Direction.NORTH;
const t4 = performance.now();
const p2 = partTwo();
const t5 = performance.now();

console.log(`Part two solution: ${p2}`);
console.log(`Part two took: ${Math.floor((t5-t4) * 1000)} microseconds!`);

type turn = {
  coord: Array<number>,
  direction: number,
}

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

function partTwo(): number {
  const loopLocks: Set<string> = new Set();
  const visited: Set<string> = new Set();
  const turns: Array<turn> = []; 
  visited.add(curPos.toString());
  let prevPos = [...curPos];
  let exited = false;
  while (exited === false) {
    if (nextMoveOut()) {
      exited = true;
      break;
    }
    let isLoop = false; 
    switch (nextSpace()) {
      case ".":
        prevPos = [... curPos];
        moveOnce();
        visited.add(curPos.toString());
        isLoop = checkForLoop(turns, prevPos);
        if (isLoop && visited.has(prevPos.toString())) {
          loopLocks.add(curPos.toString());
        }
        break;
      case "^":
        prevPos = [... curPos];
        moveOnce();
        visited.add(curPos.toString());
        break;
      case "#":
        turnRight();
        turns.push({coord: curPos, direction: curDir});
        break;
    }
  }

  return loopLocks.size;
}

function checkForLoop(
  turns: Array<turn>,
  prevPos: Array<number>
): boolean {
  let isLoop = false;
  if (turns.length < 2) return isLoop;
  for (const turn of turns) {
    switch (curDir) {
      case Direction.NORTH:
        if (turn.coord[0] === prevPos[0] && turn.direction === Direction.SOUTH) isLoop = true;
        break;
      case Direction.EAST:
        if (prevPos[1] === turn.coord[1] && turn.direction === Direction.WEST) isLoop = true;
        break;
      case Direction.SOUTH:
        if (prevPos[0] === turn.coord[0] && turn.direction === Direction.NORTH) isLoop = true;
        break;
      case Direction.WEST:
        if (prevPos[1] === turn.coord[1] && turn.direction === Direction.EAST) isLoop = true;
        break;
    }
    if (isLoop) {
      console.log(`Found at ${prevPos} ${turn.coord} (${turns.indexOf(turn)})! while facing ${curDir}`);
      break;
    }
  }

  return isLoop;
}

// Sample solution expects 41 distinct positions as the solution.
