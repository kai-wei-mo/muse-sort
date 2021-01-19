import React from 'react';
import './Playlist.css';

import Accordion from './Accordion.js';
import './Accordion.css';

import algoDescriptions from '../algorithms/AlgoDescriptions.js';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		return (
			<div className='playlist-wrapper'>
				<div className='bg-grad'></div>
				<div className='playlist'>
					{algoDescriptions.map((d) => {
						return (
							<Accordion
								key={d.ranking}
								ranking={d.ranking}
								image={d.image}
								title={d.title}
								alias={d.alias}
								artist={d.artist}
								album={d.album}
								best={d.best}
								average={d.average}
								worst={d.worst}
								content={d.content}
								code={d.code}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Playlist;
