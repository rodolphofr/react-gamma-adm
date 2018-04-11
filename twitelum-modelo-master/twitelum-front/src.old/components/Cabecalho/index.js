import React, { Component } from 'react' // importar isoladamente
import './cabecalho.css'


class Cabecalho extends Component {
  render() {
    return (
      <header className="cabecalho">
          <div className="cabecalho__container container">
              <h1 className="cabecalho__logo">
                  <a href="">Twitelum</a>
              </h1>
              { /* adiciona um component dinamicamente */ }
              { this.props.children }
          </div>
      </header>
    )
  }
}

export default Cabecalho;
