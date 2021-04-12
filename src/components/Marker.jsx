import React from 'react'
import PropTypes, { string } from 'prop-types'

const style = {
  // cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  // &:hover {
  //   z-index: 1;
  // }
}

const Marker = ({ text, onClick, color }) => (
  <div className='marker' style={{ backgroundColor: color }}
    alt={text}
    onClick={onClick}
  />
)

Marker.defaultProps = {
  text: null,
  onClick: null,
  color: null,
}

Marker.propTypes = {
  text: string,
  onClick: PropTypes.func,
  color: string,
}

export default Marker
