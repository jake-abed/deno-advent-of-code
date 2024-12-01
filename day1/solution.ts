const data = await Deno.readTextFile('./day1/input.txt');

let columnOne: Array<number> = [];
let columnTwo: Array<number> = [];

let rows = data.split('\n');

for (const row of rows) {
	const cols = row.split('   ');
	columnOne.push(Number(cols[0]));
	columnTwo.push(Number(cols[1]));
}

columnOne.sort();
columnTwo.sort();

let sum = 0;

for (let i = 0; i < columnTwo.length; i++) {
	let diff = columnTwo[i] - columnOne[i];

	if (diff < 0) {
		diff *= -1;
	}

	sum += diff;
}

console.log('Part One Solution: ', sum);

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

console.log('Part Two Solution: ', sum2);
