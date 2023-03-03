const express = require('express');
const router = express.Router();
const auth = require('./auth');
const bodyParser = require('body-parser');
const data = require('./data');
const { saltyHash } = require('./auth');


router.use(bodyParser.urlencoded({ extended: true }));

//Get routes
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/shop', (req, res) => {
    res.render('shop');
});
router.get('/skateboard', (req, res) => {
    res.render('skateboard');
});
router.get('/clothing', (req, res) => {
    res.render('clothing');
});
router.get('/create', (req, res) => {
    res.render('create');
});
router.get('/item', (req, res) => {
    res.render('item');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/accessories', (req, res) => {
    res.render('accessories');
});
router.get('/cart', (req, res) => {
    res.render('cart');
});
router.get('/test', (req, res) => {
    res.render('test');
});
router.get('/signup', (req, res) => {
    res.render('signup')
})

//Post routes
router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = saltyHash(req.body.password);
    let basic_auth = auth.BasicAuth(username, password);

    data.user_get(username, basic_auth);

    res.redirect('/login');
});

router.post('/signup', (req, res) => {
    let user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    user.password = auth.saltyHash(user.password);
    
    console.log(user);
    data.user_post(user);
    
    res.redirect('/login');
})

module.exports = router;