/* eslint-disable camelcase */
import React, { useState, useRef } from 'react'
import { bool, func, object, string } from 'prop-types'
import Popover from 'react-bootstrap/Popover'
import Overlay from 'react-bootstrap/Overlay'
import { parseFamily } from '../app/utils'

export const MarkerItem = React.forwardRef((props, ref) => {
  const { text, handleActiveItem, color, active, setShow, show } = props
  const style = {
    backgroundColor: color,
  }

  if (active) {
    style.border = '4px solid red'
    style.transform = 'scale(1.5)'
    style.zIndex = 1
  }

  return (
    <div ref={ref} className='marker' style={style}
    alt={text}
    onClick={() => {
      setShow(!show)
      handleActiveItem(text)
    }}
  />
  )
})

MarkerItem.displayName = 'MarkerItem'

const CustomPopover = React.forwardRef((props, ref) => {
  const { show, text, setShow, data } = props
  const {
    familyData,
    dates,
  } = data

  return (
    <Overlay target={ref} show={show} placement="top" rootClose onHide={() => setShow(!show)}>
      <Popover id='familyInformation' style={{ maxWidth: '100%' }}>
        <Popover.Title className='popoverTitle' as="h3">
          <span className='titleText'>{text}</span>
          <span className='titleDates'>{`${dates.first} - ${dates.last}`}</span>
        </Popover.Title>
        <Popover.Content className='popoverBody'>
          {familyData.map(elem => (
            <div className='familyItem' key={elem.displayStr}>
              <span><i>{elem.year}</i></span>
              <span><b>{elem.displayStr}</b></span>
              {elem.child ? <span>Kind: {elem.child}</span> : null}
            </div>
          ))}
        </Popover.Content>
      </Popover>
    </Overlay>
  )
})

CustomPopover.displayName = 'CustomPopover'

const Marker = (props) => {
  const { family } = props
  const [show, setShow] = useState(false)
  const target = useRef(null)
  const parsedFamily = parseFamily(family.person)

  return (
    <div>
      <MarkerItem
        ref={target}
        setShow={setShow}
        show={show}
        text={family.last_name_normed}
        {...props}
      />
      <CustomPopover
        text={family.last_name_normed}
        ref={target}
        data={parsedFamily}
        setShow={setShow}
        show={show}
        {...props}
      />
    </div>
  )
}

CustomPopover.propTypes = {
  show: bool,
  text: string,
  setShow: func,
  data: object,
}

MarkerItem.defaultProps = {
  text: null,
  handleActiveItem: null,
  color: null,
  active: false,
  setShow: null,
  show: false,
}

MarkerItem.propTypes = {
  text: string,
  handleActiveItem: func,
  color: string,
  active: bool,
  setShow: func,
  show: bool,
}

Marker.propTypes = {
  family: object,
}

export default Marker
