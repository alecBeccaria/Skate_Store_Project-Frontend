const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const data = require('./data');
const { saltyHash, BasicAuth } = require('./auth');
const { products } = require('./script');
const auth = require('./auth');
const file_upload = require('express-fileupload');
const fs = require('node:fs/promises');
const { contains_id, replace_item, cart_total } = require('./utils');
const utils = require('./utils');

router.use(file_upload());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function (req, res, next) {
    res.locals.user = req.cookies.userCookie;
    next();
})

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
router.get('/cart', async (req, res) => {
    let user = req.cookies.userCookie;
    for (let i = 0; i < user.cart.length; i++) {
        let cartItem = user.cart[i];
        let product = await data.get_shop_item(cartItem.item_id);
        product.quantity = cartItem.quantity;
        user.cart[i] = product;
    }

    res.render('cart', { user: user, cart_total: cart_total(user.cart), shipping: 5.53 });
});
router.get('/test', (req, res) => {

    res.render('test');
});
router.get('/signup', (req, res) => {
    res.render('signup')
});
router.get('/logout', (req, res) => {
    res.clearCookie('userCookie');
    res.redirect('/login')
});

//Goes to specific Item page
router.get('/shop/product/:item_id', async (req, res) => {
    const item_id = req.params.item_id;
    
    const product = await data.get_shop_item(item_id);
    
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
    if (response.body !== undefined) {
        res.cookie("userCookie", response.body, { maxAge: 86400 * 1000 });
        res.redirect('/');
    } else {
        res.render('login', { message: "Incorrect Login" });
    }

});


router.post('/signup', (req, res) => {
    let user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    user.password = saltyHash(user.password);
    data.user_post(user);

    res.redirect('/login');
});

//This up loaded a list of objects to DynamoDb
router.post('/item/add', async (req, res) => {
    const user = req.cookies.userCookie;

    const product = req.body;
    if (req.files) {
        let image = req.files.image;
        let filename = image.name;
        let location = './uploads/' + filename;


        image.mv(location, async (err) => {
            if (!err) {
                product.image = location
                if (user === undefined) {
                    res.render('login', { message: "you are not authorized to do this!" });
                } else {
                    if (user.role === 'user') {
                        res.render('login', { message: "you are not authorized to do this!" });
                    } else {
                        user_auth = BasicAuth(user.username, user.password);
                        let item_response = await data.item_post(product, user_auth)
                        try {
                            await fs.unlink(location);
                            console.log('temp image file removed');
                        } catch (err) {
                            console.error('There was an error' + err.message);
                        }
                        res.redirect('/test');
                    }
                }
            } else {
                console.log(err);
                res.send('err occured');
            }
        })
    }
});

router.post('/email', async (req, res) => {
    let email = req.body.email;
    await data.send_email(email, 'Buy our stuff plzz!');
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

router.post('/shop/product/:item_id/addtocart', (req, res) => {
    let cartItem = {
        quantity: req.body.quantity,
        size: req.body.size,
        item_id: req.params.item_id
    };
    let user = req.cookies.userCookie;
    console.log(user.cart);

    if (user) {
        contains = contains_id(user.cart, cartItem.item_id);
        if (contains) {
            user.cart = replace_item(user.cart, cartItem);
        } else {
            user.cart.push(cartItem);
        }
        res.cookie("userCookie", user, { maxAge: 86400 * 1000 });
        res.redirect(`/shop/product/${cartItem.item_id}/`);
    } else {
        res.render('login', { message: "You need to be logged in to add to cart" })
    }
});

router.post('/cart/buy', (req, res) => {
    const user = req.cookies.userCookie;
    const basic_auth = process.env.ADMIN_AUTH;
    data.user_put(user, basic_auth);
    data.send_email(user.email, "Thank you for your purchase!");
    res.redirect('/cart');
});

router.post('/cart/remove/:item_id', (req, res) => {
    const user = req.cookies.userCookie;
    user.cart = utils.remove_item(user.cart, req.params.item_id);
    res.cookie('userCookie', user, { maxAge: 86400 * 1000 });
    res.redirect('/cart');
})

module.exports = router;