import React from 'react';
import './Visualizer.css';

const NUM_OF_BARS = 20;
const MIN_BAR_HEIGHT = 1;
const MAX_BAR_HEIGHT = 20;
const PIXEL_CONVERSION_FACTOR = 15;
const COLOR = '#68A691';
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

	render() {
		const { array } = this.state;

		return (
			<>
				<div className='visualizer'>
					{array.map((val, i) => (
						<div
							className='visualizer-bar'
							key={i}
							style={{
								backgroundColor: COLOR,
								height: `${val}px`,
							}}
						></div>
					))}
				</div>
				<div className='button-group'>
					<button onClick={() => this.resetArray()}>Generate New Array</button>
					<button onClick={() => this.resetArray()}>dummy text</button>
				</div>
			</>
		);
	}
}

export default Visualizer;
