import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';



class Followuser extends React.Component {
  componentWillMount() {
    let id = this.props.params.id;
    let url = `http://localhost:5000/follow`;
    let userLoginDetail = {follower : id, follow : cookie.load('userId'), };
    var a = JSON.stringify(userLoginDetail);

    request
      .post(url)
      .set('Content-Type', 'application/json')
      .send(a)
      .end(function(err, response){
        console.log(response.text);
        var a = JSON.parse(response.text);

        if(a.status === 0) {
          alert(a.data);
        } else {

        }

        browserHistory.push('/follow');


     });
  }
  render() {


    return (
      <div></div>
      )
  }
}
export default Followuser;
