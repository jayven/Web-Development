"use strict";
const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;

const items = require('./items.js');

app.use(express.static('./public'));
app.use(cookieParser());


app.get("/session", (req, res) => {
    const uid = req.cookies.uid;
    if (!uid) {
        res.status(403).json({ code: 'provide-error' });
        return;
    }
    if (!items.users[uid]) {
        res.clearCookie("uid");
        res.status(403).json({ code: 'provide-error' });
        return;
    }

    res.json(items.users[uid]);
    res.sendStatus(200);
});

//user login
app.post('/session', express.json(), (req,res) => {
    const {username} = req.body;
    if (!username || username.includes(' ') || username.includes('dog')) {
        res.status(400).json( {errorCode: 'invalid-username'});
        return;
    }
    const uid = uuidv4();
    res.cookie('uid', uid);
    items.users[uid] = {username};
    res.status(200).json(items);
});

//user logout
app.delete('/session', (req,res) => {
    const uid = req.cookies.uid;
    delete items.users[uid];
    res.clearCookie('uid');
    res.sendStatus(200);
});

//get the list of items
app.get('/items', (req, res) => {
    cconst uid = req.cookies.uid;
    if(!uid || !items.users[uid]) {
        res.clearCookie('uid');
        res.status(403).json( {errorCode: 'missing-user'});
        return;
    }
    res.status(200).json(items);
});

//add an item
app.post('/item', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    const { text } = req.body;

    if(!uid || !items.users[uid]) {
        res.clearCookie('uid');
        res.status(403).json( {errorCode: 'missing-user'});
        return;
    }
    
    if(!text || text.trim() === '') {
        res.status(400).json({ errorCode: 'missing-item-name' });
        return;
    }

    while (true) {
        var itemId = Math.floor(Math.random() * 1000);
        if (!items.itemList[itemId]) {
            break;
        }
    }

    const sender = items.users[uid].username;
    let score = 1;
    items.itemList[itemId] = { itemId, sender, text, score };
    res.status(200).json(items.itemList);
});

//update an item
app.patch('/items/:itemid', express.json(), (req, res) => {

    const itemId = req.params.itemId;
    const action = req.body.action;
    if (action == 'increase') {
        items.itemList[itemId].score ++;
    } else if (action == 'decrease') {
        items.itemList[itemId].score --;
    } 
    res.status(200).json(items.itemList[itemId]);
    
});

//remove an item
app.delete('/items/:itemid', (req, res) => {

    const uid = req.cookies.uid;
    const itemId = req.params.itemId;
    if(!uid || !items.users[uid]) {
        res.clearCookie('uid');
        res.status(403).json( {errorCode: 'missing-user'});
        return;
    }

    delete items.itemList[itemId];
    res.status(200).json(items.itemList);
});

app.listen(PORT, () => {
    console.log(`Listen on the http://localhost:${PORT}`);
});