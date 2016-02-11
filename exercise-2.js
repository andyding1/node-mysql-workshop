var mysql = require('mysql');
var colors = require('colors');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'andyding',
    database: 'addressbook'
});

connection.query("SELECT * FROM Account LIMIT 5", function(err, results) {
    if (err) {
        console.log(err);
    }
    else {
        // results is an Array of all the rows
        results.forEach(function(result) {
            // this will be called once for each row of results
            console.log(colors.bold('#'+result.id+':')+ ' ' + result.email);
        });
    }
    connection.end();
});