import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/authetication/authContext'

const Login = (props) => {

    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)

    const { alert, showAlert } = alertContext
    const { msg, auth, logIn } = authContext

    useEffect(() => {
        if (auth) {
            props.history.push('/projects')
        }

        if (msg) {
            showAlert(msg.msg, msg.category)
        }
        // eslint-disable-next-line
    }, [msg, auth, props.history])

    const [user, setUser] = useState({
        email: '',
        password: ''
    })


    const { email, password } = user

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (email.trim() === '' || password.trim() === '') {
            showAlert('All fields are required', 'alerta-error')
        }

        logIn({email, password})
    }

    return (
        <div className='form-usuario'>
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <div className='contenedor-form sombra-dark'>
                <h1>Login</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className='campo-form'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Email'
                            onChange={handleChange}
                            value={email}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Password'
                            onChange={handleChange}
                            value={password}
                        />
                    </div>
                    <div className='campo-form'>
                        <input 
                            type='submit'
                            className='btn btn-primario btn-block'
                            value='Login'
                        />
                    </div>
                </form>
                <Link to={'/new-account'} className='enlace-cuenta'>Register Now</Link>
            </div>
        </div>
    );
};

export default Login;