import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import { fetchAll, selectLastNameMap } from '../app/allSlice'
import Marker from './Marker.jsx'
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
  const data = useSelector(state => state.all.data.filter(elem => !!elem.latitude))
  const colorMap = useSelector(selectLastNameMap)
  const status = useSelector(state => state.all.status)
  const error = useSelector(state => state.all.error)

  // Pass an array of things to watch out for and don't rerender if they haven't changed
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
          yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
        >
          {data.map((elem) => {
            const active = elem.last_name_normed === activeItem
            return (
              <Marker
                key={`${elem.last_name_normed}${elem.place}`}
                active={active}
                color={colorMap[elem.last_name_normed].color}
                family={elem}
                handleActiveItem={setActiveItem}
                lat={elem.latitude}
                lng={elem.longitude}
              />
            )
          })}
        </GoogleMap>
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
