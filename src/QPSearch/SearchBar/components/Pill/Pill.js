// Query Park Inc. 2018

// This component renders a pill

import React from 'react'
import PropTypes from 'prop-types'

import './Pill.css'

const Pill = ({
  children,
  color
}) => (
  <div style={{
    backgroundColor: color || '#3A3A3A'
  }} className='QP-so-pill'>
    <p>{ children }</p>
  </div>
)

Pill.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string
}

export default Pill
