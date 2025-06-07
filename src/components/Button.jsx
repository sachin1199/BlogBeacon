import PropTypes from 'prop-types'

import React from 'react'

function Button({
  children,
  type = 'button',
  className = '',
  bgColor = 'bg-blue-500',
  textColor = 'text-white',
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-2 py-2 rounded-lg cursor-pointer  ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
}


export default Button
