var testData = require('../test-data');
var impl = require('./impl');

var getLogin = require('../../routes/login/getLogin');
var postLogin = require('../../routes/login/postLogin');

describe('Login handlers', function() {

  describe('getLogin', function() {

    it('should render the login template', function(done) {
      impl.testRenderCalledWith(getLogin, 'login', done);
    });

  });

  describe('postLogin', function() {
    var func = postLogin;

    describe('called with valid email and valid password', function() {

      it('should give the response a 200 status code', function(done) {
        impl.testStatusCalledWith(func, testData.VALID_EMAIL_AND_VALID_PASSWORD, 200, done);
      });

      it('should store the success in the response body', function(done) {
        impl.testJsonCalledWith(func, testData.VALID_EMAIL_AND_VALID_PASSWORD, testData.VALID_EMAIL_AND_VALID_PASSWORD_RESPONSE, done);
      });
    });

    describe('called with valid email but invalid password', function() {

      testData.VALID_EMAIL_AND_INVALID_PASSWORDS.forEach(function(credentials) {

        it('should give the response a 401 status code', function(done) {
          impl.testStatusCalledWith(func, credentials, 401, done);
        });

        it('should store an invalid password error in the response body', function(done) {
          impl.testJsonCalledWith(func, credentials, testData.INVALID_PASSWORD_RESPONSE, done);
        });

      });

    });

    describe('called with invalid email', function() {

      testData.INVALID_EMAILS.forEach(function(credentials) {

        it('should give the response a 401 status code', function(done) {
          impl.testStatusCalledWith(func, credentials, 401, done);
        });

        it('should store an invalid email error in the response body', function(done) {
          impl.testJsonCalledWith(func, credentials, testData.INVALID_EMAIL_RESPONSE, done);
        });

      });
    });
  });

});
