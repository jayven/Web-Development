import React from 'react';
import { logout } from '../services';
import logo from '../logo.jpg'

function Navigation({ username, onLogout, onBack }) {

    const handleLogout = () => {
        logout()
        .then( () => onLogout() );
    };
    
    const back = () => {
        onBack(username)
    };
    
    return (
        <nav className="header">
            <ul>
                <li><img className="header-logo" src={logo} alt="logo"/></li>
                <li className="app-name"><span onClick={back} >Weekly&nbsp;Fitness&nbsp;Record</span></li>
                <span>
                    <li>User: {username}</li>
                    <button className="to-logout" onClick={handleLogout}>Logout</button>
                </span>     
            </ul>
        </nav>
    );
}


export default Navigation;