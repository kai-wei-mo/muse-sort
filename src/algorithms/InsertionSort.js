let animations = [];

function insertionSort(inputArr) {
	let n = inputArr.length;
	for (let i = 1; i < n; i++) {
		let current = inputArr[i];
		let j = i - 1;

		while (j >= 0 && current < inputArr[j]) {
			animations.push(['v', j + 1, j]); // the second entry dictates pitch
			animations.push(['s', j + 1, j]);
			inputArr[j + 1] = inputArr[j];
			j--;
		}
		inputArr[j + 1] = current;
	}
	return inputArr;
}

export function getInsertionSortAnimations(array) {
	insertionSort(array.slice());

	return animations;
}
