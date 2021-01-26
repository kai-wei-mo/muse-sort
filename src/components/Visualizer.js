import React from 'react';
import './Visualizer.css';

import * as Tone from 'tone';

import { shuffle } from '../algorithms/BogoSort.js';
import { getBubbleSortAnimations } from '../algorithms/BubbleSort.js';
import { getHeapSortAnimations } from '../algorithms/HeapSort.js';
import { getInsertionSortAnimations } from '../algorithms/InsertionSort.js';
import { getMergeSortAnimations } from '../algorithms/MergeSort.js';
import { getQuickSortAnimations } from '../algorithms/QuickSort.js';
import { getSelectionSortAnimations } from '../algorithms/SelectionSort.js';
import { getShellSortAnimations } from '../algorithms/ShellSort.js';

import musicMap from '../music/ChromaticMap.js';
import { BAR_COLORS } from './ColorConstants';

const NUM_OF_BARS = 180;
const WIDTH = 1;
let SPEED = 10;
// total width of container is
// (WIDTH + 1) * NUMOFBARS - 1
// width should be odd for impeccable rendering

const MIN_BAR_HEIGHT = 1;
const MAX_BAR_HEIGHT = 24; // two octaves = 25 tones
const PIXEL_CONVERSION_FACTOR = 12.5;

const SYNTH = new Tone.Synth().toDestination();

class Visualizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [],
		};

		this.getRandomInt = this.getRandomInt.bind(this);
	}

	componentDidMount() {
		this.resetArray();
	}

	getRandomInt(min, max) {
		// inclusive
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	resetArray() {
		const array = [];
		let randIndex = this.getRandomInt(0, NUM_OF_BARS - 1);

		for (let i = 0; i < NUM_OF_BARS; i++) {
			if (i === randIndex) {
				array.push(PIXEL_CONVERSION_FACTOR * MAX_BAR_HEIGHT);
			} else {
				array.push(
					PIXEL_CONVERSION_FACTOR *
						this.getRandomInt(MIN_BAR_HEIGHT, MAX_BAR_HEIGHT)
				);
			}
		}
		this.setState({ array });
	}

	heightToTone(h) {
		h = h.slice(0, -2); // remove "px"
		h /= PIXEL_CONVERSION_FACTOR;

		return musicMap[h];
	}

	genericSort(sortFunction) {
		const animations = sortFunction(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName(this.props.alias);
			const [operation, index1, index2] = animations[i];

			const barOneStyle = arrayBars[index1].style;
			const barTwoStyle = arrayBars[index2].style;

			if (operation === 'v') {
				setTimeout(() => {
					barOneStyle.backgroundColor = BAR_COLORS[1];
					barTwoStyle.backgroundColor = BAR_COLORS[1];

					try {
						SYNTH.triggerAttackRelease(
							this.heightToTone(barTwoStyle.height),
							'8n'
						);
					} catch (e) {}
				}, i * SPEED);

				setTimeout(() => {
					barOneStyle.backgroundColor = BAR_COLORS[0];
					barTwoStyle.backgroundColor = BAR_COLORS[0];
				}, (i + 1) * SPEED);
			} else if (operation === 'p') {
				setTimeout(() => {
					barOneStyle.backgroundColor = BAR_COLORS[2];
					barTwoStyle.backgroundColor = BAR_COLORS[2];
				}, i * SPEED);
			} else {
				setTimeout(() => {
					let { array } = this.state;
					let temp = array[index1];
					array[index1] = array[index2];
					array[index2] = temp;
					this.setState({ array });
				}, i * SPEED);
			}
		}
	}

	bogoSort() {
		for (let i = 0; i < 500; i++) {
			setTimeout(() => {
				let a = this.state.array;
				this.setState({ array: shuffle(a) });

				try {
					SYNTH.triggerAttackRelease(a[0], '8n');
				} catch (e) {}
			}, i * SPEED);
		}
	}

	mergeSort() {
		const animations = getMergeSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName(this.props.alias);
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 3 === 0 ? BAR_COLORS[1] : BAR_COLORS[0];
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;

					try {
						SYNTH.triggerAttackRelease(
							this.heightToTone(barTwoStyle.height),
							'8n'
						);
					} catch (e) {}
				}, i * SPEED);
			} else {
				setTimeout(() => {
					const [barOneIdx, newHeight] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * SPEED);
			}
		}
	}

	render() {
		const { array } = this.state;
		const aliasToFunction = {
			bogo: () => {
				this.bogoSort();
			},
			bubble: () => {
				this.genericSort(getBubbleSortAnimations);
			},
			heap: () => {
				this.genericSort(getHeapSortAnimations);
			},
			insertion: () => {
				this.genericSort(getInsertionSortAnimations);
			},
			merge: () => {
				this.mergeSort();
			},
			quick: () => {
				this.genericSort(getQuickSortAnimations);
			},
			selection: () => {
				this.genericSort(getSelectionSortAnimations);
			},
			shell: () => {
				this.genericSort(getShellSortAnimations);
			},
		};

		return (
			<>
				<div className='visualizer'>
					{array.map((val, i) => (
						<div
							className={`visualizer-bar ${this.props.alias}`}
							key={i}
							style={{
								backgroundColor: BAR_COLORS[0],
								height: `${val}px`,
								position: 'absolute',
								left: `${(WIDTH + 1) * i}px`,
								width: `${WIDTH}px`,
								bottom: '0',
							}}
						></div>
					))}
				</div>

				<div className='right'>
					<div className='code'>
						{this.props.code.map((val, i) => (
							<pre>{val}</pre>
						))}
					</div>

					<div className='button-group'>
						<button onClick={() => this.resetArray()}>NEW ARRAY</button>
						<button onClick={() => aliasToFunction[this.props.alias]()}>
							SORT
						</button>
					</div>
				</div>
			</>
		);
	}
}

export default Visualizer;
