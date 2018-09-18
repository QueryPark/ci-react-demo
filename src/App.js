import React, { Component } from 'react'
import { css } from 'emotion'

import QPSearch from './QPSearch'

import Logo from './assets/Logo.png'

const style = css`
  & > header {
    position: absolute;
    top: 0;
    width: calc(100% - 30px);
    padding: 0 15px;
    background-color: #091d28;
    height: 85px;
    color: white;
    display: flex;
    justify-content: center;
    
    & > div {
      width: 100%;
      max-width: 500px;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    & > div > h1 {
      font-size: 1.2rem;
    }
  }

  & > main {
    position: absolute;
    width: 100%;
    height: calc(100% - 85px);
    top: 85px;

    box-sizing: border-box;
    padding: 0 10px;

    & > section {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      margin-bottom: 25px;

      & > input {
        font-size: 0.8em;
        text-align: center;
        width: 300px;
      }

      & > p {
        margin-right: 25px;
      }
    }
  }
`

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
      <div className={style}>
        <header>
          <div>
            <img src={Logo} alt='Query Park' />
            <h1>Demo</h1>
          </div>
        </header>
        <main>
          <section>
            <p>Enter Your API Key:</p>
            <input type='text' onChange={this.updateKey} />
          </section>
          <section>
            { search }
          </section>
        </main>
      </div>
    )
  }
}

export default App
