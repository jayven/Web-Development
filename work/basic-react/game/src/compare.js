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

module.exports = compare;