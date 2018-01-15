import React, { Component } from 'react'
import './App.css'

import Search from './Search'
import WellSummary from './WellSummary'

class App extends Component {
  constructor () {
    super()

    this.state = {
      API_KEY: '',
      well: null,
      searchValue: null
    }

    this.updateKey = this.updateKey.bind(this)
    this.updateWell = this.updateWell.bind(this)
    this.updateSearchValue = this.updateSearchValue.bind(this)
    this.reset = this.reset.bind(this)
  }

  updateKey (event) {
    const key = event.target.value
    this.setState({ API_KEY: key })
  }

  updateWell (well) { this.setState({ well }) }

  updateSearchValue (searchValue) { this.setState({ searchValue }) }

  reset () { this.setState({ well: null, searchValue: null }) }

  render () {
    const { API_KEY, well, searchValue } = this.state
    const searchWrap = API_KEY && (
      <div>
        <Search API_KEY={API_KEY}
          updateWell={this.updateWell}
          updateSearchValue={this.updateSearchValue}
          searchValue={searchValue}
        />
        {
          well && <WellSummary well={well} reset={this.reset} />
        }
      </div>
    )

    return (
      <div className='App'>
        <header className='App-Header'>
          <h1 className='App-Title'>QP Dropdown Demo</h1>
        </header>
        <main className='App-Main'>
          <section className='App-API'>
            <p>Enter Your API Key:</p>
            <input type='text' onChange={this.updateKey} />
          </section>
          {searchWrap}
        </main>
      </div>
    )
  }
}

export default App
