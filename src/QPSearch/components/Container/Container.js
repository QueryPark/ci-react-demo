// Query Park Inc. 2018

// This component wraps the search interaction

import React from 'react'
import PropTypes from 'prop-types'

import './Container.css'

const Container = ({ children }) => (
  <div className='QP-container'>
    { children }
  </div>
)

Container.propTypes = {
  children: PropTypes.object
}

export default Container
