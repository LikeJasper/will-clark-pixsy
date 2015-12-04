var chai = require('chai');
var expect = require('chai').expect;
var getLogin = require('../routes/login/getLogin').getLogin;
var postLogin = require('../routes/login/postLogin').postLogin;

describe('GET /login', function() {
  it('should respond with a 200 status code.');
  it('should return the html for the login page.');
});

describe('POST /login', function() {

  describe('with a valid email and password', function() {
    it('should respond with a 200 status code.');
  });

  describe('with a valid email and invalid password', function() {
    it('should respond with a 401 status code.');
    it('should return a JSON object with an "error" property with a value of "Incorrect password."');
  });

  describe('with an invalid email', function() {
    it('should respond with a 401 status code.');
    it('should return a JSON object with an "error" property with a value of "Email not found."');
  });

});
