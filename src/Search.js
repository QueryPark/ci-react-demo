import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import Select from 'react-select'
import 'react-select/dist/react-select.css'
import './Search.css'

const { alert, fetch, Headers } = window
const QP_URL_ROOT = 'http://api.querypark.com/v1/'

const createNewHeaders = (apiKey) => new Headers({
  'Content-Type': 'application/json',
  'x-api-key': apiKey
})

const Search = ({
  API_KEY,
  searchValue,
  updateSearchValue,
  updateWell = console.log,
  handleError = alert
}) => {
  const headers = createNewHeaders(API_KEY)

  const onChange = async (value) => {
    updateSearchValue(value)

    const url = QP_URL_ROOT + 'search'
    const data = { value: value.id }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      })

      const json = await response.json()

      if (!json.ok) {
        throw new Error(json.message)
      }

      const well = json.payload.wells[0].data
      updateWell(well)
    } catch (err) {
      handleError(err.message)
    }
  }

  const getWells = async (input) => {
    const url = QP_URL_ROOT + 'suggestUWI'
    const data = { uwi: input, size: 10 }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      })

      const json = await response.json()

      if (!json.ok) {
        throw new Error(json.message)
      }

      const parseWell = well => ({ id: well._internalId, uwi: well.data.UWI })
      const wells = map(json.payload.wells, parseWell)
      return { options: wells }
    } catch (err) {
      handleError(err.message)
    }
  }

  return (
    <section className='Search'>
      <h1>Search for a UWI</h1>
      <Select.Async className='Search-Dropdown'
        autoload={false}
        multi={false}
        backspaceRemoves={false}

        value={searchValue}
        valueKey='id' labelKey='uwi'
        onChange={onChange}

        loadOptions={getWells}
        // remove filtering (this is already done by the api)
        filterOptions={options => options}

        searchPromptText='Search for a uwi!'
      />
    </section>
  )
}

Search.propTypes = {
  API_KEY: PropTypes.string.isRequired,
  updateSearchValue: PropTypes.func.isRequired,
  searchValue: PropTypes.object,
  updateWell: PropTypes.func,
  handleError: PropTypes.func
}

export default Search
