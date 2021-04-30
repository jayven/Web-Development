const users = require('../users');
const tasks = require('../tasks');

const routes = {
    session: {},
    tasks: {
        one: {},
        all: {},
    },
};

routes.session.status = (req, res) => {
    const sid = req.cookies.sid;
    const isValidSession = users.isValidSession(sid);
    if(!isValidSession) {
        res.clearCookie('sid');
        res.status(401).json({ errorCode: 'missing-session' });
        return;
    }

    const user = users.getUser(sid);
    res.status(200).json(user);
};

routes.session.create = (req, res) => {
    const username = req.body.username;
    const user = users.createUser(username);
    
    if(!user) {
        res.status(403).json({ errorCode: 'invalid-username' });
        return;
    }

    res.cookie('sid', user.sid, { MaxAge: 1000 * 60 });
    res.status(200).json(user);
};

routes.session.delete = (req, res) => {
    const sid = req.cookies.sid;
    const isValidSession = users.isValidSession(sid);
    if(!isValidSession) {
        res.clearCookie('sid');
        res.status(401).json({ errorCode: 'missing-session' });
        return;
    }

    res.clearCookie('sid');
    users.removeUser(sid);
    res.sendStatus(200);
};


routes.tasks.all.read = (req, res) => {
    const sid = req.cookies.sid;
    const isValidSession = users.isValidSession(sid);
    if(!isValidSession) {
        res.clearCookie('sid');
        res.status(401).json({ errorCode: 'missing-session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = users.canReadUser({ sid, username });
    if(!isAllowed) {
        res.status(403).json({ errorCode: 'invalid-username' });
        return;
    }

    const tasksBasicInfo = tasks.readAllBasicInfo(username);
    res.status(200).json(tasksBasicInfo);
};



routes.tasks.one.read = (req, res) => {
    const sid = req.cookies.sid;
    const isValidSession = users.isValidSession(sid);
    if(!isValidSession) {
        res.clearCookie('sid');
        res.status(401).json({ errorCode: 'missing-session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = users.canReadUser({ sid, username });
    if(!isAllowed) {
        res.status(403).json({ errorCode: 'invalid-username' });
        return;
    }

    const taskId = req.params.taskId;
    const task = tasks.readTask({ username, taskId });
    if(!task) {
        res.status(404).json({ errorCode: 'invalid-task' });
        return;
    }

    res.status(200).json(task);
};


routes.tasks.one.add = (req, res) => {
    const sid = req.cookies.sid;
    const isValidSession = users.isValidSession(sid);
    if(!isValidSession) {
        res.clearCookie('sid');
        res.status(401).json({ errorCode: 'missing-session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = users.canReadUser({ sid, username });
    if(!isAllowed) {
        res.status(403).json({ errorCode: 'invalid-username' });
        return;
    }

    const task = req.body.task;
    const newTask = tasks.addTask({ username, task });
    if(!newTask) {
        res.status(400).json({ errorCode: 'text-required' });
        return;
    }
    res.status(200).json(newTask);
};


routes.tasks.one.update = (req, res) => {
    const sid = req.cookies.sid;
    const isValidSession = users.isValidSession(sid);
    if(!isValidSession) {
        res.clearCookie('sid');
        res.status(401).json({ errorCode: 'missing-session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = users.canReadUser({ sid, username });
    if(!isAllowed) {
        res.status(403).json({ errorCode: 'invalid-username' });
        return;
    }

    const taskId = req.params.taskId;
    const task = req.body.task;

    const newTask = tasks.updateTask({ username, taskId, task });
    if(!newTask) {
        res.status(400).json({ errorCode: 'missing-task' });
        return;
    }
    res.status(200).json(newTask);
};

routes.tasks.one.delete = (req, res) => {
    const sid = req.cookies.sid;
    const isValidSession = users.isValidSession(sid);
    if(!isValidSession) {
        res.clearCookie('sid');
        res.status(401).json({ errorCode: 'missing-session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = users.canReadUser({ sid, username });
    if(!isAllowed) {
        res.status(403).json({ errorCode: 'invalid-username' });
        return;
    }

    const taskId = req.params.taskId;
    const task = tasks.removeTask({ username, taskId });
    if(!task) {
        res.status(404).json({ errorCode: 'invalid-task' });
        return;
    }

    res.sendStatus(200);
};

module.exports = routes;