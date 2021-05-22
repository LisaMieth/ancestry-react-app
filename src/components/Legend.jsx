import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { FaChevronDown } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectLastNameMap } from '../app/allSlice'

const Legend = ({ handleActiveItem, activeItem }) => {
  const colorMap = useSelector(selectLastNameMap)
  const refs = Object.keys(colorMap).reduce((acc, key) => {
    acc[key] = useRef()
    return acc
  }, {})

  const executeScroll = (key) => {
    const ref = refs[key]
    if (ref.current) ref.current.scrollIntoView()
  }

  return (
    <div className="legendWrapper">
      <Accordion defaultActiveKey="0">
        {Object.keys(colorMap).map((key) => {
          const { color, variations } = colorMap[key]
          const cardStyle = {}

          if (key === activeItem) {
            cardStyle.backgroundColor = '#ff00005e'
            executeScroll(key)
          }

          return (
            <Card key={key} className='accordionItem' style={cardStyle}>
              <Card.Header>
                <Accordion.Toggle as={'div'} eventKey={key} ref={refs[key]} className='accordionTop' onClick={() => handleActiveItem(key)}>
                  <div className="legendMarker" style={{ backgroundColor: color }} />
                  <span>{key}</span>
                  {!!variations.length ? <FaChevronDown className='drowpdownArrow' /> : <div />}
                </Accordion.Toggle>
              </Card.Header>
              {!!variations.length
              && <Accordion.Collapse eventKey={key}>
                <Card.Body>
                  {variations.map(elem => <li key={elem}>{elem}</li>)}
                </Card.Body>
              </Accordion.Collapse>
              }
            </Card>
          )
        })}
      </Accordion>
    </div>
  )
}

Legend.propTypes = {
  handleActiveItem: PropTypes.func,
  activeItem: PropTypes.string,
}

export default Legend
