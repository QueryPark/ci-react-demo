// Query Park Inc. 2018

// This component wraps the search interaction

import React from 'react'
import PropTypes from 'prop-types'

import './Footer.css'

const Footer = ({ children }) => (
  <div className='QP-footer'>
    <div>
      { children }
    </div>
    <h6>
      POWERED BY <a href='https://www.querypark.com' target='_blank'>QUERY PARK INC.</a>
    </h6>
  </div>
)

Footer.propTypes = {
  children: PropTypes.object
}

export default Footer
