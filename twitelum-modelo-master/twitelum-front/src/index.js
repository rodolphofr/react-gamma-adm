import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// pega tudo o que esta sendo desenvolvido em memoria
// e cola na pagina
// ReactDOM verifica e compara tudo o que possui nele e tudo o que possui no DOM
// Quando encontra a diferença o mesmo coloca esta diferenca no DOM

// Componente React
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
