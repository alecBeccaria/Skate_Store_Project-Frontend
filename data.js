const cloudinary = require('cloudinary').v2;
const { BasicAuth, saltyHash } = require('./auth');





cloudinary.config({
    cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY
});




const fetchData = async (url, method, data) => {
    if (!url) return 'Error, url was not provided!';
    if (!method) return 'Error, request method was not provided!';

    //Headers to be sent in request
    var request = {
        mode: 'cors',
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }

    }

    if (method !== 'GET') {
        request.body = JSON.stringify(data.body);
    }

    // Checks to see if data object had authorization included and if true adds auth header.
    if (data['authorization']) {
        request.headers.authorization = data['authorization'];
    }


    //console.log(request);
    //console.log("Line 40 in data.js");
    //This is where we actually call the server.
    try {
        const response = await fetch(url, request);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        return {
            message: 'The server had an error.',
            error: error
        };
    }
}

const user_get = async (username, auth) => {
    const response = await fetchData(`https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/user/${username}`, 'GET', { authorization: auth, body: {} })
    return response;
}

const user_delete = async (username, auth) => {
    const response = await fetchData(`https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/user/${username}`, 'DELETE', { authorization: auth, body: {} })
    console.log(response);
    return response;
}

const user_put = async (user, auth) => {
    const response = await fetchData(`https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/user/${user.username}`, 'PUT', {
        authorization: auth,
        body: {
            "password": user.password,
            "email": user.email,
            "cart": user.cart
        }
    })
    return response;
}

const user_post = async (user) => {
    const response = await fetchData('https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/user', 'POST', {
        body: {
            username: user.username,
            email: user.email,
            password: user.password
        }
    });

    console.log(response);
}

const item_post = async (item, auth) => {
    cloudinaryResponse = await upload_image(item);
    item.image = cloudinaryResponse.secure_url;
    item.price = item.price.toString();

    const response = await fetchData('https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/admin/item', 'POST', {
        authorization: auth,
        body: item
    });

    return response;
}

const get_shop = async () => {
    const response = await fetchData('https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/shop', 'GET', {
        body: {}
    });

    return response;
}

const get_shop_category = async (category) => {
    const response = await fetchData(`https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/shop/category/${category}`, 'GET', {
    });

    return response;
}

const get_shop_item = async (id) => {
    const response = await fetchData(`https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/shop/item/${id}`, 'GET', {
    });

    return response;
}


const upload_image = (item) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(item.image, { public_id: item.name }, (err, url) => {
            if (err) return reject(err);
            return resolve(url);
        })
    });
}

const send_email = async (email, body) => {
    const response = await fetchData('https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/email', 'POST', {
        body: {
            email: {
                sent_to: [
                    email
                ],
                body: body
            }
        }
    });
    return response;
}

module.exports = {
    fetchData: fetchData,
    user_get: user_get,
    user_post: user_post,
    user_delete: user_delete,
    user_put: user_put,
    item_post: item_post,
    get_shop: get_shop,
    get_shop_category: get_shop_category,
    get_shop_item: get_shop_item,
    send_email: send_email
}

