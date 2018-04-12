import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

class App extends Component {

  constructor() {
      super()

      this.state = {
        newTweet : '',
        tweets : []
      }

      // por q o contexto do react eh dinamico e ele nao sabe quem eh o this quando o mesmo eh chamado dentro de um metodo de classe
      this.addTweet = this.addTweet.bind(this)
      this.tweets = this.tweets.bind(this)
  }

  addTweet(event) {
    event.preventDefault()

    const newTweet = this.state.newTweet

    if (newTweet) {
      this.setState({
        tweets : [newTweet, ...this.state.tweets],
        newTweet : ''
      })
    }
  }

  tweets() {
    const tweets = this.state.tweets;

    const newTweets = tweets.map(
      (tweetText, index) =>
        <Tweet key={ tweetText + index } text={tweetText} name="Rodolpho Rodrigues" userName="rodolphofr"/>
    )

    return newTweets;
  }

  render() {
    const tweetLength = this.state.newTweet.length;
    const tweets = this.tweets();

    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario="@rodolphofr" />
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
      </Fragment>
    );
  }
}

export default App;
