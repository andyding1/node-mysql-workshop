var mysql = require('mysql');
var colors = require('colors');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'andyding',
    database: 'addressbook'
});

connection.query("SELECT Account.id AS mainId, email, accountId, name FROM Account LEFT JOIN AddressBook ON Account.id=AddressBook.accountId", function(err, results) {
    if (err) {
        console.log(err);
    }
    else {
        // results is an Array of all the rows
        // this will be called once for each row of results
        var accounts = results.reduce(
        function(acc, curr){
            //This uses Array.prototype.findIndex to get the index of an object
            //that has the same accountId as our current Account's accountId
            var idx = acc.findIndex(function(item){
                return item.email === curr.email;
            });
            //If we find an object that has the same first name, we just push the current person to it
            if(idx >= 0){
                acc[idx].names.push(curr.name);
            }
            //If we don't, then we push an entry for that accountId
            else{
                acc.push({
                    email: curr.email,
                    mainId: curr.mainId,
                    names: [curr.name]
                });
            }
            return acc;
        }, 
        [] //We are starting with an empty array
        );
        //console.log(JSON.stringify(accounts,null,2));
        accounts.forEach(function(object){
            console.log(colors.bold('#'+object.mainId+':')+ ' ' + object.email);
            object.names.forEach(function(name){
                if(name){
                    console.log(colors.green('  '+name));
                }
                else{
                    console.log(colors.yellow(colors.trap('--no address books--')));
                }
            });
        });    
    }
    connection.end();
});