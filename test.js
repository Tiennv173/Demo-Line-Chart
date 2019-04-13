var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();
var aData = null;  

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://tiennguyen.koreasouth.cloudapp.azure.com/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("device");
  var query = { _id:-1 };
  dbo.collection("data").find().sort(query).limit(15).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
    var data1 = result;
    console.log(data1.length);
    var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log('Example app listening at http://localhost:%s', port);
});
  app.get('/', function (req, res) {
  res.send(data1);
});
  });

  
});