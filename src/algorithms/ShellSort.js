let animations = [];

function shellSort(arr) {
	let isSorted = true;
	let increment = arr.length / 2;
	while (increment > 0) {
		for (let i = increment; i < arr.length; i++) {
			let j = i;
			let temp = arr[i];

			while (j >= increment && arr[j - increment] > temp) {
				isSorted = false;
				animations.push(['v', j, j - increment]);
				animations.push(['s', j, j - increment]);
				arr[j] = arr[j - increment];
				j = j - increment;
			}

			arr[j] = temp;
		}

		if (increment === 2) {
			increment = 1;
		} else {
			increment = parseInt((increment * 5) / 11);
		}
	}

	if (isSorted) {
		for (let i = 0; i < arr.length - 1; i++) {
			animations.push(['v', i, i + 1]);
		}
	}
}

export function getShellSortAnimations(array) {
	shellSort(array.slice());

	let ret = animations.slice();
	animations = [];

	return ret;
}
