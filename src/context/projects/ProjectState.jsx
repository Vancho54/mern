import React, { useReducer } from 'react';
import projectContext from './projectContext'
import projectReducer from './projectReducer'
import { NEW_PROJECT, 
    GET_PROJECTS, 
    ADD_PROJECTS,
    VALIDATE_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from '../../types/index'
import clientAxios from '../../config/axios';


const ProjectState = (props) => {


    const initialState = {
        projects: [],
        newProject: false,
        error: false,
        project: null,
        msg: null
    }

    const [state, dispatch] = useReducer(projectReducer, initialState)

    const showForm = () => {
        dispatch({
            type: NEW_PROJECT
        })    
    }

    const getProjects = async () => {

        try {

            const result = await clientAxios.get('api/projects');

            dispatch({
                type: GET_PROJECTS,
                payload: result.data.projects
            })
        } catch (error) {
            const alert = {
                msg: 'Error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    const addProject = async (project) => {

        try {
            const result = await clientAxios.post('/api/projects', project);
            
            dispatch({
                type: ADD_PROJECTS,
                payload: result.data
            })
        } catch (error) {
            const alert = {
                msg: 'Error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    }

    const currentProject = (project) => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: project
        })
    }

    const deleteProject = async (projectId) => {

        try {
            await clientAxios.delete(`api/projects/${projectId}`)
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {
            const alert = {
                msg: 'Error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    return(
        <projectContext.Provider
            value={{
                projects: state.projects,
                newP: state.newProject,
                error: state.error,
                project: state.project,
                msg: state.msg,
                showForm,
                getProjects,
                addProject,
                showError,
                currentProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
};

export default ProjectState;