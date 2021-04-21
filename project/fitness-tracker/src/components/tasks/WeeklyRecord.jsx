 import React, {useState, useEffect } from 'react';
 import TaskList from './TaskList';
 import Sort from './Sort';

 function WeeklyRecord({ username, tasks, onRemoveTask, onShowTask }) {

     const [sunTask, setSunTask] = useState([]);
     const [monTask, setMonTask] = useState([]);
     const [tueTask, setTueTask] = useState([]);
     const [wedTask, setWedTask] = useState([]);
     const [thuTask, setThuTask] = useState([]);
     const [friTask, setFriTask] = useState([]);
     const [satTask, setSatTask] = useState([]);
     const [order, setOrder] = useState('');

    const grouping = (tasks, order) => {
        switch(order) {
            case "ORDER_ASC":
                tasks.sort((task1, task2) => (task1.name > task2.name) ? 1 : -1);
                break;
            case "ORDER_DESC":
                tasks.sort((task1, task2) => (task2.name > task1.name) ? 1 : -1);
                break;
            default:
                break;
        }

        const sun = [], mon = [], tue = [], wed=[], thu =[], fri =[], sat=[];
        for( let task of tasks ) {
            switch(task.days) {
                case "Sun":
                    sun.push(task);
                    break;
                case "Mon":
                    mon.push(task);
                    break;
                case "Tue":
                    tue.push(task);
                    break;
                case "Wed":
                    wed.push(task);
                    break;
                case "Thu":
                    thu.push(task);
                    break;
                case "Fri":
                    fri.push(task);
                    break;
                case "Sat":
                    sat.push(task);
                    break;
            }
        }
        setSunTask(sun);
        setMonTask(mon);
        setTueTask(tue);
        setWedTask(wed);
        setThuTask(thu);
        setFriTask(fri);
        setSatTask(sat);
    };

    useEffect( () => {
        if (tasks) {
            grouping(tasks, order);
        }
    }, [tasks, order]);

    const onSort = (orderOption) => {
        setOrder(orderOption);
    };

    return (
        <div>
            <Sort onSort={onSort} />
            <div className="description">
                <p className="p1">Plan your workout for the week with this handy application.</p>
                <p className="p2">
                    Click the button below to add a task to your workout plan. <br/>
                    Click on any task you've added to view details and make changes.
                </p>
            </div>
            <div className="tasks-panel">
                <div>
                    <h3>Sun</h3>
                    <h5>{sunTask.length} Tasks</h5>
                    <TaskList username={username} tasks={sunTask} onRemoveTask={onRemoveTask} onShowTask={onShowTask}/>
                </div>
                <div>
                    <h3>Mon</h3>
                    <h5>{monTask.length} Tasks</h5>
                    <TaskList username={username} tasks={monTask} onRemoveTask={onRemoveTask} onShowTask={onShowTask}/>
                </div>
                <div>
                    <h3>Thu</h3>
                    <h5>{tueTask.length} Tasks</h5>
                    <TaskList username={username} tasks={tueTask} onRemoveTask={onRemoveTask} onShowTask={onShowTask}/>
                </div>
                <div>
                    <h3>Wed</h3>
                    <h5>{wedTask.length} Tasks</h5>
                    <TaskList username={username} tasks={wedTask} onRemoveTask={onRemoveTask} onShowTask={onShowTask}/>
                </div>
                <div>
                    <h3>Thu</h3>
                    <h5>{thuTask.length} Tasks</h5>
                    <TaskList username={username} tasks={thuTask} onRemoveTask={onRemoveTask} onShowTask={onShowTask}/>
                </div>
                <div>
                    <h3>Fri</h3>
                    <h5>{friTask.length} Tasks</h5>
                    <TaskList username={username} tasks={friTask} onRemoveTask={onRemoveTask} onShowTask={onShowTask}/>
                </div>
                <div>
                    <h3>Sat</h3>
                    <h5>{satTask.length} Tasks</h5>
                    <TaskList username={username} tasks={satTask} onRemoveTask={onRemoveTask} onShowTask={onShowTask}/>
                </div>
            </div>
        </div>
    );
}

 export default WeeklyRecord;