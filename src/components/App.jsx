import React, { Component } from 'react'
import Map from './Map.jsx'

class App extends Component {
  render () {
    return (
      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <Map />
      </div>
    )
  }
}

export default App
