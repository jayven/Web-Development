import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import TaskDetail from './TaskDetail';
import WeeklyRecord from './WeeklyRecord'
import errorMessages from '../../errorMessages';

import {fetchTaskList, fetchTask, addTask, removeTask, updateTask} from '../../services';

function  MainPage({ username, onLogout }) {
    const [taskList, setTaskList] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({});
    const [status, setStatus] = useState('');
    const updateTaskList = (username) => {
        fetchTaskList(username)
            .then( (tasks) => {
                setTasks(tasks);
                setTaskList(true);
            })
            .catch( err => {
                setStatus(errorMessages[err.errorCode]);
            })
    }; 
           
    useEffect( () => {
        if (username) {
            updateTaskList(username);
        }     
    }, [username]);
    
    const onShowTask = (username, taskId) => {
        fetchTask(username, taskId)
            .then( (task) => {
                setTask(task);
                setTaskList(false);
            })
            .catch( err => {
                setStatus(errorMessages[err.errorCode]);
            })
    };

    const onAdd = (username, task) => {
        addTask(username, task)
            .then( () => {
               updateTaskList(username);
            })
            .catch( err => {
                setStatus(errorMessages[err.errorCode]);
            });
    };

    const onUpdate = (username, taskId, task) => {
        updateTask(username, taskId, task)
            .then( () => {
                updateTaskList(username);
                setTask({});
            })
            .catch( (err) => {
                setStatus(errorMessages[err.errorCode]);
            });
    };

    const onRemoveTask = (username, taskId) => {
        removeTask(username, taskId)
            .then( () => {
                updateTaskList(username);
            })
            .catch( (err) => {
                setStatus(errorMessages[err.errorCode]);
            });
    };

    const onBack = (username) => {
        updateTaskList(username);
    };

    let content;
    if (taskList) {
        content = <div><WeeklyRecord username={username} tasks={tasks}
                                      onRemoveTask={onRemoveTask}
                                      onShowTask={onShowTask}/>
                        <div className="main-page">
                            <button className="to-add-task" onClick={() => setTaskList(false)}>Add Task</button>
                        </div>
                  </div> 
    } else {
        content = <TaskDetail username={username} task={task} onAdd={onAdd} onUpdate={onUpdate} onBack={onBack}/>
    }

    return(
        <div className="fitness-tracker">
            <Navigation username={username} onLogout={onLogout} onBack={onBack} />
            <div className="status">{status}</div>
            {content} 
            <Footer/>     
        </div>
    )
}

export default MainPage;
