var db = require('./conn_DB');

exports.add = function(conData, req, callback){
	db.connect(conData, function(err, data){
		if (err) {
           callback(err);
			return;
        }
        var message = {
             name: req.body['YourName'],
			 phone: req.body['YourPhone'],
			 email: req.body['YourEmail'],
			 message: req.body['Yourmessage']
		 };

	data.query('INSERT INTO message SET ?', message, function (err, result) {
	
     callback(err, message);
			});
	});
 };	 