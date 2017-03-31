import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';


class Followuser extends React.Component {
  componentWillMount() {
    const id = this.props.params.id;
    const url = `http://localhost:5000/unfollow/${id}`;
    request
      .get(url)
      .set('Content-Type', 'application/json')
      .end(function (err, response) {
        // console.log(response.text);
        // return false;
        const a = JSON.parse(response.text);

        if (a.status === 0) {
          alert(a.data);
        }
        browserHistory.push('/profile');
      });
  }
  render() {
    return (
      <div></div>
    );
  }
}
export default Followuser;
