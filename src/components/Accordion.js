import React, { useState, useRef } from 'react';
import './Accordion.css';

import { TIME_COLORS } from './ColorConstants.js';

import Visualizer from './Visualizer.js';
import Chevron from './Chevron';

function Accordion(props) {
	const [setActive, setActiveState] = useState('');
	const [setHeight, setHeightState] = useState('0px');
	const [setRotate, setRotateState] = useState('accordion__icon');

	const content = useRef(null);

	function toggleAccordion() {
		setActiveState(setActive === '' ? 'active' : '');
		setHeightState(
			setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
		);
		setRotateState(
			setActive === 'active' ? 'accordion__icon' : 'accordion__icon rotate'
		);
	}

	return (
		<div className='accordion__section'>
			<button className={`accordion ${setActive}`} onClick={toggleAccordion}>
				<span className='ranking'>{props.ranking}</span>
				<img className='song-image' src={props.image} alt='filler'></img>
				<div className='song-and-artist'>
					<p className='song-name'>{props.title}</p>
					<a
						target='_blank'
						rel='noopener noreferrer'
						href={`https://www.google.com/search?q=${props.artist.replaceAll(
							' ',
							'+'
						)}`}
						className='artist-name'
					>
						{props.artist}
					</a>
				</div>
				<span className='album-name'>{props.album}</span>
				<span
					className='best case'
					style={{ backgroundColor: TIME_COLORS[props.best] }}
				>
					{props.best}
				</span>
				<span
					className='average case'
					style={{ backgroundColor: TIME_COLORS[props.average] }}
				>
					{props.average}
				</span>
				<span
					className='worst case'
					style={{ backgroundColor: TIME_COLORS[props.worst] }}
				>
					{props.worst}
				</span>

				<Chevron className={`${setRotate} chevron`} width={10} fill={'#777'} />
			</button>
			<div
				ref={content}
				style={{ maxHeight: `${setHeight}` }}
				className='accordion__content'
			>
				<Visualizer alias={props.alias} code={props.code} />
			</div>
		</div>
	);
}

export default Accordion;
