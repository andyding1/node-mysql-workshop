var mysql = require('mysql');
var colors = require('colors');
var util = require('util');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'andyding',
    database: 'addressbook'
});

connection.query("SELECT Account.id AS accountId, AddressBook.id AS addressBookId, Entry.id AS entryId, email, name, firstName, lastName FROM Account JOIN AddressBook ON Account.id=AddressBook.accountId JOIN Entry ON AddressBook.id=Entry.addressbookId WHERE addressBookId=11", function(err, results) {
    if (err) {
        console.log(err);
    }
    else {
        // results is an Array of all the rows
        // this will be called once for each row of results
        var accounts = results.reduce(
        function(acc, curr){
            
            var idxAccount = acc.findIndex(function(item){
                return item.accountId === curr.accountId;
            });
            //console.log(idxAccount);
          
            if(idxAccount >= 0){
                var account = acc[idxAccount];
                // account.addressBooks.push({
                //     addressbookId: curr.addressBookId,
                //     name: curr.name
                // });
                
                var idxBook = account.addressBooks.findIndex(function(item){
                    return item.addressBookId === curr.addressBookId;
                });
                
                if(idxBook >= 0){
                    // console.log(idxAccount);
                    // console.log(account.addressBooks[idxBook].entries);
                    account.addressBooks[idxBook].entries.push({
                        entryId: curr.entryId,
                        firstName: curr.firstName,
                        lastName: curr.lastName
                    });
                }
                else{
                    account.addressBooks.push({
                        addressbookId: curr.addressBookId,
                        name: curr.name,
                        entries: [{
                            entryId: curr.entryId,
                            firstName: curr.firstName,
                            lastName: curr.lastName
                        }]
                    });
                    
                    // account.addressBooks[account.addressBooks.length-1].entries.push({
                    //     entryId: curr.entryId,
                    //     firstName: curr.firstName,
                    //     lastName: curr.lastName
                    // });
                }
            }
            //If we don't, then we push an entry for that accountId
            else{
                acc.push({
                    email: curr.email,
                    accountId: curr.accountId,
                    addressBooks: [{
                        addressBookId: curr.addressBookId,
                        name: curr.name,
                        entries: [{
                            entryId: curr.entryId,
                            firstName: curr.firstName,
                            lastName: curr.lastName
                        }]
                    }]
                });
            }
           /* 
            try {console.log(acc[0].addressBooks[0].entries)}
            catch(e){}*/
            return acc;
        }, 
        [] //We are starting with an empty array
        );
        
        //console.log(accounts);
        console.log(util.inspect(accounts, {depth:10, colors: true}));
        
    }
    connection.end();
});