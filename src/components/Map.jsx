import React, { Component } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%',
}

// Munich as center - TODO: calculate this maybe?
const center = {
  lat: 48.137154,
  lng: 11.576124,
}

class Map extends Component {
  render () {
    return (
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
        // googleMapsApiKey='test'

      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={8}
        />
          { /* Child components, such as markers, info windows, etc. */ }
          {/* <></> */}
        {/* </GoogleMap> */}
      </LoadScript>
    )
  }
}

export default Map
