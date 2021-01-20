import testIMG from '../assets/square-placeholder.png';

// https://lamfo-unb.github.io/img/Sorting-algorithms/Complexity.png
// varies depending on personal implemention

let obj = [
	{
		ranking: 1,
		image: testIMG,
		title: 'Bubble Sort',
		alias: 'bubble',
		artist: 'Unknown',
		album: 'Simple Algorithms',
		best: 'O(n ^ 2)',
		average: 'O(n ^ 2)',
		worst: 'O(n ^ 2)',
		code: [
			`for i = 0 to endOfArray`,
			`  for j = i + 1 to endOfArray - i - 1`,
			`    if arr[j] > arr[j + 1]`,
			`      swap arr[j] with arr[j + 1]`,
		],
	},
	{
		ranking: 2,
		image: testIMG,
		title: 'Heap Sort',
		alias: 'heap',
		artist: 'J. W. J. Williams',
		album: 'Heap Sort',
		best: 'O(n log(n))',
		average: 'O(n log(n))',
		worst: 'O(n log(n))',
		code: [
			//https://algorithmist.com/wiki/Heap_sort

			`BuildHeap(A)`,
			`for i = n to 1`,
			`  swap(A[1], A[i])`,
			`  n = n - 1`,
			`  Heapify(A, 1)`,
		],
	},
	{
		ranking: 3,
		image: testIMG,
		title: 'Insertion Sort',
		alias: 'insertion',
		artist: 'John Mauchly',
		album: 'Incremental Approach',
		best: 'O(n)',
		average: 'O(n ^ 2)',
		worst: 'O(n ^ 2)',
		code: [
			`for i from 1 to N`,
			`  j = i - 1`,
			`  while j >= 0 and arr[j] > arr[j + 1]`,
			`    swap arr[j] with arr[j + 1]`,
			`    j--`,
		],
	},
	{
		ranking: 4,
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
		ranking: 5,
		image: testIMG,
		title: 'Quick Sort',
		alias: 'quick',
		artist: 'Tony Hoare',
		album: 'Divide and Conquer',
		best: 'O(n log(n))',
		average: 'O(n log(n))',
		worst: 'O(n ^ 2)',
		code: [
			// https://www.geeksforgeeks.org/quick-sort/
			`quickSort(arr[], low, high)`,
			`if (low < high)`,
			`  pi = partition(arr, low, high);`,
			`  quickSort(arr, low, pi - 1);`,
			`  quickSort(arr, pi + 1, high);`,
		],
	},
	{
		ranking: 6,
		image: testIMG,
		title: 'Selection Sort',
		alias: 'selection',
		artist: 'Oscar Wilde',
		album: 'Incremental Approach', // unsure about algo paradigm
		best: 'O(n ^ 2)',
		average: 'O(n ^ 2)',
		worst: 'O(n ^ 2)',
		code: [
			`repeat (numOfElements - 1) times`,
			`  minimum = the first unsorted element`,
			`  for each unsorted element`,
			`    if element < currentMinimum`,
			`      set element as new minimum`,
			`    swap minimum with first unsorted`,
		],
	},
];

export default obj;
