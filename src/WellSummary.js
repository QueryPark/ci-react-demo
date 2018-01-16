import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { flow, map, filter, toPairs } from 'lodash/fp'

import WellParser from 'qp-well-parser'

import './WellSummary.css'

const convertWellDataToRows = (parseWell, well) => {
  const wellParser = WellParser('v1')
  const hasValue = ([key, value]) => value
  const renderRowFromData = ([key, value]) => {
    if (typeof value === 'object') {
      return (
        <tr>
          <td>{key}</td>
          {workflow(value)}
        </tr>
      )
    }
    return (
      <tr>
        <td>{key}</td><td>{value}</td>
      </tr>
    )
  }

  const workflow = flow(
    (well) => parseWell ? wellParser(well) : well,
    toPairs,
    filter(hasValue),
    map(renderRowFromData)
  )

  return workflow(well)
}

class WellSummary extends Component {
  constructor (props) {
    super(props)

    this.state = {
      parseWell: true
    }

    this.toggleParseWell = this.toggleParseWell.bind(this)
  }

  toggleParseWell () {
    const current = this.state.parseWell
    this.setState({ parseWell: !current })
  }

  render () {
    const { well, reset } = this.props
    const { parseWell } = this.state
    const { UWI, WellName } = well

    return (
      <div className='WellSummary-Wrap'>
        <section className='WellSummary'>
          <header className='WellSummary-Header'>
            <h1>{WellName || UWI}</h1>
            <div>
              <label>
                <input type='checkbox' checked={parseWell}
                  onChange={this.toggleParseWell}
                />
                QP Parser
              </label>
            </div>
          </header>
          <hr />
          <div className='WellSummary-TableWrap'>
            <table className='WellSummary-Table'>
              <tr><th>Key</th><th>Value</th></tr>
              {convertWellDataToRows(parseWell, well)}
            </table>
          </div>
          <button className='WellSummary-Button'
            onClick={() => reset()}
          >
            Reset
          </button>
        </section>
      </div>
    )
  }
}

WellSummary.propTypes = {
  well: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired
}

export default WellSummary
