const items = {
    "1": {
        itemId: "1",
        itemName: "banana",
        quantity: 10,  
    },

    "2": {
        itemId: "2",
        itemName: "lemon",
        quantity: 5,
    }
};

function itemExisting(itemName) {
    const itemList = Object.values(items);
    for( let item of itemList ) {
        if(itemName === item.itemName) {
            return true;
        }
    }
    return false;
}

const inventory = {
    items,
    itemExisting,
}

module.exports = inventory;