export const load = () => {
  const token = localStorage.getItem("TOKEN")

  return (dispatch) => { // usando o redux-thunk (ele espera o retorno de uma função passando o dispatch)
    fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${token}`)
        .then(response => response.json())
        .then(tweets => dispatch({ type: 'CARREGA_TWEETS', tweets }))
  }
}

export const add = (newTweet) => {
  const token = localStorage.getItem("TOKEN")

  return (dispatch) => {
    if (newTweet) {
      fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${token}`, {
          method: 'POST',
          body: JSON.stringify({ conteudo : newTweet })
      })
      .then(response => response.json())
      .then(tweetInfo => dispatch({ type: 'ADICIONA_TWEET', tweet: tweetInfo }))
      .catch(error => console.log(error.json()))
    }
  }
}

export const remove = (tweetId) => {
  const token = localStorage.getItem('TOKEN')

  return (dispatch) => {
    fetch(`http://localhost:3001/tweets/${tweetId}?X-AUTH-TOKEN=${token}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(response => {
        dispatch({ type: 'REMOVE_TWEET', tweetId: tweetId })
        dispatch({ type: 'REMOVE_TWEET_ATIVO', })

        dispatch({ type: 'ADD_NOTIFICACAO', msg: 'Tweet excluído com sucesso!' })
        setTimeout(() => dispatch({ type: 'REMOVE_NOTIFICACAO' }), 2000)
      })
  }

}

export const like = (tweetId) => {
  return (dispatch) => {
    dispatch({ type: 'LIKE', tweetId })
    dispatch({ type: 'ADD_NOTIFICACAO', msg: 'Você deu Like!' })
    setTimeout(() => dispatch({ type: 'REMOVE_NOTIFICACAO' }), 2000)
  }
}
