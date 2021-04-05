import React, { useContext } from 'react';
import Task from './Task';
import projectsContext from '../../context/projects/projectContext'
import tasksContext from '../../context/tasks/taskContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'  


const ListTasks = () => {

    const taskContext = useContext(tasksContext)
    const projectContext = useContext(projectsContext)
    
    const { project, deleteProject } = projectContext
    const { projectTasks } = taskContext

    if (!project) {
        return <h2>Choose a Project</h2>
    }

    const [currentProject] = project


    return (
        <>
            <h2>Project: {currentProject.name}</h2>
            <ul className='listado-tareas'>
                {projectTasks.length === 0 ? <li className='tarea'><p>No Tasks yet</p></li> 
                : 
                <TransitionGroup>
                    {projectTasks.map(task => (
                        <CSSTransition
                            key={task.id}
                            timeout={200}
                            classNames='tarea'
                        >
                            <Task 
                                task={task}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                }
            </ul>
            <button
                type='button'
                className='btn btn-eliminar'
                onClick={() => deleteProject(currentProject._id)}
            >
                Delete Project &times;
            </button>
        </>
    );
};

export default ListTasks;