const express = require('express');
const serveIndex = require('serve-index');
const path = require('path');


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.set('view engine', 'jade');

app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

app.use('/request-type', (req, res, next) => {
    console.log('Request type: ', req.method);
    next();
});


app.get('/', function (req, res) {
    res.render('index', {
        var1: 'val1',
        var2: 'val2'
    });
});
app.get('/test', (req, res) => {
    res.render('test');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));