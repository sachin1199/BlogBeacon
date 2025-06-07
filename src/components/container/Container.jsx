import React from 'react'
import PropTypes from 'prop-types'


function Container({
  className,
    children
}) {
  return <div className={`w-full max-w-7xl mx-auto px-4 ${className}`}>{children}</div>
}
Container.propTypes = {
  children: PropTypes.node ,
  className:PropTypes.string
}

export default Container