// Query Park Inc. 2018

// This component renders the time it took to search for wells

import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

const style = css`
  font-weight: 500;
`

const WellsFound = ({ json: {
  meta: { took },
  payload: { wells: { length } }
} }) => (
  <p className={style}>
    {`${length} wells found in ${took / 1000} seconds.`}
  </p>
)

WellsFound.propTypes = {
  json: PropTypes.object.isRequired
}

export default WellsFound
