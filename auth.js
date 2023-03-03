const CryptoJS = require('crypto-js');


const saltyHash = (password) => {
    const salt = process.env.SALT; //The salt should be hidden but idk how
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

const BasicAuth = (username, password) => {
    let encoded = Buffer.from(username + ':' + password).toString('base64');
    return "Basic " + encoded;
}

module.exports = {
    saltyHash: saltyHash,
    compareHash: compareHash,
    BasicAuth: BasicAuth
};