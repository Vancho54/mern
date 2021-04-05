import {NEW_TASK, PROJECTS_TASKS, VALIDATE_TASK, DELETE_TASK, ACTUAL_TASK, EDIT_TASK} from '../../types/index'


// eslint-disable-next-line
export default (state, action) => {

    switch(action.type) {
        case PROJECTS_TASKS:
            return {
                ...state,
                projectTasks: action.payload
            }
        case NEW_TASK:
            return {
                ...state,
                projectTasks: [...state.projectTasks, action.payload],
                errortask: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                errortask: true
            }
        case DELETE_TASK:
            return{
                ...state,
                projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
            }
        case EDIT_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.map(task => task._id === action.payload._id ? action.payload : task),
                selectedTask: null,
                errortask: false
            }
        case ACTUAL_TASK:
            return {
                ...state,
                selectedTask: action.payload
            }

        default:
            return state;
    }
}