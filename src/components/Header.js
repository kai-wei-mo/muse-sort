import React from 'react';
import './Header.css';

class Header extends React.Component {
	render() {
		return (
			<div className='header'>
				<button>#</button>
				<button onClick={() => this.props.sortAlgos('byTitle')}>TITLE</button>
				<button onClick={() => this.props.sortAlgos('byAlbum')}>ALBUM</button>
				<button onClick={() => this.props.sortAlgos('byBest')}>BEST</button>
				<button onClick={() => this.props.sortAlgos('byAverage')}>
					AVERAGE
				</button>
				<button onClick={() => this.props.sortAlgos('byWorst')}>WORST</button>
			</div>
		);
	}
}
export default Header;
