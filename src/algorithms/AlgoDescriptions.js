import testIMG from '../assets/square-placeholder.png';

// https://lamfo-unb.github.io/img/Sorting-algorithms/Complexity.png
let obj = [
	{
		ranking: 1,
		image: testIMG,
		title: 'Merge Sort',
		alias: 'merge',
		artist: 'John von Neumann',
		album: 'Divide and Conquer',
		best: 'O(n log(n))',
		average: 'O(n log(n))',
		worst: 'O(n log(n))',
		code: [
			`mergeSort(arr, left, right)`,
			`  if right > left`,
			`    middle = (left + right) / 2`,
			`    mergeSort(arr, left, middle)`,
			`    mergeSort(arr, middle + 1, right)`,
			`    combine(arr, left, middle, right)`,
		],
	},
	{
		ranking: 2,
		image: testIMG,
		title: 'Quick Sort',
		alias: 'quick',
		artist: 'Tony Hoare',
		album: 'Divide and Conquer',
		best: 'O(n log(n))',
		average: 'O(n log(n))',
		worst: 'O(n^2)',
		code: [
			`for each (unsorted) partition`,
			`  set first element as pivot`,
			`  storeIndex = pivotIndex + 1`,
			`  for i = pivotIndex + 1 to rightmostIndex`,
			`    if element[i] < element[pivot]`,
			`      swap(i, storeIndex); storeIndex++`,
			`  swap(pivot, storeIndex - 1)`,
		],
	},
	{
		ranking: 3,
		image: testIMG,
		title: 'Bubble Sort',
		alias: 'bubble',
		artist: 'Unknown',
		album: 'Simple Algorithms',
		best: 'O(n^2)',
		average: 'O(n^2)',
		worst: 'O(n^2)',
		code: [
			`for i = 0 to endOfArray`,
			`  for j = i + 1 to endOfArray - 1`,
			`    if leftElement > rightElement`,
			`      swap(leftElement, rightElement)`,
		],
	},
	{
		ranking: 4,
		image: testIMG,
		title: 'Heap Sort',
		alias: 'heap',
		artist: 'J. W. J. Williams',
		album: 'Unlisted',
		best: 'O(n log(n))',
		average: 'O(n log(n))',
		worst: 'O(n log(n))',
		code: [
			//https://algorithmist.com/wiki/Heap_sort

			`Heapsort(A as array)`,
			`  BuildHeap(A)`,
			`  for i = n to 1`,
			`    swap(A[1], A[i])`,
			`    n = n - 1`,
			`    Heapify(A, 1)`,
		],
	},
];

export default obj;
