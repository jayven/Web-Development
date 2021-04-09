import compare from './compare';
import './style.css';


function Result({ userGuess }) {
	const secretWord = "RECAT";
	const match = compare(userGuess, secretWord);
	let result = '';
	if (userGuess.length === 0) {
		result = 'Please enter a word';
	} 
	else if (userGuess.length !== secretWord.length) {
		result = 'was not a valid word';
	}
	if (userGuess.toLowerCase() === secretWord.toLowerCase()){
		result = 'is the secret word!';
	} else	if (userGuess.length === 5) {
		result = 'had '+ match +' letters in common';
	};

	return (
		<div className="result">
			<p> { userGuess } {result} </p>
		</div>
	);

};


export default Result;