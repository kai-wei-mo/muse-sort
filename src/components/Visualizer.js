import React from 'react';
import './Visualizer.css';

import { getMergeSortAnimations } from '../algorithms/MergeSort.js';

const NUM_OF_BARS = 270;

const WIDTH = 1; //px
// total width of container is
// (WIDTH + 1) * NUMOFBARS - 1
// width should be odd for impeccable rendering
// num=20, width=24, speed 20
// (1 + 1) * 270 ( - 1)
// (2 + 1) * 180 ( - 1)
const MIN_BAR_HEIGHT = 1;
const MAX_BAR_HEIGHT = 24;
const PIXEL_CONVERSION_FACTOR = 12.5;
const COLORS = ['#68A691', '#F9F9F9'];
const SPEED = 4;
// https://coolors.co/7b82b4-efc7c2-ffe5d4-bfd3c1-68a691-2a2a2a-121212

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

	mergeSort() {
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
				</div>
			</>
		);
	}
}

export default Visualizer;
