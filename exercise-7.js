var mysql = require('mysql');
var colors = require('colors');
var groupBy = require('underscore').groupBy;
var util = require('util');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'andyding',
    database: 'addressbook'
});

connection.query("SELECT Account.id AS accountId, AddressBook.id AS addressBookId, Entry.id AS entryId, Phone.id AS phoneId, email, name, firstName, lastName, type, subtype, phoneNumber FROM Account JOIN AddressBook ON Account.id=AddressBook.accountId JOIN Entry ON AddressBook.id=Entry.addressbookId JOIN Phone ON Entry.id=Phone.entryId", function(err, results) {
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
            
            var addressBookObjects = Object.keys(addressBooks).map(function(key1){
                
                var entries = groupBy(addressBooks[key1], function(row){
                    return row.entryId;
                });
                
                var entriesObjects = Object.keys(entries).map(function(key2){
                    
                    var phones = groupBy(entries[key2], function(row){
                        return row.phoneId;
                    });
                    
                    var phoneObjects = Object.keys(phones).map(function(key3){
                        return {
                            phoneId: phones[key3][0].phoneId,
                            type: phones[key3][0].type,
                            subtype: phones[key3][0].subtype,
                            phoneNumber: phones[key3][0].phoneNumber
                        };
                    });
                    return {
                        entryId: entries[key2][0].entryId,
                        firstName: entries[key2][0].firstName,
                        lastName: entries[key2][0].lastName,
                        phones: phoneObjects
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