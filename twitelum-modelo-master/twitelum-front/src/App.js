import React, { Component, Fragment } from 'react';
import './App.css';
//por default ele importa o index.js se não especificado o nome do arquivo.js
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="rodolphofr"/>
        </Cabecalho>
      </Fragment>
    );
  }
}

export default App;
