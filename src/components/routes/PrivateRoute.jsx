import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/authetication/authContext'

const PrivateRoute = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { auth, loading, authUser } = authContext

    useEffect(() => {
        authUser()
    }, [authUser])

    return (
        <Route {...props} render={ props => !auth && !loading ? 
            (<Redirect to='/' />)
            :
            (<Component {...props}/>
        )}/>
    )
}

export default PrivateRoute