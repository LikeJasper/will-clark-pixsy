var getLogin = function(req, res, callback) {
  res.render('login');
  callback();
};

module.exports = getLogin;
