const request = require('supertest');
const should = require('should');
const app = require('../app.js');
// let describe;
// let it;
describe('GET /home/1', () => {
  it('it should response reg.pug page', (done) => {
    // the request-object is the supertest top level api
    request(app)
      .get('/reg')
      .expect('Content-type', 'text/html; charset=utf-8')
      .expect(200, done); // note that we're passing the done as parameter to the expect
  });
});

describe('GET /home', () => {
  it('it should response home.pug page', (done) => {
    request(app)
      .get('/home')
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(302, done);
  });
});

describe('GET /profile', () => {
  it('it should response profile.pug page', (done) => {
    request(app)
      .get('/profile')
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(302, done);
  });
});

describe('GET /follow', () => {
  it('it should response follow.pug page', (done) => {
    request(app)
      .get('/follow')
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(302, done);
  });
});

describe('GET /logout', () => {
  it('it should response logout.pug page', (done) => {
    request(app)
      .get('/logout')
      .expect(302, done);
  });
});

describe('GET /follow/1', () => {
  it('it should response follow.pug page', (done) => {
    request(app)
      .get('/follow/1')
      .expect(302, done);
  });
});

describe('GET /unfollow/1', () => {
  it('it should response follow.pug page', (done) => {
    request(app)
      .get('/follow/1')
      .expect(302, done);
  });
});

describe('POST /ProfileUpload', () => {
  it('it should response home.pug page', (done) => {
    const register = {
      profile: 'default.jpg',
    };
    request(app)
      .post('/ProfileUpload')
      .send(register)
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(302)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
  });
});

describe('POST /', () => {
  it('it should response home.pug page', (done) => {
    // the request-object is the supertest top level api
    const register = {
      fname: 'Akib',
      lname: 'Deraiya',
      phone_no: 973734772,
      email: 'akibderaiya12@gmail.com',
      password: 'akib',
      cpassword: 'akib',
      profile: 'default.jpg',
    };
    request(app)
      .post('/')
      .send(register)
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(302)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
  });
});

describe('POST /log', () => {
  it('it should response home.pug page', (done) => {
    // the request-object is the supertest top level api
    const register = {
      email: 'akibderaiya12@gmail.com',
      pas: 'akib',

    };
    request(app)
      .post('/log')
      .send(register)
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(302)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
  });
});

describe('POST /tweet', () => {
  it('it should response home.pug page', (done) => {
    // the request-object is the supertest top level api
    const register = {
      ccomment: 'This is Tweet For TestCase',
      profile: 'default.png',

    };
    request(app)
      .post('/tweet')
      .send(register)
      .expect('Content-type', 'text/plain; charset=utf-8')
      .expect(302)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.status.should.be.equal(302);
          done();
        }
      });
  });
});
