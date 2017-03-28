import React from 'react';
import request from 'superagent';
import {browserHistory} from 'react-router'


class Followuser extends React.Component {
  componentWillMount() {
    let id = this.props.params.id;
    let url = `http://localhost:5000/unfollow/${id}`;
    request
      .get(url)
      .set('Content-Type', 'application/json')
      .end(function(err, response){
        // console.log(response.text);
        // return false;
        var a = JSON.parse(response.text);

        if(a.status === 0) {
          alert(a.data);
        } else {

        }

        browserHistory.push('/profile');


     });
  }
  render() {


    return (
      <div></div>
      )
  }
}
export default Followuser;
