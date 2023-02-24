//Password functions
const saltyHash = (password) => {
    const salt = ':m-vUM#BUv/F*urK'; //The salt should be hidden but idk how
    const algo = CryptoJS.algo.SHA256.create();

    algo.update(password, "utf-8");
    algo.update(CryptoJS.SHA256(salt), "utf-8");

    const hash = algo.finalize().toString(CryptoJS.enc.hex);
    return hash;
}

const compareHash = (password, dbHash) => {
    const clientHash = saltyHash(password);

    for (let i = 0; i < dbHash.length; i++) {
        const letter = clientHash[i];
        if (letter != dbHash[i]) {
            return false;
        }
    }
    return true;
}

