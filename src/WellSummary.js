import React from 'react'
import PropTypes from 'prop-types'
import { flow, map, filter, toPairs } from 'lodash/fp'

import './WellSummary.css'

const convertWellDataToRows = (well) => {
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
    toPairs,
    filter(hasValue),
    map(renderRowFromData)
  )

  return workflow(well)
}

const WellSummary = ({ well, reset }) => {
  const { UWI, WellName } = well

  return (
    <div className='WellSummary-Wrap'
      onClick={() => reset()}
    >
      <section className='WellSummary'>
        <h1>{WellName || UWI}</h1>
        <hr />
        <div className='WellSummary-TableWrap'>
          <table className='WellSummary-Table'>
            <tr><th>Key</th><th>Value</th></tr>
            {convertWellDataToRows(well)}
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

WellSummary.propTypes = {
  well: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired
}

export default WellSummary
