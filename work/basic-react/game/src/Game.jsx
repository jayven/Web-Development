import {useState} from 'react';
import Result from './Result';
import PlayAgain from './PlayAgain';
import './style.css';


function Game() {
	const [word, setWord] = useState('');
    const updateWord = (e) => {
    	setWord(e.target.value);
    };
    const [userGuess, setGuess] = useState('');
    const reset = () => {
    	setGuess('');
  	};
    return (
        <div className="guess-game">
            <Result userGuess={userGuess}/>
            <div className="guess-panel">
                <input onChange={ updateWord } value={word}/>
                <button onClick={() => {setGuess(word); setWord('');}} disabled={word.length === 0} > Play </button>
                <PlayAgain onReset={reset}/>
            </div>
        </div>
    );
};

export default Game;
