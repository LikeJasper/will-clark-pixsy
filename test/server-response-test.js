var chai = require('chai');
var expect = require('chai').expect;
var request = require('request');
var server = require('../test-server.js');

var LOGIN_URL = 'http://localhost:4000/login';

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

var INVALID_EMAIL_RESPONSE = {error: 'Email not found.'};
var INVALID_PASSWORD_RESPONSE = {error: 'Incorrect password.'};

function testStatusCode(statusCode, options, callback) {
  request(options, function(err, res, body) {
    expect(res.statusCode).to.equal(statusCode);
    callback();
  });
}

function testJsonResponse(obj, options, callback) {
  request(options, function(err, res, body) {
    expect(body).to.eql(obj);
    callback();
  });
}

function testRenderedHtmlContains(str, options, callback) {
  request(options, function(err, res, body) {
    expect(body).to.contain(str);
    callback();
  });
}

describe('Login routes', function () {

  before(function() {
    server.listen(4000);
  });

  after(function() {
    server.close();
  });

  describe('GET /login', function() {

    it('should respond with a 200 status code.', function(done) {
      testStatusCode(200, LOGIN_URL, done);
    });

    it('should render the html for the login page.', function(done) {
      testRenderedHtmlContains("<title>Will Clark / Pixsy Test Dive</title>", LOGIN_URL, done);
    });

  });

  describe('POST /login', function() {

    describe('with a valid email and password', function() {
      var validOptions = {
        url: LOGIN_URL,
        method: 'POST',
        json: VALID_EMAIL_AND_VALID_PASSWORD
      };

      it('should respond with a 200 status code.', function(done) {
        testStatusCode(200, validOptions, done);
      });

    });

    describe('with a valid email and invalid password', function() {
      var invalidPasswordOptions = {
        url: LOGIN_URL,
        method: 'POST'
      };

      VALID_EMAIL_AND_INVALID_PASSWORDS.forEach(function(credentials) {
        invalidPasswordOptions.json = credentials;

        it('should respond with a 401 status code.', function(done) {
          testStatusCode(401, invalidPasswordOptions, done);
        });

        it('should return a JSON object with an "error" property with a value of "Incorrect password."', function(done) {
          testJsonResponse(INVALID_PASSWORD_RESPONSE, invalidPasswordOptions, done);
        });

      });

    });

    describe('with an invalid email', function() {
      var invalidEmailOptions = {
        url: LOGIN_URL,
        method: 'POST'
      };

      INVALID_EMAILS.forEach(function(credentials) {
        invalidEmailOptions.json = credentials;

        it('should respond with a 401 status code.', function(done) {
          testStatusCode(401, invalidEmailOptions, done);
        });

        it('should return a JSON object with an "error" property with a value of "Email not found."', function(done) {
          testJsonResponse(INVALID_EMAIL_RESPONSE, invalidEmailOptions, done);
        });

      });

    });

  });

});
