const request = require('supertest');
const should = require('should');
const app = require('../app');


const data = {
      user_id: 19,
      fname:'this is fname',
      lname:'this is lname',
      phone: 1234567890,
      email: 'tesdyyut@improwised.com',
      password: 'test',
      unfollowUserId:'',
};

const ProfileUploadData = {
      fname:'this is fname1',
      lname:'this is lname1',
      phone: 9898989898,
      user: 19,
};

const logindata = {
      email: 'tesdyyut@improwised.com',
      pas: 'test',
};

const tweetData = {
  ccomment: "this is comment",
  user: 20,
}

const followNewUser = {
  follower:19,
  follow:20,
}

const searchUserData = {
  searchdata:'a',
  user:20,
}

describe('POST/', function () {
  it('This is for Register New User', (done) => {
    request(app)
    .post('/')
    .send(data)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        res.status.should.be.equal(200);
        done();
      }
    });
  });
});

describe('POST/log', function () {
  it('This is for login user', (done) => {
    request(app)
    .post('/log')
    .send(logindata)
    .expect(201)
    .end((err, res) => {
      (res.status.should.be.equal(201));
      done();
      });
    });
  });


describe('POST/tweet', function () {
  it('This is for Create New Tweet', (done) => {
    // console.log("=====",data.data.user_id);
    request(app)
    .post('/tweet')
    .send(tweetData)
    .expect(201)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        res.status.should.be.equal(201);
        done();
      }
    });
  });
});

describe('POST/ProfileUpload', function () {
  it('This is for Upload User Detail', (done) => {
    request(app)
    .post('/ProfileUpload')
    .send(ProfileUploadData)
    .expect(201)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        res.status.should.be.equal(201);
        done();
      }
    });
  });
});

describe('POST/follow', function () {
  it('This is for Follow User', (done) => {
    request(app)
    .post('/follow')
    .send(followNewUser)
    .expect(201)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        data.unfollowUserId = res.body.data;
        res.status.should.be.equal(201);
        done();
      }
    });
  });
});

describe('POST/searchUser', function () {
  it('This is for Follow User User', (done) => {
    request(app)
    .post('/searchUser')
    .send(searchUserData)
    .expect(201)
    .end((err, res) => {
      if (err) {
        done(err);
      } else {
        res.status.should.be.equal(201);
        done();
      }
    });
  });
});

describe('GET/profile/19', function () {
  it('it should response user detail page', (done) => {
    this.timeout(1000);
    setTimeout(done, 300);
    request(app)
    .get('/profile/19')
    .expect('Content-type', '/json/')
    .end(function (err, res) {

      res.status.should.be.equal(200);
      done();
    });
  });
});

describe('GET/home/19', function () {
  it('it should response user home page detail.', (done) => {
    this.timeout(1000);
    setTimeout(done, 300);
    request(app)
    .get('/home/19')
    .expect('Content-type', '/json/')
    .end(function (err, res) {

      res.status.should.be.equal(200);
      done();
    });
  });
});

describe('GET/follow/19', function () {
  it('it should response user follow list.', (done) => {
    this.timeout(1000);
    setTimeout(done, 300);
    request(app)
    .get('/follow/19')
    .expect('Content-type', '/json/')
    .end(function (err, res) {

      res.status.should.be.equal(200);
      done();
    });
  });
});

describe('GET/unfollow/' + data.unfollowUserId, function () {
  it('it should response unfollow user.', (done) => {
    this.timeout(1000);
    setTimeout(done, 300);
    request(app)
    .get('/unfollow/' + data.unfollowUserId)
    .expect('Content-type', '/json/')
    .end(function (err, res) {

      res.status.should.be.equal(200);
      done();
    });
  });
});

