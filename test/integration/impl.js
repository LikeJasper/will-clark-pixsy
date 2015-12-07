var expect = require('chai').expect;
var request = require('request');

module.exports = {

  testStatusCode: function(statusCode, options, callback) {
    request(options, function(err, res, body) {
      expect(res.statusCode).to.equal(statusCode);
      callback();
    });
  },

  testJsonResponse: function(obj, options, callback) {
    request(options, function(err, res, body) {
      expect(body).to.eql(obj);
      callback();
    });
  },

  testRenderedHtmlContains: function(str, options, callback) {
    request(options, function(err, res, body) {
      expect(body).to.contain(str);
      callback();
    });
  }

};
