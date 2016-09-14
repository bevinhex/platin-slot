import React from 'react';
import {render} from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Router,Route,Link,browserHistory,IndexRoute} from 'react-router';

import App from './ui/App.jsx';
import LoadingPage from './ui/LoadingPage.jsx';
import GamePage from './ui/GamePage.jsx';

Meteor.startup(()=>{
	render((
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={LoadingPage}/>
				<Route path = "game" component={GamePage}/>
			</Route>
		</Router>
	),document.body)
});
