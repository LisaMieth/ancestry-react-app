import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { FaChevronDown } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectLastNameMap } from '../app/allSlice'

const Legend = () => {
  const colorMap = useSelector(selectLastNameMap)

  return (
    <div className="legendWrapper">
      <Accordion defaultActiveKey="0">
        {Object.keys(colorMap).map((key) => {
          const { color, variations } = colorMap[key]
          return (
            <Card key={key} className='accordionItem' >
              <Card.Header>
                <Accordion.Toggle as={'div'} eventKey={key} className='accordionTop'>
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

export default Legend
