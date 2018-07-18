var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var allMessages = [];
var allUsers = [];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})
app.get('/script.js', function(req, res){
    res.sendFile(__dirname + '/script.js');
})
app.get('/styles.css', function(req, res){
    res.sendFile(__dirname + '/styles.css');
})
app.get('/allMessages', function(req, res){
    res.json(allMessages);
})
app.post('/allMessages', function(req, res){
    if(allMessages.length >= 100){ //is is the right place for this function?
            allMessages.shift();
        } 
    allMessages.push(req.body); 
    res.end();
})
app.get('/allUsers', function(req, res){
    res.json(allUsers);
})
app.post('/allUsers', function(req, res){
    if (!allUsers.includes(req.body))
    allUsers.push(req.body);
    res.end();
})

http.listen(5000, function(){
    console.log('listening on 5000');
})