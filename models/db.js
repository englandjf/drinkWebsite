var mysql   = require('mysql');


/* DATABASE CONFIGURATION */
var connection = mysql.createConnection({
    host: 'cwolf.cs.sonoma.edu',
    user: 'jfoster',
    password: '004162683'
    //user: 'your_username',
    //password: 'your_password'
});

var dbToUse = 'jfoster';

//use the database for any queries run
var useDatabaseQry = 'USE ' + dbToUse;

//IGNORE
//create the User table if it does not exist
connection.query(useDatabaseQry, function (err) {
    if (err) throw err;

    var createTableQry = 'CREATE TABLE IF NOT EXISTS User('
        + 'UserID INT AUTO_INCREMENT PRIMARY KEY'
        + ',Email VARCHAR(256)'
        + ',Password VARCHAR(50)'
        + ')';
    connection.query(createTableQry, function (err) {
        if (err) throw err;
    });
});

exports.GetAll = function(callback) {
    connection.query('select UserID, Email from User',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.Insert = function(userInfo, callback) {
    console.log(userInfo);
    var query = 'INSERT INTO User (Email, Password) VALUES (\'' + userInfo.email + '\', \'' + userInfo.password + '\');';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}
//IGNORE


//Mine
exports.seeAll = function(callback){
    connection.query('select * from Drink',
	function(err,result){
	    if(err){
		console.log(err);
		callback(true);
		return;
	    }
	    callback(false,result);
	}
     );
}

exports.getByType = function(userInfo, callback){
    var query = 'select d.drinkName,gt.alcName from Drink d join generalTypes gt on d.drinkName = gt.drinkName and gt.alcName="'+userInfo.alcohol +'";';
    console.log(query);
    connection.query(query,
        function(err,result){
            if(err){
                console.log(err);
                callback(true);
                return;
            }
            callback(false,result);
        }
     );

}

exports.getByIng = function(userInfo, callback){
    var query = 'select d.drinkName, st.specName from Drink d join specificTypes st on d.drinkName = st.drinkName and st.specName="'+userInfo.ingredient +'";';
    console.log(query);
    connection.query(query,
        function(err,result){
            if(err){
                console.log(err);
                callback(true);
                return;
            }
            callback(false,result);
        }
     );

}

exports.insertDrink = function(userInfo, callback) {
    console.log(userInfo);
    if(userInfo.ice == "no")
	var iceTemp = 0;
    else
	var iceTemp = 1;
    var query = 'INSERT INTO Drink  VALUES (\'' + userInfo.drinkName + '\', \'' + userInfo.glassType + '\', \'' + iceTemp + '\');';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}

exports.insertMain = function(userInfo, callback) {
    console.log(userInfo);
    var query = 'INSERT INTO generalTypes  VALUES (\'' + userInfo.drinkName + '\', \'' + userInfo.mainType +  '\');';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}

exports.insertIng = function(userInfo, callback) {
    console.log(userInfo);
    for(var i = 0; i < userInfo.ingredient.length;i++)
    {
	if(userInfo.ingredient[i] != '')
	{
	var query = 'INSERT INTO specificTypes  VALUES (\'' + userInfo.drinkName + '\', \'' + userInfo.ingredient[i] + '\', \'' + '1' +   '\');';
	console.log(query);
	connection.query(query,
	    function (err, result) {
		if(err) {
		 console.log(err);
		 callback(true);
		 //return
		}
	        callback(false, result);
	     }
	);
      }
    }
}

exports.insertSteps = function(userInfo, callback) {
    console.log(userInfo);
    for(var i = 0; i < userInfo.step.length;i++)
    {
        if(userInfo.step[i] != '')
        {
        var query = 'INSERT INTO Steps  VALUES (\'' + userInfo.drinkName + '\', \'' + (i+1) + '\', \'' + userInfo.step[i] +   '\');';
        console.log(query);
        connection.query(query,
            function (err, result) {
                if(err) {
                 console.log(err);
                 callback(true);
                 //return
                }
                callback(false, result);
             }
        );
      }
    }
}

exports.moreInfo1 = function(info,callback) {
    connection.query('select * from Drink d join generalTypes gt on d.drinkName = gt.drinkName join specificTypes st on d.drinkName = st.drinkName and d.drinkName="' + info.drinkName + '";',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.moreInfo2 = function(info,callback) {
    connection.query('select instruction from Steps where drinkName="' + info.drinkName +'";',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
		
                return;
            }
            callback(false, result);
        }
    );
}

exports.moreInfo3 = function(info,callback) {
    connection.query('select specName from specificTypes where drinkName="' + info.drinkName +'";',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
		
                return;
            }
            callback(false, result);
        }
    );
}


