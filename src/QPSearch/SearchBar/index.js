// Query Park Inc. 2018

// This component handles searching

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map, debounce } from 'lodash'

import AsyncSelect from 'react-select/lib/Async'
import { components } from 'react-select'

const { alert, fetch, Headers } = window
const QP_URL_ROOT = 'https://api.querypark.com/v1/'

const createNewHeaders = (apiKey) => new Headers({
  'Content-Type': 'application/json',
  'x-api-key': apiKey
})

class QPSearchBar extends Component {
  constructor (props) {
    super(props)

    this.headers = createNewHeaders(props.API_KEY)

    this.state = {
      searchValue: '',
      wells: {}
    }

    this.setSearchValue = this.setSearchValue.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getWells = this.getWells.bind(this)
  }

  setSearchValue = (newValue) => {
    this.setState({ searchValue: newValue })
  }

  onChange = async (value) => {
    this.setSearchValue(value)

    const chosenWell = JSON.stringify(
      this.state.wells[value.id]
    )

    window.alert(chosenWell)
  }

  getWells = async (input) => {
    const url = QP_URL_ROOT + 'suggest'
    const data = { query: input, size: 10 }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      })

      const json = await response.json()

      if (!json.ok) {
        throw new Error(json.message)
      }

      const options = []
      const wells = {}
      json.payload.wells.forEach(well => {
        const id = well.Uuid

        options.push({ id, uwi: well.UWI })
        wells[id] = well
      })

      this.setState({ wells })

      console.log(options)
      return options
    } catch (err) {
      console.log(err)
      // handleError(err.message)
    }
  }

  render () {
    const {
      searchValue
    } = this.state

    return (
      <AsyncSelect
        components={{
          Option: ({ children, innerProps }) => (
            <div {...innerProps}>
              Hi jesse { children }
            </div>
          )
        }}

        styles={{
          menu: (base, style) => ({})
        }}

        // className='Search-Dropdown'
        // autoload={false}
        // multi={false}
        backspaceRemoves={false}
  
        // inputValue={searchValue}

        getOptionLabel={(option) => {
          console.log(option)
          return option.uwi
        }}

        getOptionValue={(option) => {
          console.log(option)
          return option.uwi
        }}

        cacheOptions

        loadOptions={this.getWells}
        // remove filtering (this is already done by the api)
        filterOption={null}
      />
    )
  }

}

QPSearchBar.propTypes = {
  API_KEY: PropTypes.string.isRequired
}

export default QPSearchBar
