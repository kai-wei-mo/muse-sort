let animations = [];

function insertionSort(inputArr) {
	let sorted = true;
	let n = inputArr.length;
	for (let i = 1; i < n; i++) {
		let current = inputArr[i];
		let j = i - 1;

		while (j >= 0 && current < inputArr[j]) {
			sorted = false;
			animations.push(['v', j + 1, j]); // the second entry dictates pitch
			animations.push(['s', j + 1, j]);
			inputArr[j + 1] = inputArr[j];
			j--;
		}
		inputArr[j + 1] = current;
	}

	if (sorted) {
		for (let i = 0; i < inputArr.length - 1; i++) {
			animations.push(['v', i, i + 1]);
		}
	}
}

export function getInsertionSortAnimations(array) {
	insertionSort(array.slice());

	let ret = animations.slice();
	animations = [];

	return ret;
}
