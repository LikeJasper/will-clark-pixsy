var Q = require('q');

var getLogin = function(req, res) {
  var deferred = Q.defer();

  res.render('login');

  deferred.resolve();
  return deferred.promise;
};

module.exports = getLogin;
