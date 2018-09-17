// Query Park Inc. 2018

// This component wraps the search interaction

import React from 'react'
import PropTypes from 'prop-types'

import './Header.css'

const Header = ({ children }) => (
  <div className='QP-header'>
    { children }
  </div>
)

Header.propTypes = {
  children: PropTypes.object
}

export default Header
