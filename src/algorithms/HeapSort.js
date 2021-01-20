let animations = [];
let arrLength = 0;

const maxHeap = (input, i) => {
	const left = 2 * i + 1;
	const right = 2 * i + 2;
	let max = i;
	if (left < arrLength && input[left] > input[max]) {
		max = left;
	}
	if (right < arrLength && input[right] > input[max]) {
		max = right;
	}
	if (max != i) {
		animations.push(['v', i, max]);
		animations.push(['s', i, max]);
		swap(input, i, max);
		maxHeap(input, max);
	}
};

const swap = (input, indexA, indexB) => {
	const temp = input[indexA];
	input[indexA] = input[indexB];
	input[indexB] = temp;
};

const heapSort = (input = []) => {
	arrLength = input.length;
	for (let i = Math.floor(arrLength / 2); i >= 0; i -= 1) {
		maxHeap(input, i);
	}

	for (let i = input.length - 1; i > 0; i--) {
		animations.push(['v', 0, i]);
		animations.push(['s', 0, i]);
		swap(input, 0, i);
		arrLength--;
		maxHeap(input, 0);
	}
	return input;
};

export function getHeapSortAnimations(array) {
	arrLength = array.length;
	heapSort(array.slice());

	return animations;
}
