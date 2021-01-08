import React from 'react';
import ReactDOM from 'react-dom';

import Sidenav from './components/Sidenav.js';
import NotSidenav from './components/NotSidenav.js';

import './styles.css';

function App() {
	return (
		<div>
			<Sidenav />
			<NotSidenav />
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
