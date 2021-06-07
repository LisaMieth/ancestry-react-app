import React from 'react'
import { waitFor } from '@testing-library/dom'
import { render, screen } from '../../test-utils.jsx'
import Main from '../../src/components/Main.jsx'
import * as apiClient from '../../src/app/apiClient'

describe('Main', () => {
  test('displays loading information on load', () => {
    render(<Main />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('displays map on successfull data fetch', async () => {
    const { container } = render(<Main />)
    await (waitFor(() => expect(apiClient.get).toHaveBeenCalledTimes(1)))
    expect(container.getElementsByClassName('mapWrapper')).toHaveLength(1)
  })

  test('displays expected number of markers', async () => {
    const { container } = render(<Main />)
    await (waitFor(() => expect(apiClient.get).toHaveBeenCalledTimes(1)))
    expect(container.getElementsByClassName('marker')).toHaveLength(1)
  })
})
