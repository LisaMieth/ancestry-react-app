/* eslint-disable camelcase */
import React, { useState, useRef } from 'react'
import { bool, func, object, string } from 'prop-types'
import Popover from 'react-bootstrap/Popover'
import Overlay from 'react-bootstrap/Overlay'
// import { parseFamily } from '../app/utils'

export const MarkerItem = React.forwardRef((props, ref) => {
  const { text, handleActiveItem, color, activeItem, setShow, show, elem } = props
  const style = {
    backgroundColor: color || 'white',
  }

  if (activeItem === elem.last_name_normed) {
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

// const CustomPopover = React.forwardRef((props, ref) => {
//   const { show, text, setShow, data } = props
//   const {
//     familyData,
//     dates,
//   } = data

//   return (
//     <Overlay target={ref} show={show} placement="top" rootClose onHide={() => setShow(!show)}>
//       <Popover id='familyInformation' style={{ maxWidth: '100%' }}>
//         <Popover.Title className='popoverTitle' as="h3">
//           <span className='titleText'>{text}</span>
//           <span className='titleDates'>{`${dates.first} - ${dates.last}`}</span>
//         </Popover.Title>
//         <Popover.Content className='popoverBody'>
//           {familyData.map(elem => (
//             <div className='familyItem' key={elem.displayStr}>
//               <span><i>{elem.year}</i></span>
//               <span><b>{elem.displayStr}</b></span>
//               {elem.child ? <span>Kind: {elem.child}</span> : null}
//             </div>
//           ))}
//         </Popover.Content>
//       </Popover>
//     </Overlay>
//   )
// })

// CustomPopover.displayName = 'CustomPopover'

const PersonPopover = React.forwardRef((props, ref) => {
  const { show, text, setShow, person } = props

  return (
    <Overlay target={ref} show={show} placement="top" rootClose onHide={() => setShow(!show)}>
      <Popover id='familyInformation' style={{ maxWidth: '100%' }}>
        <Popover.Title className='popoverTitle' as="h3">
          <span className='titleText'>{text}</span>
        </Popover.Title>
        <Popover.Content className='popoverBody'>
          <div className='familyItem' key={person.last_name}>
              <span><i>Name: {person.first_name} {person.last_name}</i></span>
              <span><b>Geboren: {person.year_birth}</b></span>
              <span><b>Gestorben: {person.year_death}</b></span>
              <span><b>Ort: {person.place}</b></span>
          </div>
        </Popover.Content>
      </Popover>
    </Overlay>
  )
})

PersonPopover.displayName = 'PersonPopover'

const Marker = (props) => {
  const { elem } = props
  const [show, setShow] = useState(false)
  const target = useRef(null)

  return (
    <div>
      <MarkerItem
        ref={target}
        setShow={setShow}
        show={show}
        text={elem.last_name_normed}
        elem={elem}
        {...props}
      />
      { <PersonPopover
        text={elem.last_name_normed}
        ref={target}
        person={elem}
        setShow={setShow}
        show={show}
        {...props}
      /> }
    </div>
  )
}

// CustomPopover.propTypes = {
//   show: bool,
//   text: string,
//   setShow: func,
//   data: object,
// }

MarkerItem.defaultProps = {
  text: null,
  handleActiveItem: null,
  color: null,
  activeItem: null,
  setShow: null,
  show: false,
}

MarkerItem.propTypes = {
  text: string,
  handleActiveItem: func,
  color: string,
  activeItem: string,
  setShow: func,
  show: bool,
  elem: object,
}

Marker.propTypes = {
  elem: object,
}

PersonPopover.propTypes = {
  show: bool,
  text: string,
  setShow: func,
  person: object,
}

export default Marker
