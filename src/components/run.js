import React from 'react';
import ReactDOM from 'react-dom';
import App from './Main';
import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
