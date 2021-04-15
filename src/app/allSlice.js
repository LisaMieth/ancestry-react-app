import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import distinctColors from 'distinct-colors'
import chroma from 'chroma-js'
import client from './apiClient'

export const fetchAll = createAsyncThunk('all/fetchAll', async () => {
  const response = await client.get('/all')
  return response.data
})

export const allSlice = createSlice({
  name: 'all',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchAll.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchAll.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.data = state.data.concat(action.payload)
    },
    [fetchAll.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export default allSlice.reducer

/* eslint-disable camelcase */
export const selectLastNameMap = (state) => {
  if (state.all.status !== 'succeeded') return null

  const { data } = state.all
  const unique = data.reduce((acc, { last_name, last_name_normed }) => {
    if (!acc[last_name_normed]) {
      acc[last_name_normed] = {
        variations: [],
      }
    }

    if (last_name_normed !== last_name && !acc[last_name_normed].variations.includes(last_name)) {
      acc[last_name_normed].variations.push(last_name)
    }
    return acc
  }, {})

  const palette = distinctColors(
    { count: Object.keys(unique).length, samples: 800 },
  ).map(elem => chroma(elem).hex())

  const result = Object.keys(unique).reduce((acc, key, i) => {
    const value = unique[key]
    acc[key] = {
      ...value,
      color: palette[i],
    }
    return acc
  }, {})

  return result
}
