import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Modal from '../../components/Modal'
import PropTypes from 'prop-types'

class Home extends Component {
  // sem isso o store nao funciona
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor() {
      super()

      this.state = {
        newTweet : '',
        tweets : [],
        tweetActivated: {}
      }

      // por q o contexto do react eh dinamico e ele nao sabe quem eh o this quando o mesmo eh chamado dentro de um metodo de classe
      this.addTweet = this.addTweet.bind(this)
      this.tweets = this.tweets.bind(this)
  }

  addTweet(event) {
    event.preventDefault()

    const newTweet = this.state.newTweet
    const token = localStorage.getItem("TOKEN")

    if (newTweet) {
      fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${token}`, {
          method: 'POST',
          body: JSON.stringify({ conteudo : newTweet })
      })
      .then(response => response.json())
      .then(tweetInfo => {
          this.setState({
              tweets : [tweetInfo, ...this.state.tweets],
              newTweet : ''
        })
      })
      .catch(error => console.log(error.json()))
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("TOKEN")

    fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${token}`)
        .then(response => response.json())
        .then(tweets => {
            this.context.store.dispatch({ type: 'CARREGA_TWEETS', tweets })
        })
  }

  componentWillMount() {
      // subscribe eh chamado sempre que disparo um store.dispatch
      // espera acontecer algum dispatch
      this.context.store.subscribe(() => {
        this.setState({ tweets: this.context.store.getState() })
      })
  }


  tweets() {
      const tweets = this.state.tweets;

      const newTweets = tweets.map(
          tweet => <Tweet key={ tweet._id }
                          tweetInfo={ tweet }
                          removeHandler={ () => this.removeTweet(tweet._id) }
                          handleModal={ (event) => this.openTweetModal(event, tweet._id) } />
      )

      return newTweets;
  }

  removeTweet = (tweetId) => {
      const tweets = this.state.tweets.filter(tweet => tweet._id !== tweetId)
      const token  = localStorage.getItem('TOKEN')

      fetch(`http://localhost:3001/tweets/${tweetId}?X-AUTH-TOKEN=${token}`, {
          method: 'DELETE'
      })
      .then(response => response.json())
      .then(response => this.setState({ tweets, tweetActivated: {} }))
  }

  openTweetModal = (event, tweetId) => {
      //pega o elemento pai mais proximo q tenha a classe especificada
      const ignoreModal = event.target.closest('.ignoreModal')

      if (!ignoreModal) {
        const tweetActivated = this.state.tweets.find(tweet => tweet._id === tweetId)
        this.setState({ tweetActivated })
      }

  }

  closeModal = (event) => {
      const isModal = event.target.classList.contains('modal')

      if (isModal) this.setState({ tweetActivated: {} })
  }

  render() {
    const tweetLength = this.state.newTweet.length;
    const tweets = this.tweets();
    const tweetActivated = this.state.tweetActivated

    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario={ `@${localStorage.getItem('USER')}` } />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet" onSubmit={ this.addTweet }>
                        <div className="novoTweet__editorArea">

                            <span className={
                              `novoTweet__status ${tweetLength > 140 ? 'novoTweet__status--invalido' : ''}`}>
                              { tweetLength }/140
                            </span>

                            <textarea className="novoTweet__editor" placeholder="O que está acontecendo?"
                              value={ this.state.newTweet }
                              onChange={ event => this.setState({ newTweet : event.target.value })}>
                            </textarea>

                        </div>

                        <button type="submit" className="novoTweet__envia"
                          disabled={ tweetLength > 140 ? true : false }>Tweetar</button>

                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                      { tweets.length === 0 ? 'Tweet something cool...' : tweets }
                    </div>
                </Widget>
            </Dashboard>
        </div>
        {
          tweetActivated._id &&
          <Modal isOpen={ tweetActivated._id } closeModal={ this.closeModal }>
            <Widget>
              <Tweet
                  removeHandler={() => this.removeTweet(this.state.tweetActivated._id)}
                  tweetInfo={this.state.tweetActivated} />
            </Widget>
          </Modal>
        }
      </Fragment>
    );
  }
}

export default Home;
