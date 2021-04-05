import React, { useContext, useEffect, useState } from 'react';
import projectsContext from '../../context/projects/projectContext'
import tasksContext from '../../context/tasks/taskContext'

const FormTask = () => {

    const taskContext = useContext(tasksContext)
    const projectContext = useContext(projectsContext);

    const { project } = projectContext
    const { selectedTask, errortask, validateTask, getTasks, addTask, editTask } = taskContext

    useEffect(() => {
        if (selectedTask !== null) {
            setTask(selectedTask)
        } else {
            setTask({
                name: ''
            })
        }
    }, [selectedTask])

    const [task, setTask] = useState({
        name: ''
    })

    if (!project) return null

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitTask = e => {
        e.preventDefault()

        if (task.name.trim() === '') {
            validateTask();
            return;
        }

        if (selectedTask === null) {
            
            task.projectId = project[0]._id

            addTask(task)
        } else {
            editTask(task);
        }

        setTask({
            name:''
        })

        getTasks(project[0]._id)
    }

    return (
        <div className='formulario'>
            <form
                onSubmit={onSubmitTask}
            >
                <div className='contenedor-input'>
                    <input 
                        type='text'
                        className='input-text'
                        placeholder='Name Task...'
                        name='name'
                        onChange={handleChange}
                        value={task.name}
                    />
                </div>
                <div className='contenedor-input'>
                    <input 
                        className='btn btn-primario btn-submit btn-block'
                        type='submit'
                        value={selectedTask ? 'Edit Task' : 'Add Task'}
                    />
                </div>
            </form>
            {errortask ? <p className='mensaje error'>A name is required</p> : null}
        </div>
    );
};

export default FormTask;