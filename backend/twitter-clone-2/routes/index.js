const express = require('express');
const multer = require('multer');
const path = require('path');
const DB = require('../helpers/db');
const nodemailer = require('nodemailer');
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'akib@improwised.com',
    pass: 'akib@improwised',
  },
});

const upload = multer({ dest: path.resolve(__dirname, '../public/images/profile/') });
const uploadTweet = multer({ dest: path.resolve(__dirname, '../public/images/tweet/') });
const router = express.Router();


router.post('/forgot', (req, res, next) => {
  const email = req.body.emailforgot;
  const query = DB.builder()
    .select()
    .from('registration')
    .where('email = ?', email)
    .toParam();
  // console.log(query);
  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }
    // console.log(results.rows);
    if(results.rows.length > 0) {
      const id = crypto.randomBytes(10).toString('hex');

      const query1 = DB.builder()
        .update()
        .table('registration')
        .set('forgot_string', id)
        .where('email = ?', email)
        .toParam();
      DB.executeQuery(query1, (error1, results1) => {
        if (error1) {
          console.log(error1);
          next(error1);
          return;
        }
      });

      const link = '<a href="http://localhost:3000/forgotpas/?m='+email+'&&random='+id+'">Click Here For Change Your Account Password</a>';
      const maildata = {
        from: 'abcd@gmail', // sender address
        to: email, // list of receivers
        subject: 'Change Your Account Password', // Subject line
        html: link, // html body
      };

      // send mail with defined transport object
      transporter.sendMail( maildata, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Message %s sent: %s', info.messageId, info.response);
        }
      });
      res.send('1');
    } else {
      res.send('0');
    }

  })
});

//
router.get('/forgotpas', (req, res, next) => {
  var user_email = req.param('m');
  var token = req.param('random');
  const query = DB.builder()
    .select()
    .from("registration")
    .where("email = ? AND forgot_string= ? ", user_email, token)
    .toParam();
   DB.executeQuery(query, (error, results) => {
    if (error) {
      console.log(error);
      next(error);
      return;
    }

    if(results.rows.length > 0){
      return res.render('forgot',{
        title: 'Forgot Password',
        msgchange: 'Change Your Password',
        email: token,
      });
    } else {
      return res.render('Login',{
        title: 'Login',
        msgforgote: 'Sorry Your Password Forgot Link Wrong',
      })
    }
  });
});
//

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {

      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
});

router.get('/follow/:userid', (req, res, next) => {
  const result = { 'status': '', 'msg': '', 'data': '', };
  const user = req.params.userid;
  const query1 = DB.builder()
    .select()
    .from('registration')
    .where('user_id != ? AND user_id NOT IN ?', user, DB.builder().select().field('follower_id').from('follow').where('follow_id = ?', user))
    .toParam();

  DB.executeQuery(query1, (error, results) => {
    // console.log(results);
    if (error) {
      result['status'] = 0;
      result['msg'] = "Error";
      result['data'] = "Something Went Wrong ! Please Try Again";
      res.status(200).send(result);
      return;
    } else {
      result['status'] = 1;
      result['msg'] = "Found";
      result['data'] = results.rows;
      res.status(200).send(result);
      return;
    }
  });
});

router.post('/searchUser', (req, res, next) => {
  const result = { 'status': '', 'msg': '', 'data': '', };
  const user = req.body.user;
  const serachuser = "%" + req.body.searchdata + "%";

  const query1 = DB.builder()
    .select()
    .from('registration')
    .where('user_id != ? AND user_id NOT IN ? AND fname like ?', user, DB.builder().select().field('follower_id').from('follow').where('follow_id = ?', user),serachuser)
    .toParam();

  DB.executeQuery(query1, (error, results) => {

    if (error) {
      result['status'] = 0;
      result['msg'] = "Error";
      result['data'] = "Something Went Wrong ! Please Try Again";
      res.status(201).send(result);
      return;
    } else {
      result['status'] = 1;
      result['msg'] = "Found";
      result['data'] = results.rows;
      res.status(201).send(result);
      return;
    }
  });
});

router.post('/follow', (req, res, next) => {
  var result = {"status":"","msg":"","data":"",};
  const follower = req.body.follower;
  const follow = req.body.follow;
  const query = DB.builder()
    .insert()
    .into('follow')
    .set('follower_id', follower)
    .set('follow_id', follow)
    .toParam();

  DB.executeQuery(query, (error, results) => {
    if (error) {
      result['status'] = 0;
      result['msg'] = 'Error';
      result['data'] = "Something Went Wrong Please Try Again";
      res.status(201).send(result);
      return;
    }

    const query1 = DB.builder()
      .select()
      .from('follow')
      .order("id", false)
      .limit(1)
      .toParam();

    DB.executeQuery(query1, (error, results) => {
      if (error) {
        next(error);
        return;
      }

      result['status'] = 1;
      result['msg'] = 'Success';
      result['data'] = results.rows[0].id;
      console.log(result);
      res.status(201).send(result);

    });


    return;

  });
});

router.get('/unfollow/:userid', (req, res, next) => {
  // if (!req.session.mail) {
  //   return res.redirect('/home');
  // }
  // console.log(req.params.userid);
  var result = {"status":"","msg":"","data":"",};

  const follower = req.params.userid;
  const query = DB.builder()
    .delete()
    .from('follow')
    .where('id = ?', follower)
    .toParam();

  DB.executeQuery(query, (error, results) => {
    if (error) {
      result['status'] = 0;
      result['msg'] = 'Error';
      result['data'] = "Something Went Wrong Please Try Again";
      res.status(200).send(result);
      return;
    }

    result['status'] = req.session.user_id;
    result['msg'] = 'Success' + req.session.user_id;
    result['data'] = "You are Successfully follow";
    res.status(200).send(result);
    return;

  });
});

// view profile start
router.get('/viewprofile/:userid', (req, res, next) => {
  // console.log(req.params.userid);
  // return false;
  if (!req.session.mail) {
    return res.redirect('/home');
  }

  let follow = '';
  let tweet = '';
  const query = DB.builder()
    .select()
    .field('fname')
    .field('lname')
    .field('tweet')
    .field('profile')
    .field('post_image')
    .field('timest')
    .from('registration', 'r')
    .join(DB.builder().select().from('user_tweet'), 'u', 'r.user_id = u.user_id')
    .where('r.activation_number = ?', req.params.userid)
    .order('timest', false)
    .toParam();

  DB.executeQuery(query, (error, tweets) => {
    if (error) {
      next(error);
      return;
    }

    const query1 = DB.builder()
    .select()
    .field('user_id')
    .from('registration')
    .where('activation_number = ?', req.params.userid)
    .toParam();

    DB.executeQuery(query1, (error, userid) => {
    if (error) {
      next(error);
      return;
    }
    // console.log(userid.rows);

    const query2 = DB.builder()
      .select()
      .field('fname')
      .field('lname')
      .field('profile')
      .field('follower_id')
      .field('id')
      .from('registration', 'r')
      .join(DB.builder().select().from('follow'), 'f', 'r.user_id = f.follower_id')
      .where('f.follow_id = ?', userid.rows[0].user_id)
      .toParam();
    // console.log(query2);


    DB.executeQuery(query2, (error1, followers) => {
      if (error1) {
        next(error1);
        return;
      }

      const profileQuery = DB.builder()
        .select()
        .from('registration')
        .where('activation_number = ?', req.params.userid)
        .toParam();

      DB.executeQuery(profileQuery, (error2, profile) => {
        if (error2) {
          next(error2);
          return;
        }

        // console.log(followers.rows);

        follow = followers.rows;
        tweet = tweets.rows;
        const name = profile.rows[0].fname + profile.rows[0].lname;
        const email = profile.rows[0].email;
        const profilePhoto = profile.rows[0].profile;

        res.render('viewprofile', {
          title: 'Profile',
          tweet1: tweet,
          follow1: follow,
          profileData: profile.rows[0],
          name,
          email,
          profile: profilePhoto,
        });
      });
    });
  });
  });
});

// view profile end



router.get('/profile/:userid', (req, res, next) => {
  // console.log("called");
  // if (!req.session.mail) {
  //   return res.redirect('/login');
  //   return false;
  // }
  // console.log("hello");

  var result = {"status":"","msg":"","tweet":"","follower":"","name":"","fname":"","lname":"","email":"","phone":"","profilePhoto":"",};

  const user = req.params.userid;
  // console.log("=>userid is:", user);
  let follow = '';
  let tweet = '';
  const query = DB.builder()
    .select()
    .field('fname')
    .field('lname')
    .field('tweet')
    .field('profile')
    .field('post_image')
    .field('timest')
    .from('registration', 'r')
    .join(DB.builder().select().from('user_tweet'), 'u', 'r.user_id = u.user_id')
    .where('u.user_id = ?', user)
    .order('timest', false)
    .toParam();

  DB.executeQuery(query, (error, tweets) => {
    if (error) {
      next(error);
      return;
    }
    // console.log("called");

    const query1 = DB.builder()
      .select()
      .field('fname')
      .field('lname')
      .field('profile')
      .field('follower_id')
      .field('id')
      .from('registration', 'r')
      .join(DB.builder().select().from('follow'), 'f', 'r.user_id = f.follower_id')
      .where('follow_id = ?', user)
      .toParam();
      // console.log(query1);
    DB.executeQuery(query1, (error1, followers) => {
      // console.log(followers);

      if (error1) {
        next(error1);
        return;
      }
  // console.log("called");

      const profileQuery = DB.builder()
        .select()
        .from('registration')
        .where('user_id = ?', user)
        .toParam();

      DB.executeQuery(profileQuery, (error2, profile) => {
        if (error2) {
          next(error2);
          return;
        }

        // console.log(profile.rows);
  // console.log("called");

        follow = followers.rows;
        tweet = tweets.rows;
        const name = profile.rows[0].fname +" "+ profile.rows[0].lname;
        const email = profile.rows[0].email;
        let profilePhoto = "";
        if(profile.rows[0].profile == "")
        {
          profilePhoto = '';
        } else {
          profilePhoto="http://localhost:5000/images/profile/"+profile.rows[0].profile;
        }
        result['status'] = 0;
        result['msg'] = 'Data found';
        result['tweet'] = tweet;
        result['follower'] = follow;
        result['name'] = name;
        result['profilePhoto'] = profilePhoto;

        result['fname'] = profile.rows[0].fname;
        result['lname'] = profile.rows[0].lname;
        result['email'] = profile.rows[0].email;
        result['phone'] = profile.rows[0].phone_no;

        // consolo.log("this is type",typeof(result));

        res.status(200).send(result);
        return;

      });
    });
  });
});

router.get('/home/:userid', (req, res, next) => {
  // if (!req.session.mail) {
  //   return res.redirect('/login');
  // }
 const user = req.params.userid;
 var result = {"status":"","msg":"","data":"","userid":""};


  const query = DB.builder()
    .select()
    .field('fname')
    .field('lname')
    .field('tweet')
    .field('activation_number')
    .field('profile')
    .field('timest')
    .field('post_image')
    .from('registration', 'r')
    .join(DB.builder().select().from('user_tweet'), 'u', 'r.user_id = u.user_id')
    .where('u.user_id IN ? OR u.user_id= ? ', (DB.builder().select().field('follower_id').from('follow').where('follow_id = ?',user /*req.session.user_id*/)),user /*req.session.user_id*/)
    .order('timest', false)
    .toParam();

  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }

    if(results.rows.length > 0){
      result['status'] = 0;
      result['msg'] = "Data Found";


    result['data'] = results.rows;
    result['userid'] = req.session.user_id;

    res.status(200).send(result);
    }


  });
});

router.get('/active', (req, res, next) => {
  var user_email = req.param('m');
  var token = req.param('random');
  // console.log("user email => ", user_email);
  // console.log("user Random Number  => ", token);
  const query = DB.builder()
    .select()
    .from("registration")
    .where("email = ? AND activation_number= ? ", user_email, token)
    .toParam();
   DB.executeQuery(query, (error, results) => {
    if (error) {
      console.log(error);
      next(error);
      return;
    }

    if(results.rows.length > 0){
      const query1 = DB.builder()
        .update()
        .table('registration')
        .set('activation_status', '1')
        .where('email = ?', user_email)
        .toParam();
      DB.executeQuery(query1, (error, results) => {
        if (error) {
          console.log(error);
          next(error);
          return;
        }
      });
      // console.log(query1);

      return res.render('login',{
        title: 'Login',
        msglogin: 'Your Activation Successfully Done. Now You CAn Login',
      });
    } else {
      return res.render('Login',{
        title: 'Login',
        msg: 'Sorry Your Activation Link Wrong',
      })
    }
  });
});

router.post('/', upload.single('profile'), (req, res, next) => {
  // console.log(req.body);
  // console.log("fname",req.body.fname);
  // return false;
  let id = crypto.randomBytes(10).toString('hex');
  var result = {"status":"","msg":"","data":""};

  req.checkBody('fname', 'Username is required').notEmpty();
  req.check('phone', 'Mobile No is required').notEmpty();
  req.check('phone', 'Mobile No is Numeric Accept Only').isInt();
  req.check('lname', 'Email is required').notEmpty();
  req.check('email', 'Email is not valid').isEmail();
  req.check('password', 'Password is required').notEmpty();
  var errors = req.validationErrors();

  if (errors) {
    result['status'] = 0;
    result['msg'] = "There is require field";
    result['data'] = errors;

    res.send(JSON.stringify(result));
    } else {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const pas = req.body.password;
    const phone = req.body.phone;


    const query = DB.builder()
      .insert()
      .into('registration')
      .set('fname', fname)
      .set('lname', lname)
      .set('email', email)
      .set('password', pas)
      .set('phone_no', phone)
      .set("activation_status",1)
      .set('activation_number', id)
      .toParam();
    // console.log(query);


    DB.executeQuery(query, (error, results) => {
      if (error) {
          result['status'] = 2;
          result['msg'] = "email already exist";
          result['data'] = "Email Already Exist. Please Enter Valid Email Address";
          res.send(result);
          return;
      }

      result['status'] = 1;
      result['msg'] = "Inserted";
      result['data'] = "Data Inderted Successfully";
      res.status(200).send(result);
    });
  }
});

router.post('/log', (req, res, next) => {
  var result = {"status":"","msg":"","data":""};


  req.check('pas', 'Password is required').notEmpty();
  req.check('email', 'Email is not valid').isEmail();
  req.checkBody('email', 'E-Mail is required').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    result['status'] = 4;
    result['msg'] = "There is require field";
    result['data'] = errors;
    res.send(result);
    return;
  };

  const email = req.body.email;
  const pas = req.body.pas;




  const query = DB.builder()
    .select()
    .from('registration')
    .where('email= ? AND password=?', email, pas)
    .toParam();

  DB.executeQuery(query, (error, results) => {
    if (error) {
      result['status'] = 0;
      result['msg'] = "Error";
      result['data'] = "Sorry Something Went Wrong ! Please Try Again";
      res.send(result);
    }

    if(results.rows) {
      if (results.rows.length > 0) {
        const query1 = DB.builder()
          .select()
          .from('registration')
          .where('email= ? AND activation_status=?', email,1)
          .toParam();

        DB.executeQuery(query1, (error1, check) => {
          if (error1) {
            result['status'] = 0;
            result['msg'] = "Error";
            result['data'] = "Sorry Something Went Wrong ! Please Try Again";
            res.status(201).send(result);
          }

        if(check.rows.length > 0) {
            let sess = '';
            sess = req.session;
            req.session.mail = email;
            req.session.user_id = results.rows[0].user_id;

            result['status'] = 3;
            result['msg'] = "Success";
            result['data'] = results.rows[0].user_id;
            res.status(201).send(result);
          } else {

            result['status'] = 1;
            result['msg'] = "Not Active";
            result['data'] = "Your Login id and password is correct. But You have not active your account. Please active your account.";
            res.status(201).send(result);


          };
        });
      } else {
        result['status'] = 2;
        result['msg'] = "Wrong";
        result['data'] = "Your Email Or Password Wrong.";
        res.status(201).send(result);

      }
    }
  });
});


router.post('/ProfileUpload', upload.single('profile'), (req, res, next) => {
  var result = {"status":"","msg":"","data":""};

  req.check('fname', 'Firstname Required').notEmpty();
  req.check('lname', 'Lastname Required').notEmpty();
  req.checkBody('phone', 'Enter Valide 10 Digit Phone Number').len(10);
  req.checkBody('phone', 'Phone Number is accept only digit').isInt();
  req.checkBody('phone', 'Phone Number Required').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    result['status'] = 2;
    result['msg'] = "There is require field";
    result['data'] = errors;
    res.status(201).send(result);
    return;
  };

  // console.log(req.body);
  query = DB.builder()
    .update()
    .table('registration')
    .set('fname', req.body.fname)
    .set('lname', req.body.lname)
    .set('phone_no', req.body.phone)
    .where('user_id = ?', req.body.user)
    .toParam();

  DB.executeQuery(query, (error, results) => {
    if (error) {
      result['status'] = 0;
      result['msg'] = "Error";
      result['data'] = "Please Try Again There is some problem. Please Make sure that all field is required and phone number must be a number only.";
      res.status(201).send(result);
      return;
    }
    result['status'] = 1;
    result['msg'] = "Success";
    result['data'] = "Congretulation ! Your Profile is updated";
    res.status(201).send(result);
    return;
  });
});

router.post('/tweet', (req, res, next) => {
  var result = {"status":"","msg":"","data":""};

  req.checkBody('ccomment', 'Comment is required').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    result['status'] = 2;
    result['msg'] = "There is require field";
    result['data'] = errors;

    res.send(JSON.stringify(result));
    return;
    }

  console.log(req.body);
  const msg = req.body.ccomment;
  const userid = req.body.user;

  const query = DB.builder()
    .insert()
    .into('user_tweet')
    .set('user_id', userid)
    .set('tweet', msg)
    .toParam();

  DB.executeQuery(query, (error, results) => {
    if (error) {
      result['status'] = 0;
      result['msg'] = "Error";
      result['data'] = "There is some error please try again";
      res.status(201).send(result);
      return;

    }
    result['status'] = 1;
    result['msg'] = "Submitter";
    result['data'] = "Congretulation ! Your Tweet Added Successfully";
    res.status(201).send(result);
    return;

  });
});

router.post('/forgotPassword', uploadTweet.single('profile'), (req, res, next) => {

  const email = req.body.usermail;
  const password = req.body.pas;

  const query = DB.builder()
    .update()
    .table('registration')
    .set('password', password)
    .where('forgot_string = ?', email)
    .toParam();
  // console.log(query);
  DB.executeQuery(query, (error, results) => {
    if (error) {
      console.log(error);
      next(error);
      return;
    }

    res.redirect('/login');
  });
});

module.exports = router;
