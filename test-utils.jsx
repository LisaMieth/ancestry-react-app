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
  data: {
    last_name_normed: 'Bettinger',
    place: 'Feldmoching',
    latitude: 48.213803600000006,
    longitude: 11.5412753,
    person: [
      {
        reference: '@I1XXXXXI248@',
        full_name: 'Benno Bettinger',
        father_name: 'Jakob Pettinger',
        father_reference: '@X16I253@',
        mother_name: 'Anna Grabmayr',
        mother_reference: '@I1XXXXXI258@',
        id: '98B09D73E3F740C08D9B7963A729A92C',
        last_name: 'Bettinger',
        first_name: 'Benno',
        gender: 'M',
        birth_place: 'Feldmoching',
        date_birth: '1788-05-31 00:00:00',
        date_death: '1858-01-05 00:00:00',
        death_place: 'Feldmoching',
        spouse_1_name: 'Anna Grabmaier',
        spouse_1_reference: '@X16I252@',
        husband_1_family_reference: '@I1XXXXXI248@',
        wife_1_family_reference: '@X16I252@',
        date_marriage_1: '1809-05-29 00:00:00',
        location_marriage_1: 'Feldmoching',
        child_1_family_reference: '@I1XXXXXI249@',
        last_name_normed: 'Bettinger',
        latitude: 48.213803600000006,
        longitude: 11.5412753,
        place: 'Feldmoching',
        spouse_last_name: 'Grabmaier',
        spouse_first_name: 'Anna',
      },
      {
        reference: '@X17I210@',
        full_name: 'Katharina Bettinger',
        father_name: 'Benno Bettinger',
        father_reference: '@I1XXXXXI248@',
        mother_name: 'Anna Grabmaier',
        mother_reference: '@X16I252@',
        id: '8493C55E07FF4CFCA04136B620748E8F',
        last_name: 'Bettinger',
        first_name: 'Katharina',
        gender: 'F',
        birth_place: 'Feldmoching',
        date_birth: '1818-06-08 00:00:00',
        date_death: '1880-07-26 00:00:00',
        death_place: 'Feldmoching',
        spouse_1_name: 'Nikolaus Ruedorfer',
        spouse_1_reference: '@X16I209@',
        husband_1_family_reference: '@X16I209@',
        wife_1_family_reference: '@X17I210@',
        date_marriage_1: '1841-10-11 00:00:00',
        location_marriage_1: 'Feldmoching',
        child_1_family_reference: '@XXXXXXXXXXXXXXXI21@',
        last_name_normed: 'Bettinger',
        latitude: 48.213803600000006,
        longitude: 11.5412753,
        place: 'Feldmoching',
        spouse_last_name: 'Ruedorfer',
        spouse_first_name: 'Nikolaus',
      },
      {
        reference: '@X17I274@',
        full_name: 'Johann Poettinger',
        father_name: null,
        father_reference: null,
        mother_name: null,
        mother_reference: null,
        id: '3FDFE706F8884F558951A195EF984940',
        last_name: 'Poettinger',
        first_name: 'Johann',
        gender: 'M',
        birth_place: null,
        date_birth: null,
        date_death: '1616-01-01 00:00:00',
        death_place: 'Feldmoching',
        spouse_1_name: null,
        spouse_1_reference: null,
        husband_1_family_reference: '@X17I274@',
        wife_1_family_reference: null,
        date_marriage_1: null,
        location_marriage_1: null,
        child_1_family_reference: '@X17I267@',
        last_name_normed: 'Bettinger',
        latitude: 48.213803600000006,
        longitude: 11.5412753,
        place: 'Feldmoching',
        spouse_last_name: null,
        spouse_first_name: null,
      },
    ],
    count: 3,
  },
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
