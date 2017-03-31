import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';


import App from './App';
import index1 from './index1';
import index2 from './index2';
import Profile from './profile';
import Follow from './follow';
import FollowUser from './followuser';
import UnFollowUser from './unfollowuser';
import logout from './logout';


import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/index" component={index1} />
    <Route path="/index2" component={index2} />
    <Route path="/profile" component={Profile} />
    <Route path="/follow" component={Follow} />
    <Route path="/follow/:id" component={FollowUser} />
    <Route path="/unfollow/:id" component={UnFollowUser} />
    <Route path="/logout" component={logout} />
  </Router>

), document.getElementById('root'));
