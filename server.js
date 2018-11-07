var db = require('./conn_DB');
var insert = require('./insertData');
var Message = require('./Message');
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

 app.post('/add', (req, res) => { 
  		insert.add(databaseData, req, function (err, data){
 
 			if(err){
 				res.status(400);
 				res.end("error:" + err);
 			}
			 var tamplate=swig.compileFile(__dirname +'/public/CVv3/html/cv.html');
			 var output =tamplate({success:"your message recieved, we will reply as soon as possible"});
			 res.status(201);
 			 res.send(output);
 		});
 });
//add a new message through the API 
 app.post('/api/v1.0/add', (req, res) => { 
	
	Message.add(databaseData, req, function (err, data){
		res.setHeader('content-type','application/json')
		res.setHeader('accepts','GET,POST')
	   if(err){
		   res.status(400);
		   res.end("error:" + err);
		   return;
	   }

	   res.status(201);
		res.end(JSON.stringify({message:"message added successfuly"}));
   });
});


//get a  messages through the API 
app.get('/api/v1.0/getMessageall', (req, res) => { 

	Message.getAll(databaseData, req, function (err, data){
		res.setHeader('content-type','application/json')
		res.setHeader('accepts','GET')
	   if(err){
		   res.status(400);
		   res.end("error:" + err);
		   return;
	   }

	   res.status(201);
		res.end(data);
   });
});

app.get('/api/v1.0/getMessage', (req, res) => { 
	
	Message.getById(databaseData, req, function (err, data){
		res.setHeader('content-type','application/json')
		res.setHeader('accepts','GET')
	   if(err){
		   res.status(400);
		   res.end("error:" + err);
		   return;
	   }

	   res.status(201);
		res.end(data);
   });
});

app.delete('/api/v1.0/delMessage', (req, res) => { 
	
	Message.DeletById(databaseData, req, function (err, data){
		res.setHeader('content-type','application/json')
		res.setHeader('accepts','DELETE')
	   if(err){
		   res.status(400);
		   res.end("error:" + err);
		   return;
	   }

	   res.status(201);
		res.end(data);
   });
});

app.put('/api/v1.0/updateMessage', (req, res) => { 
	
	Message.UPDATEById(databaseData, req, function (err, data){
		res.setHeader('content-type','application/json')
		res.setHeader('accepts','PUT')
	   if(err){
		   res.status(400);
		   res.end("error:" + err);
		   return;
	   }

	   res.status(201);
		res.end('success');
   });
});
console.log(__dirname);
app.listen(port);
