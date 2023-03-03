const express = require('express');
const serveIndex = require('serve-index');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3030;

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.set('view engine', 'jade');

//Example of Middle-ware
app.use('/request-type', (req, res, next) => {
    console.log('Request type: ', req.method);
    next();
});

//routes
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/shop', function (req, res) {
    res.render('shop');
});
app.get('/skateboard', function (req, res) {
    res.render('skateboard');
});
app.get('/clothing', function (req, res) {
    res.render('clothing');
});
app.get('/create', function (req, res) {
    res.render('create');
});
app.get('/item', function (req, res) {
    res.render('item');
});
app.get('/login', function (req, res) {
    res.render('login');
});
app.get('/accessories', function (req, res) {
    res.render('accessories');
});
app.get('/cart', function (req, res) {
    res.render('cart');
});
app.get('/test', (req, res) => {
    res.render('test');
});

//Setting the port
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});