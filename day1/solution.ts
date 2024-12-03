const data = await Deno.readTextFile('./day1/input.txt');

const tZero = performance.now()

const columnOne: Array<number> = [];
const columnTwo: Array<number> = [];

const rows = data.split('\n');

for (const row of rows) {
	const cols = row.split('   ');
	columnOne.push(Number(cols[0]));
	columnTwo.push(Number(cols[1]));
}

columnOne.sort();
columnTwo.sort();

const tOne = performance.now();

console.log(`Parse and sort took ${1000 * (tOne - tZero)} microseconds!`);

let sum = 0;

for (let i = 0; i < columnTwo.length; i++) {
	let diff = columnTwo[i] - columnOne[i];

	if (diff < 0) {
		diff *= -1;
	}

	sum += diff;
}

const tTwo = performance.now()

console.log('Part One Solution: ', sum);
console.log(`Took ${1000 * (tTwo - tOne)} microseconds!`);

const tThree = performance.now();

const appearances: Record<number, number> = {};

for (const num of columnOne) {
	appearances[num] = 0;
}

for (const num of columnTwo) {
	if (columnOne.includes(num)) {
		appearances[num] += 1;
	}
}

let sum2 = 0;

for (const num of columnOne) {
	sum2 += num * appearances[num];
}

const tFour = performance.now()

console.log('Part Two Solution: ', sum2);
console.log(`Took ${1000 * (tFour - tThree)} microseconds!`);

