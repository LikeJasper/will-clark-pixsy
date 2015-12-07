var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);

module.exports = {

  testStatusCalledWith: function(func, requestParams, statusCode, callback) {
    var req = {};
    var res = {};

    req.body = requestParams;
    res.status = sinon.stub();
    // .status is chainable, needs to pass the response object to .json
    res.status.returnsThis();
    res.json = function() {};

    expect(func(req, res)).to.be.fulfilled
      .then(function() {
        expect(res.status).to.have.been.calledWithExactly(statusCode);
        callback();
      })
      .done();
  },

  testJsonCalledWith: function(func, requestParams, obj, callback) {
    var req = {};
    var res = {};

    req.body = requestParams;
    // .status is chainable, needs to pass the response object to .json
    res.status = function() { return this; };
    res.json = sinon.stub();

    expect(func(req, res)).to.be.fulfilled
      .then(function() {
        // .calledWithExactly does not require the very same object to evaluate to true
        expect(res.json).to.have.been.calledWithExactly(obj);
        callback();
      })
      .done();
  },

  testRenderCalledWith: function(func, templateName, callback) {
    var req = {};
    var res = {};

    res.render = sinon.stub();

    expect(func(req, res)).to.be.fulfilled
      .then(function() {
        expect(res.render).to.have.been.calledWithExactly(templateName);
        callback();
      })
      .done();
  }

};
