import { MENTAL_LOCKER } from './mental-locker';

function getRandomCellNumbers(from: number, to: number, count: number) {
	const randomCells: number[] = [];

	for (let i = 1; i <= count; i++) {
		while (true) {
			const randomCell: number = Math.round(Math.random() * (to - from)) + from;

			if (randomCells.includes(randomCell)) continue;

			randomCells.push(randomCell);

			break;
		}

		if (randomCells.length === count) break;
	}

	return randomCells;
}

type Answer = { cell: number; word: string };

type Result = { answer: Answer; status: 'WRONG'; correctAnswer: typeof MENTAL_LOCKER[0] };

function testCellToWord(mentalLocker: typeof MENTAL_LOCKER, answers: Answer[]) {
	const results: Result[] = [];

	for (let answer of answers) {
		if (mentalLocker[answer.cell].toLocaleLowerCase() !== answer.word.toLocaleLowerCase()) {
			results.push({
				status: 'WRONG',
				correctAnswer: mentalLocker[answer.cell],
				answer,
			});
		}
	}

	return results;
}

const ranges: [number, number, number][] = [[60, 90, 31]];

const randomCellNumbers: number[] = ranges.map((params) => getRandomCellNumbers(...params)).flat();

let answers: Answer[] = randomCellNumbers.map((randomCellNumber) => ({
	cell: randomCellNumber,
	word: '',
}));

console.log(answers);

answers = [];

console.log(`[Answers -> ${answers.length}] Results:`);

console.log(testCellToWord(MENTAL_LOCKER, answers));
