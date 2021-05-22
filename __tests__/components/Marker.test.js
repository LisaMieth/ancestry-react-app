import React from 'react'
import { render, fireEvent } from '../../test-utils.jsx' 
import Marker from '../../src/components/Marker.jsx'

describe('Marker', () => {
  test('calls event handler on click', () => {
    const setActiveItem = jest.fn()
    const { container } = render(<Marker
        active={false}
        handleActiveItem={setActiveItem}
      />)
    fireEvent.click(container.querySelector('.marker'))
    expect(setActiveItem).toHaveBeenCalledTimes(1)
  })

  test('adds red border to marker when active', () => {
    const { container } = render(<Marker
        active={true}
      />)
    expect(container.querySelector('.marker')).toHaveStyle({ border: '4px solid red' })
  })
})
