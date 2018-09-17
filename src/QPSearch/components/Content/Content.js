// Query Park Inc. 2018

// This component wraps the search interaction

import React from 'react'
import PropTypes from 'prop-types'

import './Content.css'

const Content = ({ children }) => (
  <div className='QP-content'>
    { children }
  </div>
)

Content.propTypes = {
  children: PropTypes.object
}

export default Content
