import { ADD_PROJECTS, CURRENT_PROJECT, DELETE_PROJECT, GET_PROJECTS, NEW_PROJECT, PROJECT_ERROR, VALIDATE_FORM } from '../../types/index'

// eslint-disable-next-line
export default (state, action) => {

    switch(action.type) {
        case NEW_PROJECT:
            return {
                ...state,
                newProject: true
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case ADD_PROJECTS: 
            return {
                ...state,
                projects: [...state.projects, action.payload],
                newProject: false,
                error: false
            }
        case VALIDATE_FORM:
            return {
                ...state,
                error: true
            }
        case CURRENT_PROJECT:
            return {
                ...state,
                project: state.projects.filter(project => project._id === action.payload._id)
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
            }
        case PROJECT_ERROR:
            return {
                ...state,
                msg: action.payload
            }
        default:
            return state
        }
}