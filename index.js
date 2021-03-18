import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import App from './src/components/App.jsx'

ReactDOM.render(
  <App />,
  document.getElementById('app'),
)

module.hot.accept()
