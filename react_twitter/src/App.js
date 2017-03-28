import React from 'react';
import Header from './component/header';
import cookie from 'react-cookie';

import { browserHistory } from 'react-router';
import './App.css';

class App extends React.Component {
  componentWillMount() {
    let a = cookie.load('userId')
        if(a > 0) {
         browserHistory.push("/index");
        }
  }
  render() {
    return (
      <div className="App">
        <div>
          <Header />
        </div>

        <div className="App-header">
          <h2>Welcome to Twitter</h2>
          <a href="#" data-toggle="modal" data-target="#mylogin">Click Here </a> For Login
        </div>

      </div>
    );
  }
}

export default App;
