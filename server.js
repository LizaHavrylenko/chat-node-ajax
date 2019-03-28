const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const allMessages = [];
const allUsers = [];
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    if(allMessages.length >= 100){  
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

http.listen(port, function(){
    console.log(`listening on ${port}`);
})