const users = {};

function newUser(userId, words) {
    const secretWord = pickSecretWord(words);
    users[userId] = { 
        "secretWord": secretWord, 
        gameOver: false,
        "wordsGuessed": [],
        "turns": 0, 
        "showResult": "", 
    };
    console.log(secretWord);
}

function deleteUser(userId) { 
    delete users[userId];     
}

function pickSecretWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function compare(guess, secretWord) {
    let matches = 0;
    const letterCount = {};

    for( let letter of secretWord.toUpperCase() ) {
        letterCount[letter] = letterCount[letter] + 1 || 1;
    }

    for( let letter of guess.toUpperCase() ) {
        if( letterCount[letter] ) {
            letterCount[letter] -= 1;
            matches += 1;
        }
    }
    return matches;
}

function gameResult({ userId, guess, words }) {
    guess = guess.toUpperCase();
    const secretWord = users[userId].secretWord;

    if(words.indexOf(guess) === -1 ) {
        users[userId].showResult = `Invaild word! Please enter a new one.`;
        return;
    }

    users[userId].turns ++;
    const match = compare(guess, secretWord);
    if(exactMatch(guess, secretWord)) {
        users[userId].wordsGuessed.push(guess); 
        users[userId].gameOver = true; 
        users[userId].showResult = `Fantastic! You got the correct word in ${users[userId].turns} turns! Please start a new one`;
        return;
    }

    
    users[userId].wordsGuessed.push(guess);
    users[userId].showResult = `You matched ${match} letters out of ${secretWord.length}, please try again!`; 
}


function exactMatch(guess, secretWord) {
    return guess.toUpperCase() === secretWord.toUpperCase();
}

const game = {
    users,
    newUser,
    deleteUser,
    gameResult,
    compare
};

module.exports = game;