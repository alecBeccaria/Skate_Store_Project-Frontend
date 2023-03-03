const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3030;

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use(require('./routes'));
app.set('view engine', 'jade');

//Example of Middle-ware
app.use('/request-type', (req, res, next) => {
    console.log('Request type: ', req.method);
    next();
});




//Setting the port
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});