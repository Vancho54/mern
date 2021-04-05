import React, { useReducer } from 'react'
import TaskContext from './taskContext'
import taskReducer from './taskReducer'


import {PROJECTS_TASKS,
    NEW_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    ACTUAL_TASK,
    EDIT_TASK} 
from '../../types/index'
import clientAxios from '../../config/axios'

const TaskState = props => {

    const initialState = {
        projectTasks: [],
        errortask: false,
        selectedTask: null
    }

    const [state, dispatch] = useReducer(taskReducer, initialState)

    const getTasks = async (projectId) => {

        try {
            const result = await clientAxios.get('api/tasks', {params: {projectId}})
            dispatch({
                type: PROJECTS_TASKS,
                payload: result.data.tasks
            })
        } catch (error) {
            console.log(error)
        }
    }

    const addTask = async task => {
        
        try {
            const result = await clientAxios.post('api/tasks', task)
            console.log(result)
            dispatch({
                type:NEW_TASK,
                payload: task
            })
        } catch (error) {
            console.log(error)
        }
    }

    const validateTask = () => {
        dispatch({
            type:VALIDATE_TASK
        })
    }

    const deleteTask = async (id, projectId) => {

        try {
            await clientAxios.delete(`api/tasks/${id}`, {params: {projectId}})
            dispatch({
                type:DELETE_TASK,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    const editTask = async task => {

        try {
            const result = await clientAxios.put(`api/tasks/${task._id}`, task)
            dispatch({
                type: EDIT_TASK,
                payload: result.data.task
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const setActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    }




    return (
        <TaskContext.Provider
            value={{
                projectTasks: state.projectTasks,
                errortask: state.errortask,
                selectedTask: state.selectedTask,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                setActualTask,
                editTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState