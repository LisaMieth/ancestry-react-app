import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import { fetchAll } from '../app/allSlice'
import GoogleMap from './GoogleMap.jsx'
import Legend from './Legend.jsx'

// Munich as center - TODO: calculate this maybe?
const center = {
  lat: 48.137154,
  lng: 11.576124,
}

const Main = () => {
  const dispatch = useDispatch()
  const [activeItem, setActiveItem] = useState(null)
  const status = useSelector(state => state.all.status)
  const error = useSelector(state => state.all.error)
  const data = useSelector(state => state.all.data.filter(elem => !!elem.latitude))

  const points = data.map(elem => ({
    type: 'Feature',
    properties: {
      cluster: false,
      person: elem,
    },
    geometry: {
      ...JSON.parse(elem.point),
    },
  }))

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAll())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return (
      <Spinner animation="border" role="status" className='loadingSpinner'>
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }

  if (status === 'succeeded') {
    return (
      <div className='main'>
        <GoogleMap
          defaultZoom={10}
          defaultCenter={center}
          points={points}
          activeItem={activeItem}
          handleActiveItem={setActiveItem}
        />
        <Legend handleActiveItem={setActiveItem} activeItem={activeItem} />
      </div>
    )
  }
  if (status === 'failed') {
    return (<div className='error'>{error}</div>)
  }

  return null
}

export default Main
