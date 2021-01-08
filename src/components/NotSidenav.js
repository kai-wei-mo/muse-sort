import React from 'react';
import './NotSidenav.css';
import PlaylistMeta from './PlaylistMeta.js';
import Playlist from './Playlist.js';

class NotSidenav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		return (
			<div className='not-sidenav'>
				<PlaylistMeta />
				<Playlist />
			</div>
		);
	}
}

export default NotSidenav;
