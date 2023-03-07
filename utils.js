const contains_id = (array, to_find) => {
    for (let i = 0; i < array.length; i++) {
        id = array[i].item_id;
        if (id == to_find) {
            return array[i];
        }
    }
    return false;
}

const replace_item = (array, item) => {
    for (let i = 0; i < array.length; i++) {
        id = array[i].item_id;
        if (id == item.item_id) {
            array[i] = item;
            return array;
        }
    }
    return false;
}

const remove_item = (array, item_id) => {
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if(item.item_id === item_id) {
            array.splice(i, 1);
        }        
    }
    return array;
}

const cart_total = (cart) => {
    let total = 0;
    for(let i = 0; i<cart.length; i++) {
        const item = cart[i];
        total += parseFloat(item.price * item.quantity);
    }
    return total;
}

module.exports = {
    contains_id: contains_id,
    replace_item: replace_item,
    cart_total: cart_total,
    remove_item: remove_item
}