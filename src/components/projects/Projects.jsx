import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar'
import Header from '../layout/Header'
import FormTask from '../tasks/FormTask'
import ListTasks from '../tasks/ListTasks'
import AuthContext from '../../context/authetication/authContext'

const Projects = () => {

    const authContext = useContext(AuthContext);
    const { authUser } = authContext

    useEffect(() => {
        authUser()
    }, [])

    return (
        <div className='contenedor-app'>
            <Sidebar />
            <div className='seccion-principal'>
                <Header />
                <main>
                    <FormTask />
                    <div className='contenedor-tareas'>
                        <ListTasks />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Projects;