var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');

// used to serve static files from public library
app.use(express.static('public'));
app.use(cors());

//create user account
app.get('/account/create/:name/:email/:password', function(req, res) {
    //else create user
    dal.create(req.params.name,req.params.email,req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

//all accounts
app.get('/account/all', function(req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

//deposit
app.get('/account/deposit/:email/:amount', function(req, res) {
    dal.deposit(req.params.email,req.params.amount).
    then((balance)=>{
        console.log(balance);
        res.send(balance);
    })
})
//withdraw
app.get('/account/withdraw/:email/:balance', function(req, res) {
    dal.update(req.params.email,req.params.balance, "withdraw").
    then((user)=>{
        console.log(user);
        res.send(user);
    })
})

// login user
app.get('/account/login/:email/:password',function(req,res){
    dal.login(req.params.email,req.params.password).
    then((user)=>{
        console.log(user);
        res.send(user)
    })
})

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);