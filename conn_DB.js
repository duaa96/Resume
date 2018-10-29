var mysql = require('mysql');
exports.connect = function(conData, callback){

 var con = mysql.createConnection(conData);
 con.connect(function(err) {
 if (err) callback(err);
 callback(null, con);
 });
 };