import React from 'react';
import './Sidenav.css';

import arrowIMG from '../assets/arrow.png';
// import logoIMG from '../assets/logo-placeholder.png';
import logoIMG from '../assets/logo3.png';

class Sidenav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		return (
			<div className='sidenav'>
				<img className='logo-img' src={logoIMG} alt='logo' />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<p className='arrow-text'>
					click on a sorting algorithm to get started
				</p>
				<img
					className='arrow-img'
					src={arrowIMG}
					alt='arrow point to the right'
				/>
			</div>
		);
	}
}

export default Sidenav;
