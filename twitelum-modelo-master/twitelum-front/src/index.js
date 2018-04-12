import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import Routes from './config/routes.js'

// CSS Global
import './assets/css/reset.css'
import './assets/css/container.css'
import './assets/css/btn.css'
import './assets/css/icon.css'
import './assets/css/iconHeart.css'
import './assets/css/notificacao.css'
import './assets/css/novoTweet.css'

const routes = (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
)

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
