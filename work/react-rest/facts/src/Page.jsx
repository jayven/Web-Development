import React, {useState} from 'react';
import {fetchFacts} from './services';
import './App.css';

const Page = function({onLoading}) {
    // We store the name-in-progress locally in this component state
    const [facts, setFacts] = useState([]);
    const [status, setStatus] = useState('');
    const [factCount, setFactCount] = useState(0);
    const [isPending, setIsPending] = useState(false);

    const onChange = (e) => {
        setFactCount(e.target.value);
    };

    const loadFacts = () => {
        setIsPending(true);
        fetchFacts()
        .then( facts => {
            setStatus('');
            setIsPending(false);
            onLoading({ facts, factCount });
            setFacts(facts);
        })
        .catch(err => {
            setStatus(err.error);// TODO: convert to friendly message
            setIsPending(false);
        });
    };

    return (
        <div className="page">
            { status && <div className="status">{status}</div>}
            <h3> 0 Fact Loaded </h3>
            <label>
                Facts per page:
                <select className="dropdown" onChange={onChange}>
                    <option value={0}>Facts Number</option>
                    <option value={5}> 5 </option>
                    <option value={10}> 10 </option>
                </select>
            </label>
            <button onClick={loadFacts} disabled={isPending} >{ isPending ? "Loading..." : "Load Facts"}</button>
        </div>
    );
};

export default Page;