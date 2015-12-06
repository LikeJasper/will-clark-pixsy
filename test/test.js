var chai = require('chai');
var expect = require('chai').expect;
var request = require('request');

var getLogin = require('../routes/login/getLogin').getLogin;
var postLogin = require('../routes/login/postLogin').postLogin;

var LOGIN_URL = 'http://localhost:3000/login';

var VALID_EMAIL_AND_VALID_PASSWORD = {email: 'ansel@adams.com', password: 'Yosemite'};
var VALID_EMAIL_AND_INVALID_PASSWORD = {email: 'ansel@adams.com', password: 'punk65'};
var INVALID_EMAIL = {email: 'ansel@adams.co.uk', password: 'Yosemite'};

var INVALID_EMAIL_RESPONSE = {error: 'Email not found.'};
var INVALID_PASSWORD_RESPONSE = {error: 'Incorrect password.'};

describe('Login routes', function () {

  describe('GET /login', function() {

    it('should respond with a 200 status code.', function(done) {
      request(LOGIN_URL, function(err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('should render the html for the login page.', function(done) {
      request(LOGIN_URL, function(err, res, body) {
        expect(body).to.contain("<title>Will Clark / Pixsy Test Dive</title>");
        done();
      });
    });

  });

  describe('POST /login', function() {

    describe('with a valid email and password', function() {

      it('should respond with a 200 status code.', function(done) {
        request({
          url: LOGIN_URL,
          method: 'POST',
          json: VALID_EMAIL_AND_VALID_PASSWORD
        }, function(err, res, body) {
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    });

    describe('with a valid email and invalid password', function() {

      it('should respond with a 401 status code.', function(done) {
        request({
          url: LOGIN_URL,
          method: 'POST',
          json: VALID_EMAIL_AND_INVALID_PASSWORD
        }, function(err, res, body) {
          expect(res.statusCode).to.equal(401);
          done();
        });
      });

      it('should return a JSON object with an "error" property with a value of "Incorrect password."', function(done) {
        request({
          url: LOGIN_URL,
          method: 'POST',
          json: VALID_EMAIL_AND_INVALID_PASSWORD
        }, function(err, res, body) {
          expect(body).to.eql(INVALID_PASSWORD_RESPONSE);
          done();
        });
      });
    });

    describe('with an invalid email', function() {

      it('should respond with a 401 status code.', function(done) {
        request({
          url: LOGIN_URL,
          method: 'POST',
          json: INVALID_EMAIL
        }, function(err, res, body) {
          expect(res.statusCode).to.equal(401);
          done();
        });
      });

      it('should return a JSON object with an "error" property with a value of "Email not found."', function(done) {
        request({
          url: LOGIN_URL,
          method: 'POST',
          json: INVALID_EMAIL
        }, function(err, res, body) {
          expect(body).to.eql(INVALID_EMAIL_RESPONSE);
          done();
        });
      });

    });

  });

});
