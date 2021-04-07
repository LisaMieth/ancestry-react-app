import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import client from './apiClient'

export const fetchAll = createAsyncThunk('all/fetchAll', async () => {
  console.log('FETCHING DATA');
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
