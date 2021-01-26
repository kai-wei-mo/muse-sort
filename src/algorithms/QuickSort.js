export function getQuickSortAnimations(array) {
	const animations = [];
	if (array.length <= 1) {
		return array;
	}
	const aux = array.slice();
	quickSort(aux, 0, aux.length - 1, animations);
	return animations;
}

function swap(items, leftIndex, rightIndex) {
	var temp = items[leftIndex];
	items[leftIndex] = items[rightIndex];
	items[rightIndex] = temp;
}

function partition(items, left, right, animations) {
	var pivot = items[Math.floor((right + left) / 2)],
		i = left,
		j = right;
	animations.push(['v', i, j]);
	while (i <= j) {
		while (items[i] < pivot) {
			animations.push(['v', i, j]);
			i++;
		}
		while (items[j] > pivot) {
			animations.push(['v', i, j]);
			j--;
		}
		if (i <= j) {
			animations.push(['v', i, j]);
			animations.push(['s', i, j]);
			swap(items, i, j);
			i++;
			j--;
		}
	}
	return [i, animations];
}

function quickSort(items, left, right, animations) {
	if (items.length > 1) {
		let [index, updatedAnimations] = partition(items, left, right, animations);
		if (left < index - 1) {
			//more elements on left side of pivot
			quickSort(items, left, index - 1, updatedAnimations);
		}
		if (index < right) {
			//more elements on right side of pivot
			quickSort(items, index, right, updatedAnimations);
		}
	}
	return items;
}
