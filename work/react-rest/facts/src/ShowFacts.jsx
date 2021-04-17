import React, {useState} from 'react';
import './App.css';

const ShowFacts = function({ facts, factCount }) {
    const [numberOfFacts, setNumberOfFacts] = useState(parseInt(factCount));
    const [start, setStart] = useState(1);

    const onChange = (e) => {
        setNumberOfFacts(parseInt(e.target.value));
    };

    const previous = () => {
        if (start - numberOfFacts < 1){
            setStart(1);
        } else {
            setStart(start - numberOfFacts);
        }
    };
    const next = () => {
        setStart(start + numberOfFacts);
    };

    const factsOnShow = facts.slice(start - 1, start + numberOfFacts - 1);
    const listFacts = factsOnShow.map( (fact) => <li> { fact } </li> );

    return (
    <div>
        <h3 className="title">{facts.length} Facts Loaded</h3>
        <p
            className="show-per-page">
            Showing Facts {start < 1 ? 1 : start} ~ {start + numberOfFacts - 1 < facts.length ? start + numberOfFacts - 1 : facts.length}
        </p>
        <label className="dropdown-label">Facts per page: </label>
        <select className="dropdown" onChange={onChange}>
            <option value={0}>Facts Number</option>
            <option value={5}> 5 </option>
            <option value={10}> 10 </option>
        </select>
        <ul className="facts-list">{ listFacts }</ul>
        <button className="previous-button" onClick={ previous } disabled={start === 1}> Previous </button>
        <button className="next-button" onClick={ next } disabled={start + numberOfFacts - 1 >= facts.length}> Next </button>
    </div>
    );
};

export default ShowFacts;