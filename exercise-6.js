var mysql = require('mysql');
var colors = require('colors');
var groupBy = require('underscore').groupBy;
var util = require('util');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'andyding',
    database: 'addressbook'
});

connection.query("SELECT Account.id AS accountId, AddressBook.id AS addressBookId, Entry.id AS entryId, email, name, firstName, lastName FROM Account JOIN AddressBook ON Account.id=AddressBook.accountId JOIN Entry ON AddressBook.id=Entry.addressbookId", function(err, results) {
    if (err) {
        console.log(err);
    }
    else {
        // results is an Array of all the rows
        // this will be called once for each row of results
       var accounts = groupBy(results, function(row){
            return row.accountId;    
        });
        
        var accountObjects = Object.keys(accounts).map(function(key){
            
            var addressBooks = groupBy(accounts[key], function(row){
                return row.addressBookId;
            });
            console.log(Object.keys(addressBooks));
            var addressBookObjects = Object.keys(addressBooks).map(function(key1){
                // console.log(key);
                // console.log(key1);
                
                var entries = groupBy(addressBooks[key1], function(row){
                    return row.entryId;
                });
                
                var entriesObjects = Object.keys(entries).map(function(key2){
                    return {
                        entryId: entries[key2][0].entryId,
                        firstName: entries[key2][0].firstName,
                        lastName: entries[key2][0].lastName
                    };
                });
                return {
                    addressBookId: addressBooks[key1][0].addressBookId,
                    name: addressBooks[key1][0].name,
                    entries: entriesObjects
                };
            });
            return {
                accountId: accounts[key][0].accountId,
                email: accounts[key][0].email,
                addressBooks: addressBookObjects
            };
        });

        //console.log(JSON.stringify(accountObjects,null,2));
        console.log(util.inspect(accountObjects, {depth:10, colors: true}));
    }
    connection.end();
});