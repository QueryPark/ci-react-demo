// Query Park Inc. 2018

// This component renders a button

import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

const Button = ({
  onClick,
  children,
  color
}) => (
  <button className='QP-button'
    style={{
      backgroundColor: color
    }}
    onClick={onClick}
  >{ children }</button>
)

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  color: PropTypes.string
}

export default Button
