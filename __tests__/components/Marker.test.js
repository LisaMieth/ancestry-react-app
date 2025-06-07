import React from 'react'
import { render, fireEvent } from '../../test-utils.jsx'
import { MarkerItem } from '../../src/components/Marker.jsx'

// Sample data & mock for tests to run.
const sampleData = [{ id: 1, first_name: 'Maria', last_name: 'Mayer' }]

jest.mock('../../src/api/apiClient', () => ({ getDuckDb: jest.fn().mockResolvedValue({}) }))
jest.mock('../../src/api/queries', () => ({ selectAll: jest.fn().mockResolvedValue(sampleData) }))

describe('MarkerItem', () => {
  test('calls event handler on click', () => {
    const setActiveItem = jest.fn()
    const setShow = jest.fn()
    const elem = {
      last_name_normed: 'Mayer',
    }
    const { container } = render(<MarkerItem
        activeItem={'Mayer'}
        elem={elem}
        handleActiveItem={setActiveItem}
        setShow={setShow}
      />)
    fireEvent.click(container.querySelector('.marker'))
    expect(setActiveItem).toHaveBeenCalledTimes(1)
  })

  test('calls setShow on click', () => {
    const setShow = jest.fn()
    const setActiveItem = jest.fn()
    const elem = {
      last_name_normed: 'Mayer',
    }
    const { container } = render(<MarkerItem
        show={false}
        elem={elem}
        setShow={setShow}
        handleActiveItem={setActiveItem}
      />)
    fireEvent.click(container.querySelector('.marker'))
    expect(setShow).toHaveBeenCalledTimes(1)
  })

  test('adds red border to marker when active', () => {
    const elem = {
      last_name_normed: 'Mayer',
    }
    const { container } = render(<MarkerItem
        activeItem={'Mayer'}
        elem={elem}
      />)
    expect(container.querySelector('.marker')).toHaveStyle({ border: '4px solid red' })
  })
})
