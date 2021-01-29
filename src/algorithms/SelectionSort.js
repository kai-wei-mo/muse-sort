let animations = [];

function selectionSort(inputArr) {
	let sorted = true;
	let n = inputArr.length;

	for (let i = 0; i < n; i++) {
		// Finding the smallest number in the subarray
		let indexOfMin = i;
		animations.push(['v', i, i]);

		for (let j = i + 1; j < n; j++) {
			if (indexOfMin !== i) {
				animations.push(['v', indexOfMin, j]);
			}

			if (inputArr[j] < inputArr[indexOfMin]) {
				indexOfMin = j;
			}
		}
		if (indexOfMin !== i) {
			// Swapping the elements
			sorted = false;
			animations.push(['v', indexOfMin, i]);
			animations.push(['s', indexOfMin, i]);
			let tmp = inputArr[i];
			inputArr[i] = inputArr[indexOfMin];
			inputArr[indexOfMin] = tmp;
		}
	}

	if (sorted) {
		for (let i = 0; i < inputArr.length - 1; i++) {
			animations.push(['v', i, i + 1]);
		}
	}
}

export function getSelectionSortAnimations(array) {
	let aux = array.slice();
	selectionSort(aux);

	let ret = animations;
	animations = [];

	return ret;
}
