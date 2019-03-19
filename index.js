var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var session = require('express-session');

var Web3 = require('web3');
var contract = require('truffle-contract');

const fileUpload = require('express-fileupload');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var app = new express();
var port = 3000;

app.listen(port, function(err) {
    if (typeof(err) == "undefined") {
        console.log("Your application is running on port " + port);
    }
});

var menu = [{
        href: '/',
        text: 'Home'
    },
    {
        href: '/#about',
        text: 'About Us'
    },
    {
        href: '/#contact',
        text: 'Contact Us'
    }
];

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'reviewmethereum', resave: true, saveUninitialized: true }));
app.use(fileUpload());

require('./src/configuration/passport')(app, passport);

var registerRouter = require('./src/routes/registrationRoute')(web3);
var profileRouter = require('./src/routes/profileRoute')();
var reviewerRouter = require('./src/routes/reviewerRoute')();

var uploadRouter = require('./src/routes/uploadRoute')(web3);
var yesnoRouter = require('./src/routes/yesnoRoute')(web3);
var buyTRouter = require('./src/routes/buyTRoute')(web3);
var sellTRouter = require('./src/routes/sellTRoute')(web3);


app.use('/register', registerRouter);
app.use('/u', reviewerRouter);
app.use('/p', profileRouter);

app.use('/review', yesnoRouter);
app.use('/upload', uploadRouter);
app.use('/buyTokens', buyTRouter);
app.use('/sellTokens', sellTRouter);


app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if (req.user) {
        res.redirect('/u');
    } else {
        res.render('index', {
            title: "SmartReviewer",
            heading: "The next generation conference paper reviewing system",
            navMenu: menu
        });
    }

});

app.post('/',
    passport.authenticate('local', { failureRedirect: '/' }),
    function(req, res) {
        console.log("Success");
        if (req.user.type == 0) {
            res.redirect('/p');
        } else {
            res.redirect('/u');
        }
    });