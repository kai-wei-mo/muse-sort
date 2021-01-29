import img1 from '../../assets/1.jpg';
import img2 from '../../assets/2.jpg';
import img3 from '../../assets/3.jpg';
import img4 from '../../assets/4.jpg';
import img5 from '../../assets/5.jpg';
import img6 from '../../assets/6.jpg';
import img7 from '../../assets/7.jpg';
import img8 from '../../assets/8.jpg';

// https://lamfo-unb.github.io/img/Sorting-algorithms/Complexity.png
// varies depending on personal implemention

// https://open.spotify.com/playlist/37i9dQZF1DX4QJLfOsEteR?si=fdU10vWCQdWqrBLHnkNiPg
// album art

let comp = {
	'O(n)': 1,
	'O(n log(n))': 2,
	'O(n ^ 2)': 3,
	'O((n + 1)!)': 4,
	'O(infinity)': 5,
};

let byTitle = [
	{
		image: img1,
		title: 'Bogo Sort',
		alias: 'bogo',
		artist: 'Unknown',
		album: 'Bogo Sort',
		best: 'O(n)',
		average: 'O((n + 1)!)',
		worst: 'O(infinity)',
		code: [
			`while array not sorted`,
			`  shuffle array`,
			` `,
			`// we stop after 500 unsuccessful attempts.`,
			`// sort responsibly.`,
		],
	},
	{
		image: img2,
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
		image: img3,
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
		image: img4,
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
		image: img5,
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
		image: img6,
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
		image: img7,
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
	{
		image: img8,
		title: 'Shell Sort',
		alias: 'shell',
		artist: 'Donald Shell',
		album: 'Divide and Conquer',
		best: 'O(n log(n))',
		average: 'O(n ^ 2)',
		worst: 'O(n ^ 2)',
		code: [
			`for (i = gap; i < n; i += 1)`,
			`  temp = a[i]`,
			`  for (j = i; j >= gap and a[j - gap] > temp; j -= gap)`,
			`    a[j] = a[j - gap]`,
			`  a[j] = temp`,
		],
	},
];

// subsort, stable on title
let byAlbum = byTitle.slice();
let byBest = byTitle.slice();
let byAverage = byTitle.slice();
let byWorst = byTitle.slice();

byAlbum.sort((a, b) => (a.album > b.album ? 1 : b.album > a.album ? -1 : 0));
byBest.sort((a, b) =>
	comp[a.best] > comp[b.best] ? 1 : comp[b.best] > comp[a.best] ? -1 : 0
);
byAverage.sort((a, b) =>
	comp[a.average] > comp[b.average]
		? 1
		: comp[b.average] > comp[a.average]
		? -1
		: 0
);
byWorst.sort((a, b) =>
	comp[a.worst] > comp[b.worst] ? 1 : comp[b.worst] > comp[a.worst] ? -1 : 0
);

let ex = {
	byTitle: byTitle,
	byAlbum: byAlbum,
	byBest: byBest,
	byAverage: byAverage,
	byWorst: byWorst,
};

export default ex;
