import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage'
import Error404Page from '../pages/errors/404'

const routes = () => {
  return (
    <Switch>
        <Route path="/" exact component={ Home }/>
        <Route path="/login" component={ LoginPage }/>
        <Route path="*" component={ Error404Page }/>
    </Switch>
  )
}

export default routes;
