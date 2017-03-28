import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import {browserHistory} from 'react-router'



class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      phone: '',
      password: '',
      login_username: '',
      login_password: '',
      errormg : [],
      erroremail:'',
      lemailerror:'',
      lpassworderror:'',
      success :'',

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    // event.preventDefault();
    console.log(event.target);

    if(event.target.id === 'fname') {
      this.setState({ fname: event.target.value });
    } else if(event.target.id === 'lname') {
      this.setState({ lname: event.target.value });
    } else if(event.target.id === 'email') {
      this.setState({ email: event.target.value });
    } else if(event.target.id === 'phone') {
      this.setState({ phone: event.target.value });
    } else if(event.target.id === 'password') {
      this.setState({ password: event.target.value });
    } else if(event.target.id === 'login_username') {
      this.setState({ login_username: event.target.value });
    } else if(event.target.id === 'login_password') {
      this.setState({ login_password: event.target.value });
    }


  }

  handleRegister(event) {
    let self=this;
    event.preventDefault();
    let userLoginDetail = {fname : this.state.fname, lname : this.state.lname, email : this.state.email,phone : this.state.phone,password : this.state.password, };
    var a = JSON.stringify(userLoginDetail);
    console.log("This is print from frontend",JSON.stringify(userLoginDetail));
    // return fals  e;
    request
      .post('http://localhost:5000/')
      .set('Content-Type', 'application/json')
      .send(a)
      .end(function(err, res) {
        if(!err) {
          // console.log(res.text);
          const a = JSON.parse(res.text);
          const status = a.status;
          // console.log(status);
          if(status === 1) {
            console.log("-->",a.data);
            self.setState({success: a.data});
            // if(cookie.load('userId')) {
            //   console.log("cookie set previes")
            //   cookie.remove('userId', { path: '/' });
            // }
            // cookie.save('userId', a.user, { path: '/' });
            // // browserHistory.push('/dashboard');
          } if(status === 0) {
            self.setState({errormsg: a.data});
            // console.log(">",a.data);
            console.log("error msg is",self.state.errormsg);
          }
          if(status === 2) {
            self.setState({erroremail:a.data});
            // self.setState({errormsg: a.data});
            // console.log(">",a.data);
            console.log("error msg is",self.state.erroremail);
          }
        }
      });
  }

  handleLogin(event) {
    event.preventDefault();
    let userLoginDetail = {email : this.state.login_username, pas : this.state.login_password, };
    var a = JSON.stringify(userLoginDetail);
    // console.log("==>",a);
     request
      .post('http://localhost:5000/log')
      .set('Content-Type', 'application/json')
      .send(a)
      .end(function(err, res) {
        if(!err) {
          // console.log(res.text);
          const a = JSON.parse(res.text);
          const status = a.status;

          if(status === 4) {


          }
          if(status === 0) {
            alert(a.data)

          } if(status === 1) {
            alert(a.data)
          } if(status === 2) {
            alert(a.data)
          } if(status === 3) {
            cookie.remove('userId');
            cookie.save('userId', a.data, { path: '/' });
            // alert(a.data);
            console.log("cookie is :", cookie.load('userId'));
            browserHistory.push('/index');

          }
        }
      });



  }

  render() {

    const navstyle = {
      "backgroundColor" : "whitesmoke",
      "border" : "none",
    };

    var component;
    if (this.state.errormsg) {
      var er = this.state.errormsg;

      component = er.map(item => <li> {item.msg} </li>);
    }

    var successmsg;
    if(this.state.success) {
      successmsg = <div className="col-sm-12" style={{backgroundColor:"whitesmoke",color:"green",borderRadius:"10px",marginBottom:"20px",}}>
                {this.state.success}
              </div>;
    }
    var eremail;
    if(this.state.erroremail) {
      eremail = <div className="col-sm-12" style={{backgroundColor:"whitesmoke",color:"red",borderRadius:"10px",marginBottom:"20px",}}>
                  {this.state.erroremail}
                </div>;
    }

    var lemailerror = "";
    var lpassworderror = "";
  // var currentLocation = window.location.pathname;


    return (
      <div className="">
        <nav className="navbar navbar-inverse" style={navstyle}>
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/index">Twitter</a>
            </div>

            <div className="collapse navbar-collapse" id="myNavbar">

              <ul className="nav navbar-nav navbar-right">
                {(cookie.load('userId') ? <li className="active"><a href="/index">Home</a></li> : "" )}
                {(cookie.load('userId') ? <li><a href="/profile">Profile</a></li> :  "" )}
                {(cookie.load('userId') ? <li><a href="/follow">Follow</a></li> : "" )}
                {(cookie.load('userId') ? <li><a href="logout">Logout</a></li> : "" )}

                {(cookie.load('userId') ? "" : <li><a href="#" data-toggle="modal" data-target="#mysignup"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li> )}
                {(cookie.load('userId') ? "" : <li><a href="#" data-toggle="modal" data-target="#mylogin"><span className="glyphicon glyphicon-log-in"></span> Login</a></li> )}
              </ul>
            </div>
          </div>
        </nav>
      {/* login modal */}
      <div className="modal fade" id="mylogin" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{padding : "35px 50px",backgroundColor:"#5cb85c",color:"white !important",textAlign:"center",fontSize:"30px",}}>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4><span className="glyphicon glyphicon-lock"></span> Login</h4>
            </div>

            <div className="modal-body">
              <form role="form" onSubmit={this.handleLogin}>
                <div className="form-group">
                  <label htmlFor="usrname"><span className="glyphicon glyphicon-user"></span> E-Mail </label>
                  <input type="text" className="form-control" id="login_username" name="login_username" value={this.state.login_username} onChange={this.handleChange} placeholder="Enter email" />
                  {lemailerror}
                </div>
                <div className="form-group">
                  <label htmlFor="psw"><span className="glyphicon glyphicon-eye-open"></span> Password</label>
                  <input type="text" className="form-control" id="login_password" name="login_password" value={this.state.login_password} onChange={this.handleChange} placeholder="Enter password" />
                  {lpassworderror}
                </div>
                <div className="checkbox">
                  <label><input type="checkbox" value="" />Remember me</label>
                </div>
                <button type="submit" className="btn btn-success btn-block"><span className="glyphicon glyphicon-off"></span> Login</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    {/*Sign Up Modal*/}
    <div className="modal fade" id="mysignup" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{padding : "35px 50px",backgroundColor:"#5cb85c",color:"white !important",textAlign:"center",fontSize:"30px",}}>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4><span className="glyphicon glyphicon-user"></span> Signup</h4>
            </div>

            <div className="modal-body">
              <div className="col-sm-12" style={{backgroundColor:"whitesmoke",color:"red",borderRadius:"10px",marginBottom:"20px",}}>
                {component}
              </div>
              {eremail}
              {successmsg}
              <form role="form" onSubmit={this.handleRegister}>
                <div className="form-group">
                  <label htmlFor="fname"><span className="glyphicon glyphicon-user"></span> Firstname</label>
                  <input type="text" id="fname" name="fname" className="form-control" value={this.state.fname} onChange={this.handleChange}  placeholder="Enter Firstname" />
                </div>
                <div className="form-group">
                  <label htmlFor="lname"><span className="glyphicon glyphicon-user"></span> Lastname</label>
                  <input type="text" id="lname" name="lname" className="form-control" value={this.state.lname} onChange={this.handleChange}  placeholder="Enter Lastname" />
                </div>
                <div className="form-group">
                  <label htmlFor="email"><span className="glyphicons-envelope"></span> Email</label>
                  <input type="email" id="email"  className="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone"><span className="glyphicon glyphicons-envelope"></span> Phone Number</label>
                  <input type="text" id="phone"  className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="Enter Phone Number" />
                </div>
                <div className="form-group">
                  <label htmlFor="password"><span className="glyphicon glyphicons-envelope"></span> Password</label>
                  <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter password" />
                </div>

                <div className="checkbox">
                  <label><input type="checkbox" value="" />I Accept All Terms & Conditions</label>
                </div>
                <button type="submit" className="btn btn-success btn-block"><span className="glyphicon glyphicon-off"></span> Login</button>
                </form>

            </div>

          </div>
        </div>
      </div>
      </div>
      )
  }
}
export default Header;
