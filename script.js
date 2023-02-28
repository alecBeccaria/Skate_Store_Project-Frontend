
const product1 = {
    name: "Baker Skateboard Deck",
    price: '$' + 65.21,
    image: 'img/products/bakerboard.png'
};
const product2 = {
    name: "Powell Peralta Ripper Skateboard Deck",
    price: '$' + 43.00,
    image: 'img/products/powellboard.png/'
};
const product3 = {
    name: "Real Skateboard Deck",
    price: '$' + 69.00,
    image: 'img/products/realboard.png'
};
const product4 = {
    name: "ACE AF1 Skateboard Trucks - Gold (Set of 2)",
    price: '$' + 62.95,
    image: 'img/products/Acetrucks.png'
};
const product5 = {
    name: "ACE AF1 Skateboard Trucks - Polished (Set of 2)",
    price: '$' + 62.95,
    image: 'img/products/AceTrucks2.png'
};
const product6 = {
    name: "Spitfire Formula Four 52mm Connical Skateboard Wheels",
    price: '$' + 38.99,
    image: 'img/products/4wheels.png'
};
const product7 = {
    name: "54mm 84B P5 SPF Sidecut BONES WHEELS Skateboard Wheels- Ripples, White (4pack)",
    price: '$' + 25.21,
    image: 'img/products/boneswheels.png'
};
const product8 = {
    name: "54mm 93a Powell Peralta Skateboard Wheels- Dragons (Set of 4)",
    price: '$' + 54.13,
    image: 'img/products/dragonwheels.png'
};
const product9 = {
    name: "1″ Enjoi- Colorful Little Buddies Bolts Hardware",
    price: '$' + 5.95,
    image: 'img/products/hardware.png'
};
const product10 = {
    name: "Toy Machine X Independent Grip Tape Sheet- Assorted Knuckle Tats",
    price: '$' + 14.95,
    image: 'img/products/Griptape1.png'
};
const product11 = {
    name: "10″ Wide Clear Mob Skateboard Grip Tape by the Foot",
    price: '$' + 3.95,
    image: 'img/products/Griptape2.png'
};
const product12 = {
    name: "House of Decks Zip-Up Hoodie",
    price: '$' + 46.49,
    image: 'img/products/hoodie.png'
};
const product13 = {
    name: "Pig Wheels- Pig Head Skate Wax",
    price: '$' + 7.95,
    image: 'img/products/wax.png'
};


function addToCart() {
    alert("Added to cart!");
    document.getElementById("nametd").innerHTML = product1.name;
    document.getElementById("pricetd").innerHTML = product1.price;
    const image = document.querySelector(".image");
    image.src = product1.image;
}

//Fetch function
const fetchData = async (url, method, data = { authorization: '', body: {} }) => {
    if (!url) return 'Error, url was not provided!';
    if (!method) return 'Error, request method was not provided!';

    //Headers to be sent in request
    var request = {
        mode: 'cors',
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + data.authorization
            //'Access-Control-Allow-Origin':'*',
            //'Access-Control-Allow-Headers': 'Content-Type',
            //'Access-Control-Allow-Methods': method
        }

    }

    if (method !== 'GET') {
        request.Body = JSON.stringify(data.body);
    }

    // Checks to see if data object had Authorization included and if true adds auth header.
    if (data['authorization']) {
        request.authorization = data['authorization'];
    }

    //request = JSON.stringify(request);
    console.log(request);
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


//Password functions
const saltyHash = (password) => {
    const salt = ':m-vUM#BUv/F*urK'; //The salt should be hidden but idk how
    const algo = CryptoJS.algo.SHA256.create();

    algo.update(password, "utf-8");
    algo.update(CryptoJS.SHA256(salt), "utf-8");

    const hash = algo.finalize().toString(CryptoJS.enc.hex);
    return hash;
}

const compareHash = (password, compareHash) => {
    password = saltyHash(password);
    return password === compareHash;
}


var response;
const user_get = async (user, auth) => {
    response = await fetchData(`https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/user/${user}`, 'GET', { authorization: auth, body: {} })
    console.log(response);
    return response;
}

const user_delete = async (user, auth) => {
    response = await fetchData(`https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/user/${user}`, 'DELETE', { authorization: auth, body: {} })
    console.log(response);
    return response;
}

const user_put = async (user, auth) => {
    response = await fetchData(`https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/user/${user}`, 'PUT', {
        authorization: auth, body: {
            "password": "password",
            "email": "test",
            "cart": ['test', 'test1']
        }
    })
    console.log(response);
    return response;
}


var response = await user_get('potato', 'cG90YXRvOmVhdGFzcw==');
console.log(response);



