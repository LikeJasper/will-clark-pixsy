var fs = require('fs');
var path = require('path');
var Q = require('q');

var PASSWORDS_FILE = path.join(__dirname, '../../passwords.json');

var postLogin = function(req, res) {
  var deferred = Q.defer();

  var params = req.body;
  var email = params.email;
  var password = params.password;

  fs.readFile(PASSWORDS_FILE, function(err, data) {
    if (err) {
      deferred.reject(new Error(err));
      console.error(err);
      process.exit(1);
    }

    var passwords = JSON.parse(data);
    if (!passwords.hasOwnProperty(email)) {
      res.status(401).json({error: 'Email not found.'});
    } else if (passwords[email] !== password) {
      res.status(401).json({error: 'Incorrect password.'});
    } else {
      res.status(200).json({data: 'success'});
    }

    deferred.resolve();
  });

  return deferred.promise;
};

module.exports = postLogin;
