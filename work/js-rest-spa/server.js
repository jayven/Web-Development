const express = require('express');
const app = express();
const PORT = 3000;

const inventory = require('./model/inventory');

app.use(express.static('./public'));


//get the list of items
app.get('/items', (req, res) => {
    res.json(Object.values(inventory.items));
});

//add an item
app.post('/items', express.json(), (req, res) => {

    const { itemName, quantity } = req.body;
    if(!itemName || itemName.trim() === '') {
        res.status(400).json({ errorCode: 'missing-item-name' });
        return;
    }

    if(inventory.itemExisting(itemName)) {
        res.status(409).json({ errorCode: 'duplicate-name' });
        return;
    }

    if(isNaN(quantity) || quantity < 0) {
        res.status(400).json({ errorCode: 'invalid-quantity' });
        return;
    }
    
    do {
        var itemId = Math.floor(Math.random() * 1000);
    } while(inventory.items[itemId])

    inventory.items[itemId] = { itemId, itemName, quantity };
    res.json(Object.values(inventory.items));
});

//update an item
app.patch('/items/:itemid', express.json(), (req, res) => {

    const itemId = req.params.itemid;
    const { action } = req.body;
    if(!inventory.items[itemId]) {
        res.status(404).json({ errorCode: 'missing-item' });
        return;
    }

    if(!action) {
        res.status(400).json({ errorCode: 'missing-quantity'});
        return;
    } else {
        if (action == 'increase') {
            inventory.items[itemId].quantity++;
        } else if (action == 'decrease') {
            inventory.items[itemId].quantity--;
        } 
        res.json(Object.values(inventory.items));
    }
});

//remove an item
app.delete('/items/:itemid', (req, res) => {

    const itemId = req.params.itemid;
    if(!inventory.items[itemId]) {
        res.status(404).json({ errorCode: 'missing-item' });
        return;
    }

    delete inventory.items[itemId];
    res.json(Object.values(inventory.items));
});

app.listen(PORT, () => {
    console.log(`Listen on the http://localhost:${PORT}`);
});