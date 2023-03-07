const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3030;

app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(express.static('public'));
app.use(require('./routes'));
app.set('view engine', 'pug');

//Example of Middle-ware
app.use('/request-type', (req, res, next) => {
    next();
});


//Setting the port
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});