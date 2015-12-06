var http = require('http');
var app = require('./app');

app.set('port', 4000);
var server = module.exports = http.createServer(app);
