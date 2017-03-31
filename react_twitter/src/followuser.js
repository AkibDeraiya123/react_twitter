import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class Followuser extends React.Component {
  componentWillMount() {
    const id = this.props.params.id;
    const url = `http://localhost:5000/follow`;
    const userLoginDetail = { follower: id, follow: cookie.load('userId') };
    const a = JSON.stringify(userLoginDetail);

    request
      .post(url)
      .set('Content-Type', 'application/json')
      .send(a)
      .end(function (err, response) {
        console.log(response.text);
        const a = JSON.parse(response.text);
        if (a.status === 0) {
          alert(a.data);
        }

        browserHistory.push('/follow');
      });
  }
  render() {
    return (
      <div></div>
    );
  }
}
export default Followuser;
