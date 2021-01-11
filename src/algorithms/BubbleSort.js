export function getBubbleAnimations(array) {
	const animations = [];
	if (array.length <= 1) return array;
	const auxiliaryArray = array.slice();
	bubbleSort(auxiliaryArray, animations);
	return animations;
}

let bubbleSort = (aux, anime) => {
	let n = aux.length;

	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			anime.push(['v', j, j + 1]);
			anime.push(['v', j, j + 1]);

			if (aux[j] > aux[j + 1]) {
				let temp = aux[j];
				aux[j] = aux[j + 1];
				aux[j + 1] = temp;

				anime.push(['s', j, j + 1]);
			}
		}
	}
};
