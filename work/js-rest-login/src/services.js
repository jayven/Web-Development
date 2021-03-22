"use strict";
export const fetchLogin = (username) => {
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ errorCode: 'network-error'}) )
    . then( (response) => {
        if(!response.ok) {
            return response.json().then( err => Promise.reject(err) );
        }
        return response.json();
    });
};

export const fetchLoginStatus = () => {
    return fetch("/session", {
        method: "GET"
    })
    .catch(() => {
        return Promise.reject({ code: "network-error" });
    })
    .then((response) => {
        if (!response.ok) {
            return response.json().then( (err) => Promise.reject(err) );
        }
        return response.json();
    });
};

export const fetchGetItems = () => {
    return fetch('/items', {
        method: 'GET',
    })
    .catch( () => Promise.reject({ errorCode: 'network-error'}) )
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) );
        }
        return response.json();
    });
};

export const fetchAddItems = (text) => {
    return fetch('/items', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ text }),
        credentials: 'include',
    })
    .catch( () => Promise.reject({ errorCode: 'network-error' }) )
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) )
        }
        return response.json();
    });
};

export const fetchUpdateScore = (score) => {
    return fetch('/items', {
        method: 'PATCH',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ score }),
        credentials: 'include',
    })
    .catch( () => Promise.reject({ errorCode: 'network-error' }) )
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) )
        }
        return response.json();
    });
};

export const fetchLogout = () => {
    return fetch('/session', {
        method: 'DELETE',
        headers: new Headers({
            'content-type': 'application/json'
        })
    })
    .catch( () => Promise.reject({errorCode: 'network-error'}) )
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) )
        }
        return;
    });
};
