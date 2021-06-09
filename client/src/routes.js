import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AdminPage} from './pages/AdminPage'
import {QuestionPage} from './pages/QuestionPage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'
import {EditPage} from './pages/EditPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/admin" exact>
          <AdminPage />
        </Route>
        <Route path="/create" exact>
          <QuestionPage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Route path="/edit/:id">
          <EditPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
