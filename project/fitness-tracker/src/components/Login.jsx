import React, {useState} from 'react';
import errorMessages from '../errorMessages';
import logo from '../logo.jpg'
import { login } from '../services';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');

    const onChange = (e) => {
        setUsername(e.target.value);
    };

    const performLogin = () => {
        if(!username || username.trim() === "") {
            setStatus(errorMessages["username-required"]);
            return;
        }
        setStatus('');
        setIsLoading(true);

        login(username)
            .then( (user) => {
                onLogin(user.username)
            })
            .catch( (err) => {
                setStatus(errorMessages[err.errorCode]);
                setIsLoading(false);
            });
    };

    return(
        <div className="login-panel">
            <div className="logo"> <img className="app-logo" src={logo} alt="logo"/></div>
            <h3> Create Your Own Weekly Fitness Record!</h3>
            <p className="status">{status}</p>
            <div className="login-body">
                <p>Please sign in here:</p>
                <input className="username" onChange={onChange} value={username}/>
                { isLoading ? "Loading..." : <button className="to-login" onClick={ performLogin }>Login</button>}
            </div>       
        </div>
    );
}

export default Login;