// dados principais da aplicação;
// acessar os caras por esse arquivo aqui

import { createStore } from 'redux'

function tweetReducer(state = [], action = {}) {
  console.log(action)

  if (action.type === 'CARREGA_TWEETS') {
      const novoEstado = action.tweets
      return novoEstado
  }

  return state
}

const store = createStore(tweetReducer)

export default store
