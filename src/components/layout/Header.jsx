import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authetication/authContext'

const Header = () => {
    
    const authContext = useContext(AuthContext);
    const { authUser, user, logOut } = authContext

    useEffect(() => {
        authUser()
        // eslint-disable-next-line
    }, [])

    return (
        <header className='app-header'>
            {user ?<p className='nombre-usuario'>Hello <span>{user.name}</span></p> : null}
            <nav className='nav-principal'>
                <button
                    className='btn btn-blank cerrar-sesion'
                    onClick={() => logOut()}
                >
                    Log Out
                </button>
            </nav>
        </header>
    );
};

export default Header;