// Query Park Inc. 2018

// This component renders the well options in a nice way

import React from 'react'
import PropTypes from 'prop-types'

import './SearchOption.css'

import {
  Field,
  Pill
} from '../'

const mapAttributes = (attributes) => {
  const pills = []
  const {
    region,
    isLatest
  } = attributes

  if (region) {
    let regionPill
    switch (region) {
      case 'AB':
        regionPill = <Pill key='ab' color='#00278B'>AB</Pill>
        break
    }
    regionPill && pills.push(regionPill)
  }

  if (isLatest) {
    pills.push(<Pill key='latest' color='#24C66F'>Latest</Pill>)
  } else {
    pills.push(<Pill key='historical' color='#C62424'>Historical</Pill>)
  }

  return pills
}

const SearchOption = ({
  innerRef, innerProps,

  data,
  selectProps,
  selectOption
}) => {
  // const searchInput = selectProps.inputValue

  const {
    primaryHeader,
    subheader,
    govId,
    surfaceLocation
  } = data

  const pills = mapAttributes(data.attributes)

  return (
    <div ref={innerRef} {...innerProps} className='QP-so-container'
      onClick={() => selectOption(data)}
    >
      <div className='QP-so-row'>
        <Field label={primaryHeader.label} value={primaryHeader.value}
          valueClass='QP-so-field-heavy'
        />
        <Field label={govId.label} value={govId.value}
          valueClass='QP-so-field-light QP-so-field-right'
        />
      </div>
      <div className='QP-so-row'>
        <Field label={subheader.label} value={subheader.value} />
        <Field label={surfaceLocation.label} value={surfaceLocation.value} />
        <div className='QP-so-pillbox'>
          { pills }
        </div>
      </div>
    </div>
  )
}

SearchOption.propTypes = {
  innerRef: PropTypes.func,
  innerProps: PropTypes.object.isRequired,

  data: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
  selectOption: PropTypes.func.isRequired
}

export default SearchOption
