function getArrayParams(...arr) {
	if (arr.length === 0) {
		return {
			min: 0,
			max: 0,
			avg: 0
		};
	}

	let min = Math.min(...arr);
	let max = Math.max(...arr);

	let sum = arr.reduce((accumulator, current) => accumulator + current, 0);

	let avg = Number((sum / arr.length).toFixed(2));

	return {
		min: min,
		max: max,
		avg: avg
	};
}

function summElementsWorker(...arr) {
	if (arr.length === 0) {
		return 0;
	}

	return arr.reduce((sum, current) => sum + current, 0);
}

function differenceMaxMinWorker(...arr) {
	if (arr.length === 0) {
		return 0;
	}

	let min = Math.min(...arr);
	let max = Math.max(...arr);

	return max - min;
}

function differenceEvenOddWorker(...arr) {
	if (arr.length === 0) {
		return 0;
	}

	let sumEvenElement = 0;
	let sumOddElement = 0;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] % 2 === 0) {
			sumEvenElement += arr[i];
		} else {
			sumOddElement += arr[i];
		}
	}

	return sumEvenElement - sumOddElement;
}

function averageEvenElementsWorker(...arr) {
	if (arr.length === 0) {
		return 0;
	}

	let sumEvenElement = 0;
	let countEvenElement = 0;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] % 2 === 0) {
			sumEvenElement += arr[i];
			countEvenElement++;
		}
	}
	if (countEvenElement === 0) {
		return 0;
	}
	return sumEvenElement / countEvenElement;
}

function makeWork(arrOfArr, func) {
	let maxWorkerResult = -Infinity;

	for (let i = 0; i < arrOfArr.length; i++) {
		const result = func(...arrOfArr[i]);

		if (result > maxWorkerResult) {
			maxWorkerResult = result
		}
	}
	return maxWorkerResult;
}
