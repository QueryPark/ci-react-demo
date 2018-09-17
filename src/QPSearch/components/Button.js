// Query Park Inc. 2018

// This component renders a button

import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'

import { COLORS } from '../theme'

const Button = ({
  onClick, children,
  color, bgColor,
  hoverColor, hoverBgColor
}) => {
  const style = css`
    height: 30px;

    font-size: 15px;
    font-weight: 500;
    text-transform: uppercase;

    color: ${color || COLORS.GREY1};
    background-color: ${bgColor || COLORS.GREY6};
    
    border: none;
    border-radius: 5px;

    &:hover {
      color: ${hoverColor || COLORS.GREY1};
      background-color: ${hoverBgColor || COLORS.GREY5};
    }
  `

  return (
    <button className={style} onClick={onClick}>{ children }</button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,

  color: PropTypes.string,
  bgColor: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverBgColor: PropTypes.string
}

export default Button
