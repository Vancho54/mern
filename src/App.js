import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreateAccount from './components/auth/CreateAccount'
import Login from './components/auth/Login'
import Projects from './components/projects/Projects'
import ProjectState from './context/projects/ProjectState'
import TaskState from './context/tasks/taskState'
import AlertState from './context/alerts/alertState'
import AuthState from './context/authetication/authState'
import tokenAuth from './config/tokenAuth'
import PrivateRoute from './components/routes/PrivateRoute'

function App() {

  const token = localStorage.getItem('token')
  if (token) {
    tokenAuth(token)
  }

  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/new-account' component={CreateAccount} />
                <PrivateRoute exact path='/projects' component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
