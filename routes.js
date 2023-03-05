const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const data = require('./data');
const { saltyHash, BasicAuth } = require('./auth');


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
});

//Prodyct Js,

const product1 = {
    category: "Skateboarding",
    namer: "Baker Skateboard Decs",
    price: '$' + 65.21,
    image: 'img/products/bakerboard.png',
    details: ' '
};
router.get('/product', (req, res) => {
    res.render('product', {
        category: product1.category,
        namer: product1.namer,
        price: product1.price,
        image: product1.image,
        details: product1.details
    })
});


//Post routes
router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = saltyHash(req.body.password);
    let basic_auth = BasicAuth(username, password);

    let response = await data.user_get(username, basic_auth);
    console.log(response);
    res.cookie("userCookie", response.body, { maxAge: 86400 * 1000 });


    res.redirect('/login');
});

router.post('/signup', (req, res) => {
    let user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    user.password = saltyHash(user.password);

    console.log(user);
    data.user_post(user);

    res.redirect('/login');
})

router.post('/sproduct', (req, res) => {
    let product = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
    }

   // console.log(user);
    data.user_post(product);

    res.redirect('/login');
})

module.exports = router;