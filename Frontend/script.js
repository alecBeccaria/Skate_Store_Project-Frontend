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

var password = "password";
var compare = password;

compare = saltyHash(compare);

console.log(password, compare);
console.log(compareHash(password, compare));
