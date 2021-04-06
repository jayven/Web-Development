"use strict";
const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;

const recipes = require('./recipes');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));


// Login & Logout session
app.get('/session', (req, res) => {
    const uid = req.cookies.uid;
    if (!uid || !users[uid]) {
        res.status(401).json({ errorCode: 'missing-user'});
        return;
    }
    res.sendStatus(200);
});

app.post('/session', express.json(), (req, res) => {
    const username = req.body.username.replace(/[^A-Za-z0-9_ ]/g, '');

    if (!username || username.includes('dog') || username.includes(' ')) {
        res.status(400).json({ errorCode: 'invalid-username' });
        return;
    }

    const uid = uuidv4();
    res.cookie('uid', uid);
    users[uid] = { username };
    const recipeInfo = recipes.getRecipeInfo();
    res.json(recipeInfo);
});

app.delete('/session', (req, res) => {
    const uid = req.cookies.uid;
    delete users[uid];
    res.clearCookie('uid');
    res.sendStatus(200);
});


//recipes panel
app.get('/recipes', (req, res) => {
    const recipeInfo = recipes.getRecipeInfo();
    res.json(recipeInfo);
});

app.get('/recipes/:recipeId', (req, res) => {
    const recipeId = req.params.recipeId;
    if (!recipes.recipeList[recipeId]) {
        res.status(404).json({ errorCode: 'missing-recipe' });
        return;
    }
    const recipeDetails = recipes.recipeList[recipeId];
    res.json(recipeDetails);
});

app.get('/newRecipe', (req, res) => {
    const uid = req.cookies.uid;
    if(!uid || !users[uid]) {
        res.status(401).json({ errorCode: 'missing-user'});
        return;
    }
    res.sendStatus(200);
});

app.post('/newRecipe', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    if (!uid || !users[uid]) {
        res.status(401).json({ errorCode: 'missing-user'});
        return;
    }
    const author = users[uid].username;
    const { title, ingredients, instructions } = req.body;
    if (!title || !ingredients || !instructions) {
        res.status(400).json({ errorCode: 'missing-content'});
        return;
    }

    let recipeId;
    do {
        recipeId = Math.floor(Math.random() * 1000);
    } while (recipes.recipeList[recipeId]);

    recipes.addRecipe({ recipeId, title, author, ingredients, instructions });

    res.json(recipes.recipeList[recipeId]);
});


app.listen(PORT, () => console.log(`Listen on the http://localhost:${PORT}`));
