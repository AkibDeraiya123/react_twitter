import React from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class Logout extends React.Component {
  render() {
    var a = cookie.load('userId');
    if(a > 0 ) {
      cookie.remove('userId', { path: '/' });
      browserHistory.push('/');
    } else {
      browserHistory.push('/');
    }

    return (
      <div>a</div>

    );
  }
}

 export default Logout;
