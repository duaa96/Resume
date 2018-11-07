var db=require('./conn_DB');


 
exports.add=function(conData ,req ,callback){
    db.connect(conData,function(err,data) {
     
        if(err){
            callback(err);
            return;
        }
        var messageData = {
            name:req.query.YourName,
            phone:req.query.YourPhone,
            email: req.query.YourEmail,
            message: req.query.Yourmessage
        };
        data.query('INSERT INTO message SET ?',messageData,function(err,result){
                callback(err,messageData);
        });
    });

};


exports.getAll=function(conData,req,callback){
    db.connect(conData,function(err,data){

        if(err){
            callback(err);
            return;
        }
        data.query('SELECT * FROM message',function(err,result){

            let data=JSON.stringify(result);
            callback(err,data);
        });
    });
};

exports.getById=function(conData,req,callback){
   
    db.connect(conData,function(err,data){
        var id = req.query.id;
        if(err){
            callback(err);
            return;
        }
        data.query('SELECT * FROM message WHERE id ='+id ,function(err,result){

            let data=JSON.stringify(result);
            callback(err,data);
        });
    });
};

exports.DeletById=function(conData,req,callback){
   
    db.connect(conData,function(err,data){
        var id = req.query.id;
        if(err){
            callback(err);
            return;
        }
        data.query('DELETE FROM message WHERE id ='+ id ,function(err,result){

            let data=JSON.stringify(result);
            callback(err,data);
        });
    });
};

exports.UPDATEById=function(conData,req,callback){
   
    db.connect(conData,function(err,data){
        var id = req.query.id;
        var messageDataup = {
            name:req.query.YourName,
            phone:req.query.YourPhone,
            email: req.query.YourEmail,
            message: req.query.Yourmessage
        };
        if(err){
            callback(err);
            return;
        }
        data.query('UPDATE message SET ? WHERE id ='+id,messageDataup,function(err,result){
            callback(err,messageDataup);
        });
    });
};