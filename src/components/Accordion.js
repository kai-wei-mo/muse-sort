import React, { useState, useRef } from 'react';
import Chevron from './Chevron';

import './Accordion.css';

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
				<span className='ranking'>1</span>
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
				<span className='best case'>{props.best}</span>
				<span className='average case'>{props.average}</span>
				<span className='worst case'>{props.worst}</span>

				<Chevron className={`${setRotate}`} width={10} fill={'#777'} />
			</button>
			<div
				ref={content}
				style={{ maxHeight: `${setHeight}` }}
				className='accordion__content'
			>
				<div
					className='accordion__text'
					dangerouslySetInnerHTML={{ __html: props.content }}
				/>
			</div>
		</div>
	);
}

export default Accordion;
