import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import allReducer from './src/app/allSlice'

const store = configureStore({
  reducer: {
    all: allReducer,
  },
})

// Wrap dispatch in a mock so it can be spied on.
store.dispatch = jest.fn(store.dispatch)

const sampleData = {
  data: [{
    id: 1,
    first_name: 'Maria',
    last_name: 'Mayer',
    last_name_normed: 'Mayer',
    latitude: 48.137154,
    longitude: 11.576124,
  },
  {
    id: 2,
    first_name: 'Joseph',
    last_name: 'Mayer',
    last_name_normed: 'Mayer',
    latitude: 48.137154,
    longitude: 11.576124,
  }],
}

jest.mock('./src/app/apiClient', () => ({ get: jest.fn().mockResolvedValue(sampleData) }))

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => (
  <Provider store={store}>
      {children}
  </Provider>
)

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'
export { store }
export { customRender as render }
