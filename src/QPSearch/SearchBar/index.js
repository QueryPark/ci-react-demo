// Query Park Inc. 2018

// This component handles searching

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map, debounce } from 'lodash'

import AsyncSelect from 'react-select/lib/Async'

import {
  SearchOption
} from './components'

import {
  Button,
  Field
} from '../components'

import wellParser from 'qp-well-parser'

const { fetch, Headers } = window
const QP_URL_ROOT = 'https://api.querypark.com/v1/'

const createNewHeaders = (apiKey) => new Headers({
  'Content-Type': 'application/json',
  'x-api-key': apiKey
})

class QPSearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      well: {}
    }

    this.headers = createNewHeaders(props.API_KEY)
    this.onChange = this.onChange.bind(this)
    this.getWells = this.getWells.bind(this)
    this.reset = this.reset.bind(this)
  }

  reset () {
    this.setState({
      well: {}
    })

    this.props.updateHeader(<p>Well Search</p>)
    this.props.updateFooter(<p />)
  }

  onChange (chosenWell) {
    const {
      updateHeader,
      updateFooter
    } = this.props

    updateHeader(<Field
      label={chosenWell.primaryHeader.label}
      value={chosenWell.primaryHeader.value}
    />)

    updateFooter(<Button onClick={() => this.reset()}>Reset Search</Button>)

    this.setState({ well: chosenWell })
  }

  async getWells (input) {
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
      const wells = json.payload.wells
      const options = map(wells, wellParser())

      this.props.updateFooter(<p style={{ fontWeight: 500 }}>
        {`${wells.length} wells found in ${json.meta.took / 1000} seconds.`}
      </p>)
      return options
    } catch (err) {
      console.log(err)
      // handleError(err.message)
    }
  }

  render () {
    const { well } = this.state

    if (well.uuid) {
      return (
        JSON.stringify(well)
      )
    } else {
      return (
        <AsyncSelect
          components={{
            Option: SearchOption
          }}
          styles={{
            menu: (base, style) => ({
              margin: '5px 0 0'
            })
          }}

          backspaceRemovesValue={false}

          getOptionLabel={(option) => option.primaryHeader.value}
          getOptionValue={(option) => option.uuid}

          cacheOptions
          loadOptions={this.getWells}
          onChange={this.onChange}
          // remove filtering (this is already done by the api)
          filterOption={null}
        />
      )
    }
  }
}

QPSearchBar.propTypes = {
  API_KEY: PropTypes.string.isRequired,

  updateHeader: PropTypes.func.isRequired,
  updateFooter: PropTypes.func.isRequired
}

export default QPSearchBar
