var db = require('./conn_DB');
var insert = require('./insertData');
var express=require('express');
var app=express();
app.use(express.static('public/CVv3'));
var bodyparse=require('body-parser');
app.use(bodyparse.urlencoded({ extended: false }));
var port=8080;
app.get('/',function(req,res)
{
	var swig =require('swig');
	var tamplate=swig.compileFile(__dirname +'/public/CVv3/html/cv.html');
	var output =tamplate({});
	res.send(output);
});

const databaseData = {
	host: "localhost",
 	user: "root",
 	password: "",
	database: "contactus"
	};

 app.post('/', (req, res) => { 
  		insert.add(databaseData, req, function (err, data){
 
 			if(err){
 				res.status(400);
 				res.end("error:" + err);
 			}
 
			 res.status(201);
 			 res.end("success");
 		});
 })

console.log(__dirname);
app.listen(port);
