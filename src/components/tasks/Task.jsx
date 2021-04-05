import React, { useContext } from 'react';
import tasksContext from '../../context/tasks/taskContext'
import projectsContext from '../../context/projects/projectContext'

const Task = ({task}) => {

    const taskContext = useContext(tasksContext)
    const projectContext = useContext(projectsContext);

    const { project } = projectContext
    const { deleteTask, getTasks, editTask, setActualTask } = taskContext

    const handleDelete = id => {
        deleteTask(id, project[0]._id)

        getTasks(project[0]._id)
    }

    const handleState = task => {
        
        if (task.state) {
            task.state = false;
        } else {
            task.state = true;
        }

        editTask(task)
    }

    const selectTask = task => {
        setActualTask(task)
    }

    return (
        <li className='tarea sombra'>
            <p>{task.name}</p>
            <div>
                {task.state ? 
                <button
                    type='button'
                    className='completo'
                    onClick={() => handleState(task)}
                >
                    Complete
                </button>
                : 
                <button
                    type='button'
                    className='incompleto'
                    onClick={() => handleState(task)}
                >
                    Incomplete
                </button>
                }
            </div>
            <div className='acciones'>
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={() => selectTask(task)}
                >
                    Edit
                </button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={() => handleDelete(task._id)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default Task;