var expect = require('chai').expect;
var sinon = require('sinon');

module.exports = {

  testStatusCalledWith: function(func, requestParams, statusCode, callback) {
    var req = {};
    var res = {};

    req.body = requestParams;
    res.status = sinon.stub();
    // .status is chainable, needs to pass the response object to .json
    res.status.returnsThis();
    res.json = function() {};

    func(req, res, function() {
      setTimeout(function() {
        expect(res.status.calledWithExactly(statusCode)).to.equal(true);
        callback();
      }, 10);
    });
  },

  testJsonCalledWith: function(func, requestParams, obj, callback) {
    var req = {};
    var res = {};

    req.body = requestParams;
    // .status is chainable, needs to pass the response object to .json
    res.status = function() { return this; };
    res.json = sinon.stub();

    func(req, res, function() {
      setTimeout(function() {
        // .calledWithExactly does not require the very same object to evaluate to true
        expect(res.json.calledWithExactly(obj)).to.equal(true);
        callback();
      }, 10);
    });
  },

  testRenderCalledWith: function(func, templateName, callback) {
    var req = {};
    var res = {};

    res.render = sinon.stub();

    func(req, res, function() {
      expect(res.render.calledWithExactly(templateName)).to.equal(true);
      callback();
    });
  }

};
