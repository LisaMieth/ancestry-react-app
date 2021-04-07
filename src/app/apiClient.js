import axios from 'axios'

// API Client
export default axios.create({
  // TODO: Switch between DEV and PROD
  baseURL: 'http://localhost:5000',
  timeout: 1000,
  headers: { 'Content-type': 'application/json' },
})
