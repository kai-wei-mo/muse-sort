import React from 'react';
import './Visualizer.css';

import * as Tone from 'tone';

import { getBubbleSortAnimations } from '../algorithms/BubbleSort.js';
import { getHeapSortAnimations } from '../algorithms/HeapSort.js';
import { getMergeSortAnimations } from '../algorithms/MergeSort.js';
import { getQuickSortAnimations } from '../algorithms/QuickSort.js';

import musicMap from '../music/ChromaticMap.js';

const NUM_OF_BARS = 180;
const WIDTH = 1;
// const SPEED = 4;
let SPEED = 10;
// total width of container is
// (WIDTH + 1) * NUMOFBARS - 1
// width should be odd for impeccable rendering

const MIN_BAR_HEIGHT = 1;
const MAX_BAR_HEIGHT = 24; // two octaves = 25 tones
const PIXEL_CONVERSION_FACTOR = 12.5;
const COLORS = ['#a2d2ff', 'red']; // https://coolors.co/7b82b4-efc7c2-ffe5d4-bfd3c1-68a691-2a2a2a-121212

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
		const synth = new Tone.Synth().toDestination();

		const animations = sortFunction(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName(this.props.alias);
			const [operation, index1, index2] = animations[i];

			const barOneStyle = arrayBars[index1].style;
			const barTwoStyle = arrayBars[index2].style;

			if (operation === 'v') {
				setTimeout(() => {
					barOneStyle.backgroundColor = COLORS[1];
					barTwoStyle.backgroundColor = COLORS[1];

					synth.triggerAttackRelease(
						this.heightToTone(barTwoStyle.height),
						'8n'
					);
				}, i * SPEED);

				setTimeout(() => {
					barOneStyle.backgroundColor = COLORS[0];
					barTwoStyle.backgroundColor = COLORS[0];
				}, (i + 1) * SPEED);
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

	mergeSort() {
		const synth = new Tone.Synth().toDestination();

		const animations = getMergeSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName(this.props.alias);
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 3 === 0 ? COLORS[1] : COLORS[0];
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;

					synth.triggerAttackRelease(
						this.heightToTone(barTwoStyle.height),
						'8n'
					);
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

	bubbleSort() {
		this.genericSort(getBubbleSortAnimations);
	}

	heapSort() {
		this.genericSort(getHeapSortAnimations);
	}

	quickSort() {
		this.genericSort(getQuickSortAnimations);
	}

	render() {
		const { array } = this.state;
		const aliasToFunction = {};
		aliasToFunction['merge'] = () => {
			this.mergeSort();
		};
		aliasToFunction['bubble'] = () => {
			this.bubbleSort();
		};
		aliasToFunction['heap'] = () => {
			this.heapSort();
		};
		aliasToFunction['quick'] = () => {
			this.quickSort();
		};

		return (
			<>
				<div className='visualizer'>
					{array.map((val, i) => (
						<div
							className={`visualizer-bar ${this.props.alias}`}
							key={i}
							style={{
								backgroundColor: COLORS[0],
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
						<button onClick={() => this.resetArray()}>
							Generate New Array
						</button>
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
