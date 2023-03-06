
const products = [
    {
        name: "Baker Skateboard Deck",
        price: 65.21,
        image: 'public/img/products/bakerboard.png',
        category: '',
        description: '',
        manufacturer: ''
    },
    {
        name: "Powell Peralta Ripper Skateboard Deck",
        price: 43.00,
        image: 'public/img/products/powellboard.png',
        category: '',
        description: '',
        manufacturer: ''
    },
    {
        name: "Real Skateboard Deck",
        price: 69.00,
        image: 'public/img/products/realboard.png',
        category: '',
        description: '',
        manufacturer: ''
    },
    {
        name: "ACE AF1 Skateboard Trucks - Gold (Set of 2)",
        price: 62.95,
        image: 'public/img/products/Acetrucks.png',
        category: '',
        description: '',
        manufacturer: ''
    },
    {
        name: "ACE AF1 Skateboard Trucks - Polished (Set of 2)",
        price: 62.95,
        image: 'public/img/products/Acetrucks2.png',
        category: '',
        description: '',
        manufacturer: ''
    },
    {
        name: "Spitfire Formula Four 52mm Connical Skateboard Wheels",
        price: 38.99,
        image: 'public/img/products/4wheels.png',
        category: '',
        description: '',
        manufacturer: ''
    },
    {
        name: "54mm 84B P5 SPF Sidecut BONES WHEELS Skateboard Wheels- Ripples, White (4pack)",
        price: 25.21,
        image: 'public/img/products/boneswheels.png',
        category: '',
        description: '',
        manufacturer: ''
    },
    {
        name: "54mm 93a Powell Peralta Skateboard Wheels- Dragons (Set of 4)",
        price: 54.13,
        image: 'public/img/products/dragonwheels.png',
        category: '',
        description: '',
        manufacturer: ''
    },
    {
        name: "1″ Enjoi- Colorful Little Buddies Bolts Hardware",
        price: 5.95,
        image: 'public/img/products/hardware.png',
        category: '',
        description: '',
        manufacturer: ''
    },
    {
        name: "Toy Machine X Independent Grip Tape Sheet- Assorted Knuckle Tats",
        price: 14.95,
        image: 'public/img/products/Griptape1.png',
        category: '',
        description: '',
        manufacturer: ''
    },
    {
        name: "10″ Wide Clear Mob Skateboard Grip Tape by the Foot",
        price: 3.95,
        image: 'public/img/products/Griptape2.png',
        category: '',
        description: '',
        manufacturer: ''
    },
    {
        name: "House of Decks Zip-Up Hoodie",
        price: 46.49,
        image: 'public/img/products/hoodie.png',
        category: '',
        description: '',
        manufacturer: ''
    },
    {
        name: "Pig Wheels- Pig Head Skate Wax",
        price: 7.95,
        image: 'public/img/products/wax.png',
        category: '',
        description: '',
        manufacturer: ''
    }
]



function addToCart() {
    alert("Added to cart!");
    document.getElementById("nametd").innerHTML = product1.name;
    document.getElementById("pricetd").innerHTML = product1.price;
    const image = document.querySelector(".image");
    image.src = product1.image;
}

module.exports = {
    products
};