// Query Park Inc. 2018

// This component renders a field

import React from 'react'
import PropTypes from 'prop-types'

import './Field.css'

const Field = ({
  label, value,
  fieldClass,
  labelClass,
  valueClass
}) => (
  <div className={`QP-so-field ${fieldClass}`}>
    <h1 className={labelClass}>{ label }</h1>
    <p className={valueClass}>{ value }</p>
  </div>
)

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,

  fieldClass: PropTypes.string,
  labelClass: PropTypes.string,
  valueClass: PropTypes.string
}

export default Field
