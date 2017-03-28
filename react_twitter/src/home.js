import React from 'react';
import Header from './component/header';
import cookie from 'react-cookie';

import { browserHistory } from 'react-router';


// import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  render() {
    console.log((cookie.load('userId'));
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
