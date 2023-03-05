
const products = [
    {
        name: "Baker Skateboard Deck",
        price: '$' + 65.21,
        image: 'public/img/products/bakerboard.png'
    },
    {
        name: "Powell Peralta Ripper Skateboard Deck",
        price: '$' + 43.00,
        image: 'public/img/products/powellboard.png/'
    },
    {
        name: "Real Skateboard Deck",
        price: '$' + 69.00,
        image: 'public/img/products/realboard.png'
    },
    {
        name: "ACE AF1 Skateboard Trucks - Gold (Set of 2)",
        price: '$' + 62.95,
        image: 'public/img/products/Acetrucks.png'
    },
    {
        name: "ACE AF1 Skateboard Trucks - Polished (Set of 2)",
        price: '$' + 62.95,
        image: 'public/img/products/AceTrucks2.png'
    },
    {
        name: "Spitfire Formula Four 52mm Connical Skateboard Wheels",
        price: '$' + 38.99,
        image: 'public/img/products/4wheels.png'
    },
    {
        name: "54mm 84B P5 SPF Sidecut BONES WHEELS Skateboard Wheels- Ripples, White (4pack)",
        price: '$' + 25.21,
        image: 'public/img/products/boneswheels.png'
    },
    {
        name: "54mm 93a Powell Peralta Skateboard Wheels- Dragons (Set of 4)",
        price: '$' + 54.13,
        image: 'public/img/products/dragonwheels.png'
    },
    {
        name: "1″ Enjoi- Colorful Little Buddies Bolts Hardware",
        price: '$' + 5.95,
        image: 'public/img/products/hardware.png'
    },
    {
        name: "Toy Machine X Independent Grip Tape Sheet- Assorted Knuckle Tats",
        price: '$' + 14.95,
        image: 'public/img/products/Griptape1.png'
    },
    {
        name: "10″ Wide Clear Mob Skateboard Grip Tape by the Foot",
        price: '$' + 3.95,
        image: 'public/img/products/Griptape2.png'
    },
    {
        name: "House of Decks Zip-Up Hoodie",
        price: '$' + 46.49,
        image: 'public/img/products/hoodie.png'
    },
    {
        name: "Pig Wheels- Pig Head Skate Wax",
        price: '$' + 7.95,
        image: 'public/img/products/wax.png'
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