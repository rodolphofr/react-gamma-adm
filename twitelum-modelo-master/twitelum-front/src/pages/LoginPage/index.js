import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'


class LoginPage extends Component {

  state = {
    login: '',
    pass: '',
    errorMessage: ''
  }

  doLogin = (event) => {
    event.preventDefault()

    const infoLogin = {
      login: this.login.value,
      senha: this.pass.value
    }

    fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify(infoLogin)
    })
    .then(response => {
      if (!response.ok) throw response
      return response.json()
    })
    .then(responseJSON => {
      localStorage.setItem('TOKEN', responseJSON.token)
      this.props.history.push('/') // window api
    })
    .catch(error => {
      error.json().then(response => this.setState({ errorMessage: response.message }))
    })

  }

  renderErrorMesssage = () => {
    return (
      <div className="loginPage__errorBox">
          { this.state.errorMessage }
      </div>
    )
  }

  render() {

    return (
        <div className="loginPage">
            <div className="container">
                <Widget>
                    <h1 className="loginPage__title">Twitelum</h1>
                    <form className="loginPage__form" action="/" onSubmit={ this.doLogin }>
                        <div className="loginPage__inputWrap">
                            <label className="loginPage__label" htmlFor="login">Login</label>
                            <input className="loginPage__input"
                                   ref={ inputLogin => this.login = inputLogin }
                                   type="text"
                                   id="login"
                                   name="login"/>
                        </div>
                        <div className="loginPage__inputWrap">
                            <label className="loginPage__label" htmlFor="senha">Senha</label>
                            <input className="loginPage__input"
                                   ref={ inputPass => this.pass = inputPass }
                                   type="password"
                                   id="senha"
                                   name="senha"/>
                        </div>
                        { this.state.errorMessage ? this.renderErrorMesssage() : '' }
                        <div className="loginPage__inputWrap">
                            <button className="loginPage__btnLogin" type="submit">
                                Logar
                            </button>
                        </div>
                    </form>
                </Widget>
            </div>
        </div>
    )
  }
}


export default LoginPage
