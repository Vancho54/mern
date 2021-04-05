import React, { useReducer } from 'react'
import authReducer from './authReducer'
import authContext from './authContext'
import tokenAuth from '../../config/tokenAuth'

import { LOGIN_ERROR, LOGIN_OK, LOG_OUT, REGISTER_ERROR,
    REGISTER_OK, GET_USER } from '../../types'
import clientAxios from '../../config/axios'

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        auth: null,
        user: null,
        msg: null,
        loading: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const registerUser = async data => {
        try {
            const response = await clientAxios.post('/api/user', data);

            dispatch({
                type: REGISTER_OK,
                payload: response.data
            })

            authUser();
        } catch (error) {

            console.log(error.response)

            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }

            dispatch({
                type: REGISTER_ERROR,
                payload: alert
            });

        }
    }

    const authUser = async () => {
        
        try {
            const token = localStorage.getItem('token');
            if (token) {
                tokenAuth(token)
            }
            const response = await clientAxios.get('/api/auth')
            
            dispatch({
                type: GET_USER,
                payload: response.data.user
            })
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    const logIn = async (data) => {
        try {
            const response = await clientAxios.post('api/auth', data)
            
            dispatch({
                type: LOGIN_OK,
                payload: response.data
            })

            authUser()
        } catch (error) {
            console.log(error.response)

            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            });
        }
    }

    const logOut = () => {
        dispatch({
            type: LOG_OUT
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                user: state.user,
                auth: state.auth,
                msg: state.msg,
                loading: state.loading,
                registerUser,
                logIn,
                authUser,
                logOut

            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState