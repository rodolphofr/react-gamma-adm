// dados principais da aplicação;
// acessar os caras por esse arquivo aqui

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

function tweetReducer(state = [], action = {}) {
  console.log(action)

  if (action.type === 'CARREGA_TWEETS') {
      const novoEstado = action.tweets
      return novoEstado
  }

  if (action.type === 'ADICIONA_TWEET') {
      return [action.tweet, ...state]
  }

  if (action.type === 'REMOVE_TWEET') {
      const tweetId = action.tweetId
      const tweets = state.filter(tweet => tweet._id !== tweetId)
      return tweets
  }

  return state
}

const store = createStore(
  tweetReducer,
  applyMiddleware(thunk)
)

export default store
