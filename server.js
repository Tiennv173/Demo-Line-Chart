// var flash = require('connect-flash') //support notice
// var passport = require('passport') //Authentication 
// var LocalStrategy = require('passport-local').Strategy; //Authentication local 
// var expressSession = require('express-session'); //support save token string throught session


var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();
var aData = null;  
var aDocs = null;

// Connect to the `test` Mongo database using Mongoose
mongoose.connect('mongodb://localhost/device');
var db = mongoose.connection;
var Document = null;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function(callback){
	
	// Create a document schema
	var gaussSchema = mongoose.Schema({
		date: {
			year: Number,
			mouth: Number,
			day: Number,
			hour: Number,
			minute: Number,
			second: Number,
			showDate: String
		},
		param: {
			hum: Number,
			temp: Number,
			humk: Number,
			lux: Number
		},
		mac: String
	});

	Document = mongoose.model('Document', gaussSchema);

	// // Associate the schema with the Document model
	// Document = mongoose.model('Document', gaussSchema);

	// Get the data from test_data.json
	var aDocs = JSON.parse(fs.readFileSync('./test_data2.json'));
	// console.log({aDocs});
	
	// db.collection("data").insertMany(aDocs, function(err,res) {
	// 	if (err) throw err;
 //    console.log("Number of documents inserted: " + res.insertedCount);
	// })


	// Loop through and add the sample dataset to the database
	for (var n = 0; n < aDocs.length; n++){
		var docToAdd = new Document(aDocs[n]);
		docToAdd.save(function(err, docToAdd){
			if (err) return console.error(err);
		});
	}



	// console data from db
	// var a = db.collection("data").find({}).sort({_id:-1}).limit(10).toArray(function(err, result){
	// 	if (err) throw err;
	//     console.log(result);
	//     aDocs = result; 
	// });



});

// Start the server
var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log('Example app listening at http://localhost:%s', port);
});

// Configure our app to serve static files from the current directory
app.use(express.static('./'));

// Display `index.html` when `localhost:3000` is requested
app.get('/', function (req, res) {
  res.sendFile('index.html',{root: './'});
});

// Send all records when there's a GET request to `localhost:3000/test`
app.get('/device', function (req, res) {
	Document.find(function(err, records){
		aData = records;
		res.send(aData);
	});
});

app.get('/dashboard', function(req, res){
	res.sendFile('./views/linechart.html',{root: './'})
})
