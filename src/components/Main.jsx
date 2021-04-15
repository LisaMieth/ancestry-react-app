import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
    return (<div className='loader'>Loading...</div>)
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
          {data.map((elem) => (
            <Marker
              color={colorMap[elem.last_name_normed].color}
              key={elem.id}
              lat={elem.latitude}
              lng={elem.longitude}
            />
          ))}
        </GoogleMap>
        <Legend />
      </div>
    )
  }
  if (status === 'failed') {
    return (<div className='error'>{error}</div>)
  }

  return null
}

export default Main
