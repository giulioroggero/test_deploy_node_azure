"use strict";


var express = require('express');
var app = express();
var debug = require('debug')('app');


var t = {book: "The lord of the ring", price: 50};

app.get('/', function (req, res) {
      res.send('Hello World!');
});

var p = process.env.PORT || 1337;
var server = app.listen(p, function () {
var host = server.address().address;
var port = server.address().port;

   console.log('Example app listening at http://%s:%s', host, port);
});



var DocumentClient = require('documentdb').DocumentClient;

var host = "[https://baas.documents.azure.com:443]";                     // Add your endpoint
var masterKey = "[NWyC5yp7D60av85kthX8K+GOU99ZxJ6BQT6gyMxKdKQ+ayRahn8wlQVdzf90cNGYLR1GxS40Gv4UeO+8ijpeKA==]";  // Add the massterkey of the endpoint
var client = new DocumentClient(host, {masterKey: masterKey});

var databaseDefinition = { id: "sample database" };
var collectionDefinition = { id: "sample collection" };
var documentDefinition = { id: "hello world doc", content: "Hello World!" };

client.createDatabase(databaseDefinition, function(err, database) {
    if(err) return console.log(err);
    console.log('created db');

    client.createCollection(database._self, collectionDefinition, function(err, collection) {
        if(err) return console.log(err);
        console.log('created collection');

        client.createDocument(collection._self, documentDefinition, function(err, document) {
            if(err) return console.log(err);
            console.log('Created Document with content: ', document.content);

            cleanup(client, database);
        });
    });
});
