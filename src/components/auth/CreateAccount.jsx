import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/authetication/authContext'

const CreateAccount = (props) => {

        const alertContext = useContext(AlertContext)
        const authContext = useContext(AuthContext)

        const { alert, showAlert } = alertContext
        const { msg, auth, registerUser } = authContext

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
            name: '',
            email: '',
            password: '',
            repeatpassword: ''
        })
    
        const { name, email, password, repeatpassword } = user
    
        const handleChange = e => {
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        }
    
        const handleSubmit = e => {
            e.preventDefault()

            if (name.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' || 
            repeatpassword.trim() === '') {
                showAlert('All fields are required', 'alerta-error')
                return;
            }

            if (password.length < 6) {
                showAlert('Password is too short', 'alerta-error')
                return;
            }

            if (password !== repeatpassword) {
                showAlert('Passwords must be equal', 'alerta-error')
            }

            registerUser({
                name, 
                email, 
                password
            })
        }
    
        return (
            <div className='form-usuario'>
                {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
                <div className='contenedor-form sombra-dark'>
                    <h1>Create an Account</h1>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className='campo-form'>
                            <label htmlFor='name'>Name</label>
                            <input 
                                type='text'
                                id='name'
                                name='name'
                                placeholder='Name'
                                onChange={handleChange}
                                value={name}
                            />
                        </div>
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
                            <label htmlFor='repeatpassword'>Repeat Password</label>
                            <input 
                                type='password'
                                id='repeatpassword'
                                name='repeatpassword'
                                placeholder='Repeat Password'
                                onChange={handleChange}
                                value={repeatpassword}
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
                    <Link to={'/'} className='enlace-cuenta'>Login</Link>
                </div>
            </div>
    );
};

export default CreateAccount;