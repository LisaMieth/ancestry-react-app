import React from 'react'
import * as reactRedux from 'react-redux'
import { waitFor } from '@testing-library/dom'
import { render, fireEvent } from '../../test-utils.jsx'
import Legend from '../../src/components/Legend.jsx'

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
const useRefMock = jest.spyOn(React, 'useRef')

beforeEach(() => {
  useSelectorMock.mockClear()
  useRefMock.mockClear()
})

describe('Legend', () => {
  test('calls event handler on click of list item', async () => {
    useSelectorMock.mockReturnValue({ Mayer: { variations: [], color: '#807577' } })
    const setActiveItem = jest.fn()
    const { container } = render(<Legend
        activeItem={null}
        handleActiveItem={setActiveItem}
      />)

    await waitFor(() => expect(container.getElementsByClassName('accordion')).toHaveLength(1))
    fireEvent.click(container.querySelector('.accordionTop'))
    expect(setActiveItem).toHaveBeenCalledTimes(1)
  })

  test('mark active item red in list', async () => {
    useSelectorMock.mockReturnValue({ Mayer: { variations: [], color: '#807577' } })
    useRefMock.mockReturnValueOnce({ current: document.createElement('div') })
    const setActiveItem = jest.fn()
    const { container } = render(<Legend
      activeItem={'Mayer'}
      handleActiveItem={setActiveItem}
      />)

    await waitFor(() => expect(container.getElementsByClassName('accordion')).toHaveLength(1))
    expect(container.querySelector('.accordionItem')).toHaveStyle({ backgroundColor: '#ff00005e' })
  })
})
