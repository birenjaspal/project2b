var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wificity';
port = process.env.PORT || 3000;


app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret: "feedmeseymour", //some random string
    resave: false,
    saveUninitialized: false
}));
app.use(express.static("public"));

var usersController = require('./controllers/users.js');
app.use('/users', usersController);

var sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

var wificityController = require('./controllers/wificity.js');
app.use('/wificity', wificityController);

app.get('/', function(req, res){
    res.render('index.ejs', {
        currentUser: req.session.currentuser
    });
});

app.get('/app', function(req, res){
    if(req.session.currentuser){
        res.send('the party');
    } else {
        res.redirect('/sessions/new');
    }
});

mongoose.connect(mongoUri);

mongoose.connection.once('open', function(){
    console.log('connected to mongo');
});

app.listen(port);
console.log('---------------------------------');
console.log('Server running on port: ' + port);
console.log('---------------------------------');
