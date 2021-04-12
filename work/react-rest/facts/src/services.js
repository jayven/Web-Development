export const fetchFacts = () => {
    return fetch('/facts', {
        method: 'GET',
    })
    .catch( () => Promise.reject({errorCode: 'network-error'}) )
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) );
        }
        return response.json();
    });
};