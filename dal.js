const { cp } = require('fs');

const MongoClient = require('mongodb').MongoClient;
const url = process.env.PORT===3000? 'mongodb://localhost:27017':"mongodb+srv://asant930:Starlord0930!@cluster0.njtpr.mongodb.net/?retryWrites=true&w=majority" ;

let db = null;

//connect to Mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    //connect to myproject database
    db = client.db('myproject');
});

// create a user account
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}

// login 
function login(email,password){
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({email:email,password:password},function(err,docs){
                err ? reject(err) : resolve(docs)
            });
    })
}

// deposit
async function deposit(email, amount) {
    const collection = db.collection('users');
    if (amount < 0) {
        let user = await collection.findOne({email});
        return user;
    }
    let result = await collection.updateOne({email}, {$inc: {balance: +amount}});
    let user = await collection.findOne({email});
    return user;    
} 

// withdraw

// all users
function all(){
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

module.exports = {create, all, login, deposit};