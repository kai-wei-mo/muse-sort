import React from 'react';
import './Visualizer.css';

import * as Tone from 'tone';

import { getBubbleSortAnimations } from '../algorithms/BubbleSort.js';
import { getHeapSortAnimations } from '../algorithms/HeapSort.js';
import { getInsertionSortAnimations } from '../algorithms/InsertionSort.js';
import { getMergeSortAnimations } from '../algorithms/MergeSort.js';
import { getQuickSortAnimations } from '../algorithms/QuickSort.js';
import { getSelectionSortAnimations } from '../algorithms/SelectionSort.js';
import { getShellSortAnimations } from '../algorithms/ShellSort.js';

import musicMap from '../music/ChromaticMap.js';
import { BAR_COLORS } from './ColorConstants';

const NUM_OF_NOTES = 25; // 25 pitches in two inclusive octaves
const NUM_OF_BARS = 175; // container min. width is (WIDTH + 1) * NUMOFBARS - 1
const WIDTH = 1; // width should be odd for impeccable rendering
const PIXEL_CONVERSION_FACTOR = 12;

const SYNTH = new Tone.Synth().toDestination();
SYNTH.volume.value = -50;

class Visualizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [],
			speed: 4,
			clickable: true,
		};

		this.setSpeed = this.setSpeed.bind(this);
	}

	componentDidMount() {
		this.resetArray();
	}

	setSpeed(s) {
		this.setState({ speed: s });
	}

	resetArray() {
		const array = [];

		for (let i = 0; i < NUM_OF_BARS; i++) {
			array[i] =
				PIXEL_CONVERSION_FACTOR *
				(Math.floor(i / (NUM_OF_BARS / NUM_OF_NOTES)) + 1);
		}

		// unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle
		let currentIndex = array.length,
			temporaryValue,
			randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		this.setState({ array });
	}

	heightToTone(h) {
		h = h.slice(0, -2); // remove "px"
		h /= PIXEL_CONVERSION_FACTOR;

		return musicMap[h];
	}

	genericSort(sortFunction) {
		// for any sorting algorithm that is based on the swapping of two elements
		const animations = sortFunction(this.state.array);

		this.setState({ clickable: false });
		setTimeout(() => {
			this.setState({ clickable: true });
		}, (animations.length + 1) * this.state.speed);

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
				}, i * this.state.speed);

				setTimeout(() => {
					barOneStyle.backgroundColor = BAR_COLORS[0];
					barTwoStyle.backgroundColor = BAR_COLORS[0];
				}, (i + 1) * this.state.speed);
			} else {
				setTimeout(() => {
					let { array } = this.state;
					let temp = array[index1];
					array[index1] = array[index2];
					array[index2] = temp;
					this.setState({ array });
				}, i * this.state.speed);
			}
		}
	}

	bogoSort() {
		// shuffles array 500 times even if it is sorted
		for (let i = 0; i < 500; i++) {
			setTimeout(() => {
				this.resetArray();

				try {
					SYNTH.triggerAttackRelease(this.state.array[0], '8n');
				} catch (e) {}
			}, (i + 1) * (this.state.speed + 10));
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
				}, i * this.state.speed);
			} else {
				setTimeout(() => {
					const [barOneIdx, newHeight] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * this.state.speed);
			}
		}
	}

	render() {
		const { array } = this.state;
		const aliasFunc = {
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
								key: `${WIDTH}`, // supression
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
							<pre key={i}>{val}</pre>
						))}
					</div>

					<div className='button-group'>
						<button
							onClick={() => (this.state.clickable ? this.resetArray() : -1)}
						>
							NEW ARRAY
						</button>
						{/*<button
							onClick={() => (this.state.clickable ? this.setSpeed(70) : -1)}
						>
							SPEED
						</button>*/}
						<button
							onClick={() =>
								this.state.clickable ? aliasFunc[this.props.alias]() : -1
							}
						>
							SORT
						</button>
					</div>
				</div>
			</>
		);
	}
}

export default Visualizer;
