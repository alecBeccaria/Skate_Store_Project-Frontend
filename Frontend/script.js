
const product1 = {
  name: "Baker Skateboard Deck",
  price: '$'+65.21,
  image: 'img/products/bakerboard.png'
};




    function addToCart() {
        alert("Added to cart!");
        document.getElementById("nametd").innerHTML = product1.name;
        document.getElementById("pricetd").innerHTML = product1.price;
        const image = document.querySelector(".image");
        image.src = product1.image;
    }

    

