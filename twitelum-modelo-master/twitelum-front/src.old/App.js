import React, { Component, Fragment } from 'react';
//por default ele importa o index.js se não especificado o nome do arquivo.js
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="rodolphofr"/>
        </Cabecalho>
        <Dashboard>
          <Widget>
          </Widget>
        </Dashboard>
      </Fragment>
    );
  }
}

export default App;
