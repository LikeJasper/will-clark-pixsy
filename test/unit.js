var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');

var getLogin = require('../routes/login/getLogin');
var postLogin = require('../routes/login/postLogin');

var VALID_EMAIL_AND_VALID_PASSWORD = {email: 'ansel@adams.com', password: 'Yosemite'};
var VALID_EMAIL_AND_INVALID_PASSWORDS = [
  {email: 'ansel@adams.com', password: ''},
  {email: 'ansel@adams.com', password: 'yosemite'},
  {email: 'ansel@adams.com', password: 'YOSEMITE'},
  {email: 'ansel@adams.com', password: 'punk65'},
  {email: 'ansel@adams.com'}
];
var INVALID_EMAILS = [
  {email: 'ansel@adams.co.uk', password: 'password'},
  {email: 'ansel@adams.co.uk', password: ''},
  {email: 'ansel@adams.co.uk', password: 'Yosemite'},
  {email: '', password: 'Yosemite'},
  {password: 'Yosemite'},
  {}
];

var VALID_EMAIL_AND_VALID_PASSWORD_RESPONSE = {data: 'success'};
var INVALID_EMAIL_RESPONSE = {error: 'Email not found.'};
var INVALID_PASSWORD_RESPONSE = {error: 'Incorrect password.'};

function testStatusCalledWith(func, requestParams, statusCode, callback) {
  var req = {};
  var res = {};

  req.body = requestParams;
  res.status = sinon.stub();
  res.status.returnsThis();
  res.json = function() {};

  func(req, res, function() {
    setTimeout(function() {
      expect(res.status.calledWithExactly(statusCode)).to.equal(true);
      callback();
    }, 10);
  });
}

function testJsonCalledWith(func, requestParams, obj, callback) {
  var req = {};
  var res = {};

  req.body = requestParams;
  res.status = function() { return this; };
  res.json = sinon.stub();

  func(req, res, function() {
    setTimeout(function() {
      expect(res.json.calledWithExactly(obj)).to.equal(true);
      callback();
    }, 10);
  });
}

function testRenderCalledWith(func, templateName, callback) {
  var req = {};
  var res = {};

  res.render = sinon.stub();

  func(req, res, function() {
    expect(res.render.calledWithExactly(templateName)).to.equal(true);
    callback();
  });
}

describe('Login handlers', function() {

  describe('getLogin', function() {

    it('should render the login template', function(done) {
      testRenderCalledWith(getLogin, 'login', done);
    });

  });

  describe('postLogin', function() {
    var func = postLogin;

    describe('called with valid email and valid password', function() {

      it('should give the response a 200 status code', function(done) {
        testStatusCalledWith(func, VALID_EMAIL_AND_VALID_PASSWORD, 200, done);
      });

      it('should store the success in the response body', function(done) {
        testJsonCalledWith(func, VALID_EMAIL_AND_VALID_PASSWORD, VALID_EMAIL_AND_VALID_PASSWORD_RESPONSE, done);
      });
    });

    describe('called with valid email but invalid password', function() {

      VALID_EMAIL_AND_INVALID_PASSWORDS.forEach(function(credentials) {

        it('should give the response a 401 status code', function(done) {
          testStatusCalledWith(func, credentials, 401, done);
        });

        it('should store an invalid password error in the response body', function(done) {
          testJsonCalledWith(func, credentials, INVALID_PASSWORD_RESPONSE, done);
        });

      });

    });

    describe('called with invalid email', function() {

      INVALID_EMAILS.forEach(function(credentials) {

        it('should give the response a 401 status code', function(done) {
          testStatusCalledWith(func, credentials, 401, done);
        });

        it('should store an invalid email error in the response body', function(done) {
          testJsonCalledWith(func, credentials, INVALID_EMAIL_RESPONSE, done);
        });

      });
    });
  });

});
