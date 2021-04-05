import { LOGIN_ERROR, LOGIN_OK, LOG_OUT, REGISTER_ERROR,
    REGISTER_OK, GET_USER } from '../../types'
    
    // eslint-disable-next-line
export default (state, action) => {
    switch(action.type) {
        case LOGIN_OK:
        case REGISTER_OK:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                auth: true,
                msg: null,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                auth: true,
                user: action.payload,
                loading: false
            }
        case LOG_OUT:
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                auth: null,
                msg: action.payload,
                loading: false
            }
        default:
            return state;
        }
}