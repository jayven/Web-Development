const { v4: uuidv4 } = require('uuid');

const tasks = {};

const addTask = ({ username, task }) => {
    tasks[username] = tasks[username] || {};
    if(!task.name || !task.duration || task.name.trim() === '' || task.duration.trim() === '') {
        return;
    }

    const taskId = uuidv4();
    tasks[username][taskId] = { ...task, taskId: taskId};
    return tasks[username][taskId];
};

const readTask = ({ username, taskId }) => {
    if(!tasks[username] || !tasks[username][taskId]) {
        return;
    }
    return tasks[username][taskId];
};

const readAllBasicInfo = (username) => {
    if(!tasks[username]) {
        return [];
    }

    const tasksBasicInfo = [];
    const taskList = Object.values(tasks[username]);
    for( const id in taskList ) {
        const task = {
            name: taskList[id].name,
            duration: taskList[id].duration,
            days: taskList[id].days,
            taskId: taskList[id].taskId,
        };
        tasksBasicInfo.push(task);
    }
    return tasksBasicInfo;
};

const updateTask = ({ username, taskId, task }) => {
    if(!tasks[username] || !tasks[username][taskId]) {
        return;
    }

    tasks[username][taskId] = { ...task, taskId};
    return tasks[username][taskId];
};

const removeTask = ({ username, taskId }) => {
    if(!tasks[username]) {
        return;
    }

    const task = tasks[username][taskId];
    delete tasks[username][taskId];
    return task;
};

module.exports = {
    addTask,
    readTask,
    readAllBasicInfo,
    updateTask,
    removeTask
};