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
      new_tweet:'',
      tweet_image:'',
      errorTweet : '',
      alltweet:'',
    }

    this.displayList = this.displayList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'new_tweet') {
      this.setState({ new_tweet: event.target.value });
    }
    if (event.target.id === 'tweet_image') {
      this.setState({ tweet_image: event.target.value });
    }
  }

  handleRegister(event) {
    const self=this;
    event.preventDefault();
    const coki =  cookie.load('userId');
    const userLoginDetail = { ccomment: this.state.new_tweet, user: coki };
    const a = JSON.stringify(userLoginDetail);
    request
      .post('http://localhost:5000/tweet')
      .set('Content-Type', 'application/json')
      .send(a)
      .end(function(err, res) {
          const a = JSON.parse(res.text);
          if(a.status === 2) {
            self.setState({errorTweet:a.data[0].msg,});
          }
          if(a.status === 1) {
            alert(a.data);
           location.reload();
          }
          if(a.status === 0) {
            alert(a.data);
          }
      });
  }

  componentWillMount() {
    const coki =  cookie.load('userId');
    if(coki) {
    } else {
      browserHistory.push("/");
   }
    const self = this;
    var a = `http://localhost:5000/home/${cookie.load('userId')}`;
    // alert(a);
    request
      .get(a)
      .set('Content-Type', 'application/json')
      .end(function(err, response){

        // console.log(response.text);
        var a = JSON.parse(response.text);

        if(a.status === 0) {
          self.setState({alltweet: a.data})
          // console.log(self.state.alltweet)
        } else {
            console.log("Data Not Found")
          }

     });
  }

  displayList(posts) {
    const list = posts.map((temp, index) => {
      // console.log(temp);
      let imageurl = "";
      const a = new Date(temp.timest)
      // console.log(temp.profile);
      // if(temp.profile != "null")
      if(temp.profile !== "null") {
        imageurl = "http://localhost:5000/images/profile/" + temp.profile;
      } else {
        imageurl = "http://localhost:5000/images/profile/default.png";

      }
      // console.log(imageurl);
      return (

          <div className="container" style={{backgroundColor:"#F5F5F5",padding: "10px",marginTop:"10px"}}>
            <div className="tweetheader" style={{ marginBottom:"10px"}} >
            <img src={imageurl} className="img-circle" style={{height:"30px",}} />
            &nbsp;
              <b className="">{temp.fname} {temp.lname}</b>
              <b className="pull-right ">{("0" + a.getDate()).slice(-2)}/{("0" + (a.getMonth() + 1)).slice(-2)}/{a.getFullYear()} {("0" + a.getHours()).slice(-2)}:{("0" + a.getMinutes()).slice(-2)}:{("0" + a.getSeconds()).slice(-2)}</b>
            </div>
            <div className="tweetcontent" style={{textAlign:"justify", }} >
              {temp.tweet}
            </div>
          </div>
      )
    });
    return (list);
  }

  render() {
    var ErrorTweet;
    if (this.state.errorTweet) {
      ErrorTweet = <span> {this.state.errorTweet} </span>;
    }

    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="container" style={{backgroundColor:"#F5F5F5",padding: "10px",}}>
          <h4>Post New Tweet</h4>

          <form className="form-inline" onSubmit={this.handleRegister}>
            <div className="form-group" style={{width:"100%",}}>
              <textarea style={{width:"100%"}} className="form-control" id="new_tweet" name="new_tweet" value={this.state.new_tweet} onChange={this.handleChange} placeholder="Enter Content of new tweet" />
              <li className="errorField">{ErrorTweet}</li>
            </div>
            {/*<div className="form-group" style={{width:"100%",marginTop:"10px",  }}>
              <lable htmlFor="tweet_image">Upload Image</lable>
              <input style={{width:"100%"}} className="" type="file" id="tweet_image" name="tweet_image" value={this.state.tweet_image} onChange={this.handleChange} placeholder="Enter Content of new tweet" />
            </div>*/}
            <div className="form-group" style={{marginTop:"10px",textAlign:"left",width:"100%"}}>
              <button type="submit" className="btn btn-primary" style={{width:"20%"}}> Post</button>
            </div>
          </form>

        </div>
        {
          this.state.alltweet ? this.displayList(this.state.alltweet) : <div className="container" style={{textAlign:"center",marginTop:"10px",backgroundColor:"#F5F5F5",padding: "10px",}}><h4>Sorry ! There is no tweet to display</h4></div>
        }
      </div>
    );
  }
}

export default Index2;
