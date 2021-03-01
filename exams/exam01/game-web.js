const gameWeb = {
    gamePage: function({ game, words, userId, gameOver }) {
        return `
        <!DOCTYPE html>
        <html>
            <head>
              <title>Guess A Word</title>
              <link rel="stylesheet" href="game.css">
            </head>

            <body>
                <div id="game-app">
                    <div class="title">
                        <h2>Guessing Word Game</h2>
                    </div>
                    <div class="display-panel">
                    <div class="rules">
                        <h3>Game Rules:</h3>
                        <ul>
                            <li>Please enter a word to guess the secret word</li>
                            <li>You need to guess the word depends on the result panel</li>
                            <li>The game will not care about case-sensitivity.</li>  
                            <li>Have Fun!</li>
                        </ul>
                    </div>
                        <div class="words">
                            <h3>Please guess the word from the following word list:</h3>
                            <p>${words}</p>
                        </div> 
                        <div class="results">
                            ${gameWeb.getGuessedWords(game, userId)}
                            ${game.users[userId].showResult} 
                        </div>
                            ${gameWeb.getGameStart({ userId, gameOver })}  
                    </div> 
                </div>     
            </body>
        </html>`
    },

    getGameStart: function({ userId, gameOver }) {
        if (!gameOver) {
            return ` 
            <div class="game">
                <form action="/guessGame" method="POST">
                    <input class="word-entery" type="text" name="guess" placeholder="Enter a guess word"/>
                    <button class="guess-button" type="submit">Guess!</button>
                    <input name="userId" value=${userId} type="hidden"/>
                </form>
            <div>`;
        } else {
            return ` 
            <div class="game">
                <form action='/restartGame' method='POST'>
                    <button class="replay-button" type = "submit" name="restart"> Replay! </button>
                    <input name="userId" value=${userId} type="hidden"/>
                </form>
            </div>  `;
        }  
    },

    getGuessedWords: function(game, userId) {
        return `<ul>` + 
            game.users[userId].wordsGuessed.map(guess => {
                return `
                <div>${guess}</div>`;
            }).join('\n') +
            `</ul>`;
    },

}

module.exports = gameWeb;