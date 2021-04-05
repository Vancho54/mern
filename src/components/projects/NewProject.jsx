import React, { useContext, useState } from 'react';
import projectsContext from '../../context/projects/projectContext';

const NewProject = () => {

    const projectContext = useContext(projectsContext)
    
    const { newP, error, showForm, addProject, showError } = projectContext

    const [project, setProject] = useState({
        name:''
    });

    const onChangeProject = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitProject = e => {
        e.preventDefault()

        if (project.name === '') {
            showError();
            return;
        }

        addProject(project)

        setProject({
            name: ''
        })
    }

    return (
        <>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={() => showForm()}
            >
                New Project
            </button>
            {newP 
            ?
            <form 
                className='formulario-nuevo-proyecto'
                onSubmit={onSubmitProject}
            >
                <input 
                    type='text'
                    className='input-text'
                    placeholder='Name Project'
                    name='name'
                    value={project.name}
                    onChange={onChangeProject}
                />
                <input 
                    className='btn btn-primario btn-block'
                    type='submit'
                    value='Add Project'
                />
            </form> 
            :
            null
            }
            {error ? <p className='mensaje error'>A name is required</p> : null}
        </>
    );
};

export default NewProject;