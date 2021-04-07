import React from 'react'
import PropTypes from 'prop-types'

const style = {
  // cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  // &:hover {
  //   z-index: 1;
  // }
}

const Marker = ({ onClick }) => (
  <div className='marker'
    onClick={onClick}
  />
)

Marker.defaultProps = {
  onClick: null,
}

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
}

export default Marker
