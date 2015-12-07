var impl = require('./impl');
var testData = require('../test-data');
var server = require('./test-server');

var LOGIN_URL = 'http://localhost:4000/login';

describe('Login routes', function () {

  before(function() {
    server.listen(4000);
  });

  after(function() {
    server.close();
  });

  describe('GET /login', function() {

    it('should respond with a 200 status code.', function(done) {
      // parameters: test status code, request constructor options, callback
      impl.testStatusCode(200, LOGIN_URL, done);
    });

    it('should render the html for the login page.', function(done) {
      // parameters: test string, request constructor options, callback
      impl.testRenderedHtmlContains(testData.HTML_SNIPPET, LOGIN_URL, done);
    });

  });

  describe('POST /login', function() {

    describe('with a valid email and password', function() {
      var validOptions = {
        url: LOGIN_URL,
        method: 'POST',
        json: testData.VALID_EMAIL_AND_VALID_PASSWORD
      };

      it('should respond with a 200 status code.', function(done) {
        // parameters: test status code, request constructor options, callback
        impl.testStatusCode(200, validOptions, done);
      });

    });

    describe('with a valid email and invalid password', function() {
      var invalidPasswordOptions = {
        url: LOGIN_URL,
        method: 'POST'
      };

      testData.VALID_EMAIL_AND_INVALID_PASSWORDS.forEach(function(credentials) {
        invalidPasswordOptions.json = credentials;

        it('should respond with a 401 status code.', function(done) {
          // parameters: test status code, request constructor options, callback
          impl.testStatusCode(401, invalidPasswordOptions, done);
        });

        it('should return a JSON object with an "error" property with a value of "Incorrect password."', function(done) {
          // parameters: test object, request constructor options, callback
          impl.testJsonResponse(testData.INVALID_PASSWORD_RESPONSE, invalidPasswordOptions, done);
        });

      });

    });

    describe('with an invalid email', function() {
      var invalidEmailOptions = {
        url: LOGIN_URL,
        method: 'POST'
      };

      testData.INVALID_EMAILS.forEach(function(credentials) {
        invalidEmailOptions.json = credentials;

        it('should respond with a 401 status code.', function(done) {
          // parameters: test status code, request constructor options, callback
          impl.testStatusCode(401, invalidEmailOptions, done);
        });

        it('should return a JSON object with an "error" property with a value of "Email not found."', function(done) {
          // parameters: test object, request constructor options, callback
          impl.testJsonResponse(testData.INVALID_EMAIL_RESPONSE, invalidEmailOptions, done);
        });

      });

    });

  });

});
