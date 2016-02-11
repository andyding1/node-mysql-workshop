var results = [
    {
        accountId: 100,
        accountEmail: 'john@smith.com',
        addressBookId: 12,
        addressBookName: 'business'
    },
    {
        accountId: 100,
        accountEmail: 'john@smith.com',
        addressBookId: 15,
        addressBookName: 'family'
    },
    {
        accountId: 56,
        accountEmail: 'jane@smith.com',
        addressBookId: 42,
        addressBookName: 'stuff'
    }
];

/*var accounts = [
    {
        accountId: 100,
        accountEmail: 'john@smith.com',
        addressBooks: [
            {
                addressBookId: 12,
                addressBookName: 'business'
            },
            {
                addressBookId: 15,
                addressBookName: 'family'
            }
        ]
    },
    {
        accountId: 56,
        accountEmail: 'jane@smith.com',
        addressBooks: [
            {
                addressBookId: 42,
                addressBookName: 'stuff'
            }
        ]
    }
];*/


var accounts = results.reduce(
    function(acc, curr){
        //This uses Array.prototype.findIndex to get the index of an object
        //that has the same accountId as our current Account's accountId
        var idx = acc.findIndex(function(item){
            return item.accountId === curr.accountId;
        });
        //If we find an object that has the same first name, we just push the current person to it
        if(idx >= 0){
            acc[idx].books.push({
                addressBookId: curr.addressBookId,
                addressBookName: curr.addressBookName
            });
        }
        //If we don't, then we push an entry for that accountId
        else{
            acc.push({
                accountId: curr.accountId,
                accountEmail: curr.accountEmail,
                books: [{
                    addressBookID: curr.addressBookId,
                    addressBookName: curr.addressBookName
                }]
            });
        }
        return acc;
    }, 
[] //We are starting with an empty array
);

console.log(JSON.Stringify(accounts,2,null));
