import React from 'react';
import './Playlist.css';

import Accordion from './Accordion.js';
import './Accordion.css';

import testIMG from '../assets/square-placeholder.png';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		return (
			<div className='playlist'>
				<Accordion
					image={testIMG}
					title='Merge Sort'
					artist='John von Neumann'
					album='Divide and Conquer'
					best='O(n log(n))'
					average='O(n log(n))'
					worst='O(n log(n))'
					content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
				/>
			</div>
		);
	}
}

export default Playlist;
