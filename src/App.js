import React, { Component } from 'react'
import './App.css'

import QPSearch from './QPSearch'

import Logo from './assets/Logo.png'
class App extends Component {
  constructor () {
    super()

    this.state = { API_KEY: 'f67903a8-99fd-424d-8d27-844872307d42' }
    this.updateKey = this.updateKey.bind(this)
  }

  updateKey (event) {
    const key = event.target.value
    this.setState({ API_KEY: key })
  }

  render () {
    const { API_KEY } = this.state

    const search = API_KEY
      ? <QPSearch API_KEY={API_KEY} />
      : null

    return (
      <div className='App'>
        <header className='App-Header'>
          <img className='App-Logo' src={Logo} alt='Query Park' />
          <h1 className='App-Title'>dropdown demo</h1>
        </header>
        <main className='App-Main'>
          <section className='App-API'>
            <p>Enter Your API Key:</p>
            <input type='text' onChange={this.updateKey} />
          </section>
          <section className='App-QPSearch'>
            { search }
          </section>
        </main>
      </div>
    )
  }
}

export default App
