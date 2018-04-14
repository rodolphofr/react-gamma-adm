import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/errors/404'

class PrivateRoute extends Component {

  isAutheticated = () => {
    return localStorage.getItem("TOKEN") != null
  }

  render() {
    return this.isAutheticated() ? <Route {...this.props} /> : <Redirect to="/login"/>
  }

}

const routes = () => {
  return (
    <Switch>
        <PrivateRoute path="/" exact component={ Home }/>
        <Route path="/login" component={ LoginPage }/>
        <Route path="*" component={ NotFoundPage }/>
    </Switch>
  )
}

export default routes;
