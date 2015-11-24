"use strict";


var express = require('express');
var app = express();
var debug = require('debug')('app');



var DocumentClient = require('documentdb').DocumentClient;

var host = "[https://baas.documents.azure.com:443]"; // Add your endpoint
var masterKey = "[NWyC5yp7D60av85kthX8K+GOU99ZxJ6BQT6gyMxKdKQ+ayRahn8wlQVdzf90cNGYLR1GxS40Gv4UeO+8ijpeKA==]"; // Add the massterkey of the endpoint
var client = new DocumentClient(host, {
    masterKey: masterKey
});



var p = process.env.PORT || 1337;
var server = app.listen(p, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


var databaseDefinition = {
    id: "hellodb"
};
var collectionDefinition = {
    id: "hellocollection"
};
var documentDefinition = {
    book: "The lord of the ring",
    price: 50
};






app.get('/', function(req, res) {
    res.send('Document db test - 17:50');
});




app.get('/hello', function(req, res) {
    client.queryDatabases('SELECT * FROM root r WHERE r.id="' + databaseId + '"').toArray(function (err, results) {
    	var database = results[0];
        client.queryCollections(database._self, 'SELECT * FROM root r WHERE r.id="' + collectionId + '"').toArray(function(err, results) {
            if (err) {
                // some error occured, rethrow up
                throw (err);
            }
            if (!err && results.length === 0) {
                // no error occured, but there were no results returned 
                //indicating no collection exists in the provided database matching the query
                client.createCollection(database._self, {
                    id: collectionId
                }, function(err, createdCollection) {
                    callback(createdCollection);
                });
            } else {
                // we found a collection
                callback(results[0]);
            }
        });
    });
});



client.createDatabase(databaseDefinition, function(err, database) {
    if (err) return console.log(err);
    console.log('created db');

    client.createCollection(database._self, collectionDefinition, function(err, collection) {
        if (err) return console.log(err);
        console.log('created collection');

        client.createDocument(collection._self, documentDefinition, function(err, document) {
            if (err) return console.log(err);
            console.log('Created Document with content: ', document.content);

            cleanup(client, database);
        });
    });
});
