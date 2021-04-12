import './App.css';
import React, {useState, useEffect } from 'react';
import { fetchFacts } from './services';
import ShowFacts from './ShowFacts';
import Page from './Page';

function App() {
  const [pageStatus, setPageStatus] = useState({isLoaded: false, isInitial: true});

  const initial = function({facts, factCount}) {
    setPageStatus({
      isLoaded: true,
      isInitial: false,
      facts,
      factCount,
    });
  };

  let content;

  if (pageStatus.isInitial) {
    content = <Page onLoading={initial} />
  } else {
    content = <ShowFacts facts={pageStatus.facts} factCount={pageStatus.factCount}/>
  }

  return (
    <div className="app">
      {content}
    </div>
  );
}

export default App;
