import React from 'react';
import Header from './component/header';
import request from 'superagent';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';



class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      new_tweet:'',
      alltweet:'',
      profileUserName:'',
      profilePic:'',
      follower:'',
      fname:'',
      lname:'',
      phone:'',
      email:'',
      errorTweet : '',
      errorFname:'',
      errorLname:'',
      errorPhone:'',



    }

    this.displayList = this.displayList.bind(this);
    this.displayFollowerList = this.displayFollowerList.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

  }

  handleChange(event) {
    console.log(event.target);

    if(event.target.id === 'new_tweet') {
      this.setState({ new_tweet: event.target.value });
    }
    if(event.target.id === 'fname') {
      this.setState({ fname: event.target.value });
    }
    if(event.target.id === 'phone') {
      this.setState({ phone: event.target.value });
    }
    if(event.target.id === 'lname') {
      this.setState({ lname: event.target.value });
    }
  }

  handleRegister(event) {
    let self = this;
    event.preventDefault();
    var coki =  cookie.load('userId');
    let userLoginDetail = {ccomment : this.state.new_tweet,user:coki,};
    var a = JSON.stringify(userLoginDetail);
    // console.log("This is print from frontend",JSON.stringify(userLoginDetail));
    request
      .post('http://localhost:5000/tweet')
      .set('Content-Type', 'application/json')
      .send(a)
      .end(function(err, res) {
          // console.log(res.text);
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

  handleUpload(event) {
    let self = this;
    event.preventDefault();
    var coki =  cookie.load('userId');
    let userDetail = {fname : this.state.fname,lname:this.state.lname,phone: this.state.phone,user:coki,};
    var a = JSON.stringify(userDetail);
    console.log("This is print from frontend",JSON.stringify(userDetail));
    request
      .post('http://localhost:5000/ProfileUpload')
      .set('Content-Type', 'application/json')
      .send(a)
      .end(function(err, res) {
          console.log(res.text);
          const a = JSON.parse(res.text);

          if(a.status === 2) {
            // console.log("this os")
            // console.log("abcd",this.state.errorFname);
            let data = a.data;
            data.map(function(item) {

              if(item.param === "fname") {
                // console.log(item);
                self.setState({errorFname: item.msg,});
              }
              if(item.param === "lname") {
                  self.setState({errorLname:item.msg,});
              }
              if(item.param === "phone") {
                  self.setState({errorPhone:item.msg,});
              }
              // return true;
            });
            // console.log("abcd",self.state.errorFname);
            // console.log(self.state.errorLname);
            // console.log(self.state.errorPhone);

          }

          if(a.status === 1) {
           location.reload();
          }
          if(a.status === 0) {
            alert(a.data);
          }
      });
  }

   componentWillMount() {
    var coki =  cookie.load('userId');
    if(coki) {
    } else {
      browserHistory.push("/");
   }
    let self = this;
    var a = `http://localhost:5000/profile/${cookie.load('userId')}`;

    request
      .get(a)
      .set('Content-Type', 'application/json')
      .end(function(err, response){
        // console.log(response.text);
        // return false;
        var a = JSON.parse(response.text);

        if(a.status === 0) {
          self.setState({alltweet: a.tweet});
          self.setState({profileUserName: a.name});
          self.setState({profilePic: a.profilePhoto});
          self.setState({follower: a.follower});

          self.setState({fname: a.fname});
          self.setState({lname: a.lname});
          self.setState({email: a.email});
          self.setState({phone: a.phone});



          // console.log(self.state.alltweet)
        } else {
            console.log("Data Not Found")
          }

     });
  }

   displayList(posts) {
    const list = posts.map((temp, index) => {
      const a = new Date(temp.timest);

      return (

          <div className="tweetall" style={{padding: "10px",marginTop:"10px"}}>
            <div className="tweetheader" style={{ marginBottom:"10px"}} >
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

  displayFollowerList(posts) {
   const list = posts.map((temp, index) => {
      let profile = '';
      if(temp.profile) {
        profile = temp.profile;
      } else {
        profile = "default.png";
      }

      var photo = `http://localhost:5000/images/profile/${profile}`;
      var followurl = `/unfollow/${temp.id}`;
      return (

          <div className="col-md-4" >
            <div className=""  style={{backgroundColor:'white',padding:'10px',margin:'5px',}}>
              <img alt="Profile" className="img-circle" height="40" width="40" src={photo}  />
              <span>  {temp.fname} {temp.lname}</span>
              <br/>

              <div className="" style={{textAlign:'center',}}>
                <a href={followurl} className="btn btn-primary btn-large" style={{marginTop:'10px'}}>Unfollow</a>
              </div>
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

    var firstnameError = "";
    var lastnameError = "";
    var phonenumberError = "";
    var displayUserDetail = "";

    if (this.state.errorFname) {
      firstnameError = <span> {this.state.errorFname} </span>;
    }
    if (this.state.errorLname) {
      lastnameError = <span> {this.state.errorLname} </span>;
    }

    if (this.state.errorPhone) {
      phonenumberError = <span> {this.state.errorPhone} </span>;
    }

    displayUserDetail =
      <div className="table-responsive container">
        <div className="col-md-12" style={{textAlign:"center",}}>
          <h4>Update Your Profile</h4>
        </div>

        <form className="form-inline" onSubmit={this.handleUpload}>
          <div className="form-group" style={{width:"100%",}}>
          <label htmlFor="fname">
           Firstname
          </label>
          <input onChange={this.handleChange} style={{width:"100%"}} type="text" id="fname" name="fname" className="form-control" value={this.state.fname} placeholder="Enter Firstname" />
          <li className="errorField" style={{color:'red',listStyle:'none',}}>{firstnameError}</li>

        </div>
        <div className="form-group" style={{width:"100%",}}>
          <label htmlFor="fname">
           Lastname
          </label>
          <input onChange={this.handleChange} style={{width:"100%"}} type="text" id="lname" name="fname" className="form-control" value={this.state.lname} placeholder="Enter Firstname" />
          <li className="errorField" style={{color:'red',listStyle:'none',}}>{lastnameError}</li>
        </div>
         <div className="form-group" style={{width:"100%",}}>
          <label htmlFor="fname">
           Phone Number
          </label>
          <input onChange={this.handleChange} style={{width:"100%"}} type="text" id="phone" name="fname" className="form-control" value={this.state.phone} placeholder="Enter Firstname" />
          <li className="errorField" style={{color:'red',listStyle:'none',}}>{phonenumberError}</li>

        </div>
        <div className="form-group" style={{marginTop:"10px",textAlign:"center",width:"100%"}}>
          <button type="submit" className="btn btn-primary" style={{width:"%"}}> Update Profile</button>
        </div>
        </form>


      </div>
    ;


    return (
      <div>
        <div>
          <Header />
        </div>


        <div className="container profilecover">
          <div className="img-responsive col-md-12" >

            <img alt="This is profile pic"  src={this.state.profilePic}   /></div>
          <div className="col-md-12" >
            <h3 style={{textAlign:"center",}}>{this.state.profileUserName}</h3>
            <h5 style={{textAlign:"center",}}>{this.state.email}</h5>
            <h5 style={{textAlign:"center",}}>+91 {this.state.phone}</h5>

            <div className="col-md-12">
              <div className="col-md-4" style={{textAlign:"center",}} >
                <h4>{this.state.alltweet.length}</h4>
                <span>Tweet</span>
              </div>
              <div className="col-md-4" style={{textAlign:"center",}}>
                <h4>{this.state.follower.length}</h4>
                <span>Follower</span>
              </div>
              <div className="col-md-4" style={{textAlign:"center",}}>
                <h4>100</h4>
                <span>Following</span>
              </div>
            </div>
          </div>

        </div>

        <div className="container" style={{backgroundColor:"#F5F5F5",padding: "10px",margin:"10px auto"}}>
          <h4>Post New Tweet</h4>

          <form className="form-inline" onSubmit={this.handleRegister}>
            <div className="form-group" style={{width:"100%",}}>
              <textarea style={{width:"100%"}} className="form-control" id="new_tweet" name="new_tweet" value={this.state.new_tweet} onChange={this.handleChange} placeholder="Enter Content of new tweet" />
              <li className="errorField">{ErrorTweet}</li>
            </div>
            <div className="form-group" style={{marginTop:"10px",textAlign:"left",width:"100%"}}>
              <button type="submit" className="btn btn-primary" style={{width:"20%"}}> Post</button>
            </div>
          </form>

        </div>
        <div className="container" style={{backgroundColor:"#F5F5F5",padding: "10px",margin:"10px auto"}}>
        <ul className="nav nav-tabs col-md-12">
          <li className="active col-md-4"><a data-toggle="tab" href="#home">Timeline</a></li>
          <li className="col-md-4"><a data-toggle="tab" href="#menu1">Follower</a></li>
          <li className="col-md-4"><a data-toggle="tab" href="#menu2">Update Profile</a></li>
        </ul>

        <div className="tab-content">
          <div id="home" className="tab-pane fade in active">
            {
              this.state.alltweet ? this.displayList(this.state.alltweet) : <div className="container" style={{textAlign:"center",marginTop:"10px",backgroundColor:"#F5F5F5",padding: "10px",}}><h4>Sorry ! There is no tweet to display</h4></div>
            }
          </div>
          <div id="menu1" className="tab-pane fade">
            {
              this.state.follower ? this.displayFollowerList(this.state.follower) : <div className="container" style={{textAlign:"center",marginTop:"10px",backgroundColor:"#F5F5F5",padding: "10px",}}><h4>Sorry ! There is no tweet to display</h4></div>
            }
          </div>
          <div id="menu2" className="tab-pane fade">
            {displayUserDetail}
          </div>
        </div>
        </div>



      </div>
    );
  }
}

export default Profile;
