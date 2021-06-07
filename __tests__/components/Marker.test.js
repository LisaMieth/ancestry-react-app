import React from 'react'
import { render, fireEvent } from '../../test-utils.jsx'
import { MarkerItem } from '../../src/components/Marker.jsx'

describe('MarkerItem', () => {
  test('calls event handler on click', () => {
    const setActiveItem = jest.fn()
    const setShow = jest.fn()
    const { container } = render(<MarkerItem
        active={false}
        handleActiveItem={setActiveItem}
        setShow={setShow}
      />)
    fireEvent.click(container.querySelector('.marker'))
    expect(setActiveItem).toHaveBeenCalledTimes(1)
  })

  test('calls setShow on click', () => {
    const setShow = jest.fn()
    const setActiveItem = jest.fn()
    const { container } = render(<MarkerItem
        show={false}
        setShow={setShow}
        handleActiveItem={setActiveItem}
      />)
    fireEvent.click(container.querySelector('.marker'))
    expect(setShow).toHaveBeenCalledTimes(1)
  })

  test('adds red border to marker when active', () => {
    const { container } = render(<MarkerItem
        active={true}
      />)
    expect(container.querySelector('.marker')).toHaveStyle({ border: '4px solid red' })
  })
})
