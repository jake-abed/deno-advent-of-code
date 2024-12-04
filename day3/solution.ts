const data = await Deno.readTextFile('./day3/input.txt');

const re = /(mul\(\d+,\d+\))/g;
const re2 = /(mul\(\d+,\d+\))|(do\(\))|(don\'t\(\))/g;

const partOne = () => {
  const matches = data.matchAll(re);
  let sum = 0;
  for (const match of matches) {
    sum += parseMatch(match[0]);
  }
  return sum;
}

const parseMatch = (match: string) => {
  const nums = match.split("(")[1].split(")")[0].split(",");
  const num1 = Number(nums[0]);
  const num2 = Number(nums[1]);
  return num1 * num2;
}

const parseMatch2 = (match: string) => {
  if (match === "do()") {
    return true
  } else if (match === "don't()") {
    return false
  }
  const nums = match.split("(")[1].split(")")[0].split(",");
  const num1 = Number(nums[0]);
  const num2 = Number(nums[1]);
  return num1 * num2;
}

const partTwo = () => {
  const matches = data.matchAll(re2);
  let doMath = true;
  let sum = 0;
  for (const match of matches) {
    const result = parseMatch2(match[0]);
    if (typeof(result) === "boolean") {
      doMath = result;
      continue;
    }
    if (doMath) {
      sum += result;
    }
  }
  return sum;
}

const t0 = performance.now();
console.log("Part one solution: ", partOne());
const t1 = performance.now();
console.log(`Part one took: ${(t1-t0) * 1000} microseconds!`);
console.log("Part two solution: ", partTwo());
const t2 = performance.now();
console.log(`Part two took: ${(t2-t1) * 1000} microseconds!`);
