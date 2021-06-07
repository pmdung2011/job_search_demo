import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import './App.css'

import Header from './components/header/Header'
import AddJob from './pages/AddJob/AddJob'
import AllJobs from './pages/AllJobs/AllJobs'
import AppliedJob from './pages/AppliedJob/AppliedJob'
import EditJob from './pages/EditJob/EditJob'
import Job from './pages/Job/Job'
import Login from './pages/Login/Login'
import { routes } from './share/constant'

function App() {
  const [user, setUser] = useState(null)

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  useEffect(() => {
    setUser(() => {
      const user = localStorage.getItem('user') //store user_id, user_role into local storage

      if (!user) return null
      return JSON.parse(user)
    })
  }, [])

  return (
    <div>
      <Header user={user} logout={logout} />

      <Switch>
        <Route
          path={routes.LOGIN}
          render={props => {
            return <Login {...props} user={user} setUser={setUser} />
          }}
        />

        {!!user ? (
          <React.Fragment>
            <Route
              path={routes.JOB_ID}
              exact
              render={propsReactRouterDom => (
                <Job {...propsReactRouterDom} user={user} />
              )}
            />
            <Route
              path={routes.JOB_EDIT_ID}
              exact
              component={EditJob}
              user={user}
            />

            <Route path={routes.ADD_JOB} component={AddJob} user={user} />
            <Route
              path={routes.ALL_JOBS}
              render={propsReactRouterDom => (
                <AllJobs {...propsReactRouterDom} user={user} />
              )}
            />
            <Route
              path={routes.JOBS_APPLIED}
              render={propsReactRouterDom => (
                <AppliedJob {...propsReactRouterDom} user={user} />
              )}
            />
          </React.Fragment>
        ) : (
          <Redirect to={routes.LOGIN} />
        )}
      </Switch>
    </div>
  )
}

export default App
