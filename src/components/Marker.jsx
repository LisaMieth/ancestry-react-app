import React from 'react'
import PropTypes, { bool, string } from 'prop-types'

const Marker = ({ text, handleActiveItem, color, active }) => {
  const style = {
    backgroundColor: color,
  }

  if (active) {
    style.border = '4px solid red'
    style.transform = 'scale(1.5)'
    style.zIndex = 1
  }

  return (
    <div className='marker' style={style}
      alt={text}
      onClick={() => {
        handleActiveItem(text)
      }}
    />
  )
}

Marker.defaultProps = {
  text: null,
  handleActiveItem: null,
  color: null,
  active: false,
}

Marker.propTypes = {
  text: string,
  handleActiveItem: PropTypes.func,
  color: string,
  active: bool,
}

export default Marker
