
const product1 = {
    name: "Baker Skateboard Deck",
    price: '$' + 65.21,
    image: 'img/products/bakerboard.png'
};


function addToCart() {
    alert("Added to cart!");
    document.getElementById("nametd").innerHTML = product1.name;
    document.getElementById("pricetd").innerHTML = product1.price;
    const image = document.querySelector(".image");
    image.src = product1.image;
}

//Fetch function
const fetchData = async (url, method, data = { Authorization: '', body: {} }) => {
    if (!url) return 'Error, url was not provided!';
    if (!method) return 'Error, request method was not provided!';

    //Headers to be sent in request
    var request = {
        mode: 'cors',
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        }
    }

    if (method !== 'GET') {
        request.body = JSON.stringify(data.body);
    }

    //Checks to see if data object had Authorization included and if true adds auth header.
    if (data['Authorization']) {
        request.Authorization = data['Authorization'];
    }

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

// Just testing stuff to prove it works
var password = "password";
var compare = password;

compare = saltyHash(compare);

console.log(password, compare);
console.log(compareHash(password, compare));

//Methods have to be full caps!
const response = fetchData('https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/user/alec', 'GET', {Authorization: 'Basic YWxlYzpwYXNzd29yZA==', body: {}})
console.log(response);
