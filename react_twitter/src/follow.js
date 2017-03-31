import React from 'react';
import Header from './component/header';
import request from 'superagent';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class Follow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followUser: '',
      serachString: '',
    };

    this.displayList = this.displayList.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const coki = cookie.load('userId');
    if (coki) {
    } else {
      browserHistory.push("/");
    }

    const self = this;
    const a = `http://localhost:5000/follow/${cookie.load('userId')}`;
    request
      .get(a)
      .set('Content-Type', 'application/json')
      .end(function (err, response) {
        console.log(response.text);
        const a = JSON.parse(response.text);
        if (a.status === 0) {
          alert(a.data);
        } else {
          self.setState({ followUser: a.data });
        }
      });
  }

  handleChange(event) {
    const self = this;
    const coki = cookie.load('userId');
    const userDetail = { searchdata: event.target.value, user: coki };
    const a = JSON.stringify(userDetail);

    request
      .post('http://localhost:5000/searchUser')
      .set('Content-Type', 'application/json')
      .send(a)
      .end(function (err, response) {
        console.log(response.text);
        const a = JSON.parse(response.text);

        if (a.status === 0) {
          alert(a.data);
        } else {
          self.setState({ followUser: a.data });
        }
      });
  }

  displayList(posts) {
    const list = posts.map((temp, index) => {
      let profile = '';
      if (temp.profile) {
        profile = temp.profile;
      } else {
        profile = "default.png";
      }

      const photo = `http://localhost:5000/images/profile/${profile}`;
      const followurl = `/follow/${temp.user_id}`;
      return (
        <div className="col-md-4" >
            <div className="" style={{ backgroundColor: 'white', padding: '10px', margin: '5px' }}>
              <img alt="Profile" className="img-circle" height="40" width="40" src={photo} />
              <span> { temp.fname } { temp.lname }</span>
              <a href={followurl} className="btn btn-primary btn-large" style={{ marginTop: '0px', float: 'right' }}>Follow</a>
            </div>
        </div>
      );
    });
    return (list);
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="container " style={{ backgroundColor: '#F5F5F5', padding: '10px' }}>
          <h3 style={{ textAlign: 'center' }}>Follow This People</h3>
          <div style={{ marginBottom: '10px' }}>
            <form>
              <input className="form-control" type="text" name="search" id="search" onChange={this.handleChange} placeholder="Search user from Firstname..." />
            </form>
          </div>
          {
            this.state.followUser ? this.displayList(this.state.followUser) : <div className="container" style={{ textAlign: "center", marginTop: "10px", backgroundColor: "#F5F5F5", padding: "10px" }}><h4>Sorry ! There is no tweet to display</h4></div>
          }
        </div>
      </div>
    );
  }
}

export default Follow;
