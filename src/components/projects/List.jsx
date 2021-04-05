import React, { useContext, useEffect } from 'react';
import Project from './Project';
import projectsContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alerts/alertContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const List = () => {

    const projectContext = useContext(projectsContext);
    const alertContext = useContext(AlertContext)

    const {msg, projects, getProjects } = projectContext
    const { alert, showAlert } = alertContext
    
    useEffect(()=> {

        if (msg) {
            showAlert(msg.msg, msg.category);
        }
        getProjects()

        // eslint-disable-next-line
    }, [msg])

    if (projects.length === 0) return<p>There is no Project, Start creating one!</p>

    return (
        <ul className='listado-proyectos'>
            { alert ? <div className={`alerta {alert.category}`}>{alert.msg}</div> : null}
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                    key={project._id}
                    timeout={200}
                    classNames='proyecto'
                    >
                        <Project project={project}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
};

export default List;