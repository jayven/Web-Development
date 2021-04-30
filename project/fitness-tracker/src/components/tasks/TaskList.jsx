import React, { useMemo } from 'react';
import Task from './Task';

function TaskList({ username, tasks, onRemoveTask, onShowTask }) {

    const taskList = useMemo(()=>{
        return tasks.map( task =>
                        <Task key = {task.taskId} task = {task} username = {username}
                              onRemoveTask = {onRemoveTask}
                              onShowTask = {onShowTask} />
        )}, [tasks, onRemoveTask, username, onShowTask]);

    return(
        <ul className="task-list">{taskList}</ul>
    );
}

export default TaskList;