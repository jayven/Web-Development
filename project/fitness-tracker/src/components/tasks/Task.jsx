import React from 'react';

function Task({ username, task, onRemoveTask, onShowTask }) {
    const showTask = (e) => {
        const taskId = e.target.dataset.taskId;
        onShowTask(username, taskId);
    };

    const removeTask = (e) => {
        const taskId = e.target.dataset.taskId;
        onRemoveTask(username, taskId);
    };

    return(
        <li className="task">
            <span className="name" data-task-id={task.taskId}  onClick={showTask}>{task.name}</span>
            <span className="duration" data-task-id={task.taskId} >{task.duration} Min</span>
            <button data-task-id={task.taskId} className="to-delete-task" onClick={removeTask}>Delete</button>
        </li>      
    );
}

export default Task;