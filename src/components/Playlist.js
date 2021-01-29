import React from 'react';
import './Playlist.css';

import Accordion from './Accordion.js';
import './Accordion.css';

import Header from './Header.js';

import descriptions from '../algorithms/descriptions/AlgoDescriptions.js';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			algoDescriptions: descriptions.byTitle,
		};

		this.changeDescription = this.changeDescription.bind(this);
	}

	componentDidMount() {}

	changeDescription(byWhat) {
		let currentDescriptions = this.state.algoDescriptions;
		let newDescriptions = descriptions[byWhat];

		for (let i = 0; i < currentDescriptions.length; i++) {
			if (currentDescriptions[i] !== newDescriptions[i]) {
				this.setState({ algoDescriptions: newDescriptions });
				return;
			}
		}

		this.setState({
			algoDescriptions: currentDescriptions.slice().reverse(),
		});
	}

	render() {
		return (
			<div className='playlist-wrapper'>
				<div className='bg-grad'></div>
				<div className='playlist'>
					<Header sortAlgos={this.changeDescription} />
					{this.state.algoDescriptions.map((d, i) => {
						return (
							<Accordion
								key={'foo' + i} // supression
								ranking={i + 1}
								image={d.image}
								title={d.title}
								alias={d.alias}
								artist={d.artist}
								album={d.album}
								best={d.best}
								average={d.average}
								worst={d.worst}
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
