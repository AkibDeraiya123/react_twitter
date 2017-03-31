import React from 'react';
import Header from './component/header';
import request from 'superagent';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
// import multer from 'multer';
// import path from 'path';

// console.log("a==>",path.resolve(__dirname));

// const uploadTweet = multer({ dest: path.resolve(__dirname, '../public/images/tweet/') });


// import logo from './logo.svg';

class Index2 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newTweet: {
        description: '',
      },
      image: '',
      allTweet: [],
    };

    this.displayList = this.displayList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(event) {
    // event.preventDefault();
    // console.log(event.target.id, event.target.files[0]);

    if (event.target.id === 'description') {
      this.setState({
        newTweet: {
          description: event.target.value,
        },
      });
    }
    if (event.target.id === 'image') {
      this.setState({
        image: event.target.files[0],
      });
    }
  }

  handleRegister(event) {
    event.preventDefault();
    console.log(this.state);
    const coki = cookie.load('userId');
    const userLoginDetail = { ccomment: this.state.new_tweet, user: coki };
    console.log("This is print from frontend", JSON.stringify(userLoginDetail));

    request
      .post('http://localhost:5000/tweet')
      .type('form')
      .field('user', this.state.newTweet.description)
      .attach('image', this.state.image)
      .end(function (err, res) {
        console.log(res.text);
        const a = JSON.parse(res.text);
        if (a.status === 1) {
          alert(a.data);
        }
        if (a.status === 0) {
          alert(a.data);
        }
      });
  }

  componentWillMount() {
    const coki = cookie.load('userId');
    if (coki) {
    } else {
      browserHistory.push("/");
    }
    const self = this;
    const a = `http://localhost:5000/home/${cookie.load('userId')}`;
    request
      .get(a)
      .set('Content-Type', 'application/json')
      .end(function (err, response) {
        console.log(response.text);
        const a = JSON.parse(response.text);

        if (a.status === 0) {
          self.setState({ alltweet: a.data });
        } else {
          console.log("Data Not Found");
        }
      });
  }

  displayList(posts) {
    const list = posts.map((temp, index) => {
      const a = new Date(temp.timest);
      return (
        <div className="container" style={{ backgroundColor:"#F5F5F5", padding: "10px", marginTop: "10px" }}>
          <div className="tweetheader" style={{ marginBottom:"10px" }} >
            <b className="">{temp.fname} {temp.lname}</b>
            <b className="pull-right">{("0" + a.getDate()).slice(-2) } /{("0" + (a.getMonth() + 1)).slice(-2)}/{a.getFullYear()} {("0" + a.getHours()).slice(-2)}:{("0" + a.getMinutes()).slice(-2)}:{("0" + a.getSeconds()).slice(-2)}</b>
          </div>
          <div className="tweetcontent" style={{ textAlign: "justify" }} >
            {temp.tweet}
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
        <div className="container" style={{ backgroundColor: '#F5F5F5', padding: '10px' }}>
          <h4>Post New Tweet</h4>

          <form className="form-inline" onSubmit={this.handleRegister} encType="multipart/form-data">
            <div className="form-group" style={{ width: "100%" }}>
              <textarea style={{ width: '100%' }} className="form-control" id="description" name="description" value={this.state.newTweet.description} onChange={this.handleChange} placeholder="Enter Content of new tweet" />
            </div>
            <div className="form-group" style={{ width: '100%', marginTop: '10px' }}>
              <lable htmlFor="tweet_image">Upload Image</lable>
              <input style={{ width: '100%' }} className="" type="file" id="image" name="image" onChange={this.handleChange} placeholder="Enter Content of new tweet" />
              <progress min="0" max="100" value="0" id="progress"></progress>
            </div>
            <div className="form-group" style={{ marginTop: "10px", textAlign: "left", width: "100%" }}>
              <button type="submit" className="btn btn-primary" style={{ width: "20%" }}> Post</button>
            </div>
          </form>

        </div>
        {
          this.state.alltweet ? this.displayList(this.state.alltweet) : <div className="container" style={{ textAlign: 'center', marginTop: '10px', backgroundColor: '#F5F5F5', padding: '10px' }}><h4>Sorry ! There is no tweet to display</h4></div>
        }
      </div>
    );
  }
}

export default Index2;
