import React, { useContext } from 'react';
import projectsContext from '../../context/projects/projectContext';
import tasksContext from '../../context/tasks/taskContext'

const Project = ({project}) => {

    const taskContext = useContext(tasksContext)
    const { getTasks } = taskContext

    const projectContext = useContext(projectsContext)
    const { currentProject } = projectContext

    const selectProject = (project) => {
        currentProject(project)
        getTasks(project._id)
    }

    return (
        <li>
            <button
                type='button'
                className='btn btn-black'
                onClick={() => selectProject(project)}
            >
                {project.name}
            </button>
        </li>
    );
};

export default Project;