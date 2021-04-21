import React, { useState }  from 'react';
import options from '../../options';

function TaskDetail ({ username, task, onAdd, onUpdate, onBack }) {
    const [name, setName] = useState(task.name);
    const [duration, setDuration] = useState(task.duration);
    const [days, setDays] = useState(task.days);
    const [detail, setDetail] = useState(task.detail);
    const [reps, setReps] = useState(task.reps);

    const back = () => {
        onBack(username)
    };
    const submitTask = (event) => {
        event.preventDefault();
        const newTask = { name: name,
                         duration: duration,
                         days: days,
                         detail: detail,
                         reps: reps,
        };
        if(Object.keys(task).length === 0 && task.constructor === Object) {
            onAdd(username, newTask);
        } else {   
           onUpdate(username, task.taskId, newTask)
        }    
    };

    return (
        <div className="task-details">
            <form onSubmit={submitTask}>
                <h3 className="title">Add Workout Task Record</h3>
                <div className="task-info">
                    <div>
                        <label>Task Name *: </label>
                        <input className="task-name" type="text" onChange={(e) => {setName(e.target.value)}} value={name} required/>
                    </div>
                    <div>
                        <label>Duration *:
                        <input className="task-duration" type="number" onChange={(e) => {setDuration(e.target.value)}} value={duration} min="1" required/>    Min </label>
                    </div>    
                    <div>
                        <label>Days:
                        <select className="days-options" onChange={(e)=>{setDays(e.target.value)}} value={days}>
                            { options.map((item, index) => 
                                <option key={index} value={item}>{item} </option>) }
                        </select></label>
                    </div>
                    <div>
                        <label>Reps: </label>
                        <input className="reps" type="number" placeholder="enter repeat times" min="1" max="100" onChange={(e) => {setReps(e.target.value)}} value={reps}/>
                    </div>
                    <div>
                        <label>Details: </label>
                        <textarea className="details" placeholder="add some details" onChange={(e) => {setDetail(e.target.value)}} value={detail}/>
                    </div>
                </div>
                <div>
                    <input className="submit" type="submit" value="Submit" />
                </div> 
            </form> 
            <div className="back-home">
                <button className="to-back-home" onClick={back}>Cancel</button>
            </div>       
        </div>
    )
}

export default TaskDetail;