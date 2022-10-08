import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './style.css'
import App from './src/components/App.jsx'
import store from './src/app/store'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
