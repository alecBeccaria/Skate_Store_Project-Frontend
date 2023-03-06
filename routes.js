const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const data = require('./data');
const { saltyHash, BasicAuth } = require('./auth');
const { products } = require('./script')


router.use(bodyParser.urlencoded({ extended: true }));

//Get routes
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/shop', async (req, res) => {
    let shop = await data.get_shop();
    res.render('shop', { items: shop });
});
router.get('/skateboard', async (req, res) => {
    let decks = await data.get_shop_category('decks');
    //console.log(decks);
    res.render('skateboard', { items: decks });
});
router.get('/clothing', async (req, res) => {
    let clothing = await data.get_shop_category('clothing');
    //console.log(clothing);
    res.render('clothing', { items: clothing });
});
router.get('/item', (req, res) => {
    res.render('item');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/accessories', async (req, res) => {
    let accessories = await data.get_shop_category('accessories');
    //console.log(accessories);
    res.render('accessories', { items: accessories });
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

//Goes to specific Item page
router.get('/shop/product/:item_id', async (req, res) => {
    const item_id = req.params.item_id;
    //console.log(item_id);
    const product = await data.get_shop_item(item_id);
    //console.log(product);
    res.render('product', {
        product: product
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
});

//This up loaded a list of objects to DynamoDb
router.post('/test', (req, res) => {
    let password = saltyHash('password');
    let basic_auth = BasicAuth('abecc', password);

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        data.item_post(product, basic_auth)
    }
    res.redirect('/test');
});

router.post('/email', async (req,res) => {
    let email = req.body.email;
    const response = await data.send_email(email);
    res.render('subscribed');
});


router.post('/sproduct', (req, res) => {
    let product = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
    }

    // console.log(user);
    data.user_post(product);
});



module.exports = router;