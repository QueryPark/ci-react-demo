import React, { Component } from 'react'
import './App.css'

import Search from './Search'
import Logo from './assets/Logo.png'

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
      <section className='App-Form'>
        <div className='App-Form-Card'>
          <header className='App-Form-Header'>
            <h1>Well Data Form</h1>
          </header>
          <div className='App-Search'>
            <h2>Unique Well Identifier</h2>
            <Search API_KEY={API_KEY}
              updateWell={this.updateWell}
              updateSearchValue={this.updateSearchValue}
              searchValue={searchValue}
            />
          </div>
          <div className='App-Form-Input-Row'>
            <label className='App-Input-Label'>
              <h2>Well Name</h2>
              <input className='App-Input' disabled
                value={well && well.WellName}
              />
            </label>
            <label className='App-Input-Label'>
              <h2>Surface Location</h2>
              <input className='App-Input' disabled
                value={well && well.SurfaceLocation}
              />
            </label>
          </div>
          <div className='App-Form-Input-Row'>
            <label className='App-Input-Label'>
              <h2>License No.</h2>
              <input className='App-Input' disabled
                value={well && well.LicenceNumber}
              />
            </label>
            <label className='App-Input-Label'>
              <h2>Licensee</h2>
              <input className='App-Input' disabled
                value={well && well.LicenseeName}
              />
            </label>
          </div>
          <div className='App-Form-Input-Row'>
            <label className='App-Input-Label'>
              <h2>Country</h2>
              <input className='App-Input' disabled
                value={well && well.Country}
              />
            </label>
            <label className='App-Input-Label'>
              <h2>Province / State</h2>
              <input className='App-Input' disabled
                value={well && well.ProvState}
              />
            </label>
          </div>
        </div>
      </section >
    )

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
          {searchWrap}
        </main>
      </div>
    )
  }
}

export default App
