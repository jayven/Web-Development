const convertNetworkError = (err) => {
    return {
        message: 'network-error',
        err
    };
};

export const checkSession = () => {
    return fetch('/session', {
        method: 'GET',
        headers: new Headers({
            'content-type': 'application/json'
        }),
    })
        .catch( convertNetworkError )
        .then( response => {
            if(!response.ok) {
                return response.json()
                    .then( (err) => Promise.reject(err) );
            }
        return response.json();
        });
};

export const login = (username) => {
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username }),
    })
        .catch( convertNetworkError )
        .then( response => {
            if(!response.ok) {
                return response.json()
                    .then( (err) => Promise.reject(err) );
            }
        return response.json();
        });
};

export const logout = () => {
    return fetch('/session', {
        method: 'DELETE',
        headers: new Headers({
            'content-type': 'application/json'
        }),
    })
        .catch( convertNetworkError )
        .then( response => {
            if(!response.ok) {
                return response.json()
                    .then( (err) => Promise.reject(err) );
            }
        });
};

export const fetchTaskList = (username) => {
    return fetch(`/tasks/${username}`, {
        method: 'GET',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        credentials: 'include',
    })
        .catch( convertNetworkError )
        .then( response => {
            if(!response.ok) {
                return response.json()
                    .then( (err) => Promise.reject(err) );
            }
            return response.json();
        });
};

export const addTask = ( username, task ) => {
    return fetch(`/tasks/${username}`, {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ task }),
        credentials: 'include',
    })
        .catch( convertNetworkError )
        .then( response => {
            if(!response.ok) {
                return response.json()
                    .then( (err) => Promise.reject(err) );
            }
            return response.json();
        });
};

export const fetchTask = (username, taskId) => {
    return fetch(`/tasks/${username}/${taskId}`, {
        method: 'GET',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        credentials: 'include',
    })
        .catch( convertNetworkError )
        .then( response => {
            if(!response.ok) {
                return response.json()
                    .then( (err) => Promise.reject(err) );
            }
            return response.json();
        });
};

export const removeTask = ( username, taskId ) => {
    return fetch(`/tasks/${username}/${taskId}`, {
        method: 'DELETE',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        credentials: 'include',
    })
        .catch( convertNetworkError )
        .then( response => {
            if(!response.ok) {
                return response.json()
                    .then( (err) => Promise.reject(err) );
            }
        });
};

export const updateTask = (username, taskId, task) => {
    return fetch(`/tasks/${username}/${taskId}`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ task }),
        credentials: 'include',
    })
        .catch( convertNetworkError )
        .then( response => {
            if(!response.ok) {
                return response.json()
                    .then( (err) => Promise.reject(err) );
            }
            return response.json();
        });
};
