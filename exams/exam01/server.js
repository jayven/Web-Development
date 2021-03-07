const express = require('express');
const app = express();
const PORT = 3000;

const game = require('./game');
const gameWeb = require('./game-web');
const words = require('./words');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    let userId = req.query.userId;
    let gameOver = false;

    if(userId && game.users[userId]) {  
        gameOver = game.users[userId].gameOver;  
    } else {
        do{
            userId = Math.floor(Math.random() * 1000);
        } while(game.users[userId]);
        game.newUser(userId, words);
    } 
    
    res.send(gameWeb.gamePage({ game, words, userId, gameOver }));
    
});

app.post('/guessGame', express.urlencoded({ extended: false }), (req, res) => {
    const { guess, userId } = req.body;
    game.gameResult({ userId, guess, words });
    res.redirect('/?userId=' + userId);
});

app.post('/restartGame', express.urlencoded({ extended: false }), (req, res) => {
    const { userId }= req.body;
    game.deleteUser(userId)
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Listen on the http://localhost:${PORT}`);
});