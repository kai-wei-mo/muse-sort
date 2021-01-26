let animations = [];

export function getBubbleSortAnimations(array) {
	if (array.length <= 1) {
		return array;
	}

	bubbleSort(array.slice());

	let ret = animations.slice();
	animations = [];

	return ret;
}

let bubbleSort = (arr) => {
	let n = arr.length;

	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			animations.push(['v', j, j + 1]);

			if (arr[j] > arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;

				animations.push(['s', j, j + 1]);
			}
		}
	}
};
