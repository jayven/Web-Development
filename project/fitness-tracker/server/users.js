const { v4: uuidv4 } = require('uuid');
const auth = require('./auth');

const users = {};

const isValidSession = sid => {
    return !(!sid || !users[sid] || users[sid].expires < Date.now());


};

const createUser = (username) => {
    if(!auth.isPermitted) {
        return false;
    }

    const sid = uuidv4();
    users[sid] = {
        username,
        sid,
        expires: Date.now() + 1000 * 60 * 5,
    };
    return users[sid];
};

const getUser = (sid) => {
    return users[sid];
};

const removeUser = (sid) => {
    delete users[sid];
};

const canReadUser = ({ sid, username }) => {
    return !(!sid || !username || !users[sid].username === username);

};

module.exports = {
    isValidSession,
    createUser,
    getUser,
    removeUser,
    canReadUser,
};