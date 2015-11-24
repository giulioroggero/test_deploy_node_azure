"use strict"


var express = require('express');
var app = express();

app.get('/', function (req, res) {
      res.send('Hello World!');
});

var p = process.env.PORT || 1337;
var server = app.listen(p, function () {
var host = server.address().address;
var port = server.address().port;

   console.log('Example app listening at http://%s:%s', host, port);
});
