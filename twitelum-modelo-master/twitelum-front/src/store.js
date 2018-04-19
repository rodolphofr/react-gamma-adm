// dados principais da aplicação;
// acessar os caras por esse arquivo aqui

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

function tweetReducer(state = { tweets: [], tweetActivated: {} }, action = {}) {
  console.log(action)

  if (action.type === 'CARREGA_TWEETS') {
      const newState = { ...state, tweets: action.tweets }
      return newState
  }

  if (action.type === 'ADICIONA_TWEET') {
      const newState = { ...state, tweets: [action.tweet, ...state.tweets] }
      return newState
  }

  if (action.type === 'REMOVE_TWEET') {
      const tweetId = action.tweetId
      const tweets = state.tweets.filter(tweet => tweet._id !== tweetId)

      const newState = { ...state, tweets, tweetActivated: {} }

      return newState;
  }

  if (action.type === 'ADD_TWEET_ATIVO') {
      const tweetActivated = state.tweets.find(tweet => tweet._id === action.tweetId)

      return { ...state, tweetActivated }
  }

  if (action.type === 'REMOVE_TWEET_ATIVO') {
      return { ...state, tweetActivated: {} }
  }

  if (action.type === 'LIKE') {

      const tweetsUpdated = state.tweets.map(tweet => {

          if (tweet._id === action.tweetId) {
              const { likeado, totalLikes } = tweet
              tweet.likeado = !likeado
              tweet.totalLikes = likeado ? totalLikes - 1 : totalLikes + 1
          }

          return tweet
      })

      return  { ...state, tweets: tweetsUpdated }
  }

  return state
}

function notificacoesReducer(state = '', action = {}) {

  if (action.type === 'ADD_NOTIFICACAO') {
      return action.msg
  }

  if (action.type === 'REMOVE_NOTIFICACAO') {
    return '';
  }

  return state;
}

const store = createStore(
  combineReducers( { tweets: tweetReducer, notificacao: notificacoesReducer } ),
  applyMiddleware(thunk)
)

export default store
