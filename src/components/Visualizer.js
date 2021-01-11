import React from 'react';
import './Visualizer.css';

import * as Tone from 'tone';

import { getMergeSortAnimations } from '../algorithms/MergeSort.js';
import { getBubbleAnimations } from '../algorithms/BubbleSort.js';
import musicMap from '../music/ChromaticMap.js';

const NUM_OF_BARS = 270;
const WIDTH = 1;
const SPEED = 4;
// total width of container is
// (WIDTH + 1) * NUMOFBARS - 1
// width should be odd for impeccable rendering
// (24 + 1) * 20 ( - 1)
// (1 + 1) * 270 ( - 1)
// (2 + 1) * 180 ( - 1)

const MIN_BAR_HEIGHT = 1;
const MAX_BAR_HEIGHT = 24; // two octaves = 25 tones
const PIXEL_CONVERSION_FACTOR = 12.5;
const COLORS = ['#68A691', '#F9F9F9']; // https://coolors.co/7b82b4-efc7c2-ffe5d4-bfd3c1-68a691-2a2a2a-121212

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

	mergeSort() {
		//create a synth and connect it to the main output (your speakers)
		const synth = new Tone.Synth().toDestination();

		const animations = getMergeSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName(this.props.algo);
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
		//create a synth and connect it to the main output (your speakers)
		const synth = new Tone.Synth().toDestination();

		const animations = getBubbleAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName(this.props.algo);
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
					let temp = barOneStyle.height;
					barOneStyle.height = barTwoStyle.height;
					barTwoStyle.height = temp;
				}, i * SPEED);
			}
		}
	}

	render() {
		const { array } = this.state;

		return (
			<>
				<div className='visualizer'>
					{array.map((val, i) => (
						<div
							className={`visualizer-bar ${this.props.algo}`}
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
				<div className='button-group'>
					<button onClick={() => this.resetArray()}>Generate New Array</button>
					<button onClick={() => this.mergeSort()}>Merge Sort</button>
					<button onClick={() => this.resetArray()}>dummy text</button>
					<button onClick={() => this.bubbleSort()}>Bubble Sort</button>
				</div>
			</>
		);
	}
}

export default Visualizer;
