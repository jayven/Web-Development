import React, { useState, useEffect} from 'react';
import '../app.css';
import Login from './Login';
import MainPage from './tasks/MainPage';
import { checkSession } from '../services';

function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false, username: ''});
  
  useEffect( () => {
    checkSession()
        .then(user => {
          setUserState({
              isLoggedIn: true,
              username: user.username,
          });
        });
  }, []);
 
  const onLogin = (username) => {
      setUserState({
        isLoggedIn: true,
        username: username,
      });
  };

  const onLogout = () => {
      setUserState({
        isLoggedIn: false,
        username: ''
      });
  };

  return(
    <div className="app">
      { userState.isLoggedIn ? <MainPage username={userState.username} onLogout={onLogout} />
                             : <Login onLogin={onLogin} />}
    </div>
  );
}

export default App;
