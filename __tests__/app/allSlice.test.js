import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import reducer, { fetchAll } from '../../src/app/allSlice'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)
const sampleData = [{ id: 1, first_name: 'Maria', last_name: 'Mayer' }]

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

jest.mock('../../src/api/apiClient', () => {
  return { 'getDuckDb': jest.fn().mockResolvedValue({}) }
})

jest.mock('../../src/api/queries', () => {
  return { 'selectAll': jest.fn().mockResolvedValue(sampleData) }
})



// afterEach(() => {
//   jest.resetModules()
// })

// afterAll(() => {
//   jest.unmock('../../src/app/apiClient')
// })

const dbMock = jest.fn().mockImplementation(() => {})

describe('allSlice reducer', () => {
  test('sets loading status when fetchAll is pending', () => {
    const action = { type: 'all/fetchAll/pending' }
    const state = reducer(initialState, action)
    expect(state).toEqual({ data: [], status: 'loading', error: null })
  })

  it('sets loaded and success status when fetchAll is fulfilled', () => {
    const action = { type: 'all/fetchAll/fulfilled', payload: [{ id: 1, first_name: 'Maria', last_name: 'Mayer' }] }
    const state = reducer(initialState, action)
    expect(state.data).toEqual([{ id: 1, first_name: 'Maria', last_name: 'Mayer' }])
    expect(state.status).toEqual('succeeded')
  })

  it('sets error and failure status when fetchAll is rejected', () => {
    const action = { type: 'all/fetchAll/rejected', payload: 'Some error' }
    const state = reducer(initialState, action)
    expect(state).toEqual({ data: [], status: 'failed', error: 'Some error' })
  })
})

describe('fetchAll', () => {
  // test('calls apiClient', () => {
  //   const store = mockStore({ all: { data: [], status: 'idle' } })
  //   const dbInstance = dbMock.getDuckDB()
  //   store.dispatch(fetchAll(dbInstance))
    
  //   expect(dbInstance).toHaveBeenCalledTimes(1)
  // })

  test('dispatches pending & fulfilled action on successful API call', () => {
    const expectedActions = [
      { type: 'all/fetchAll/pending' },
      { type: 'all/fetchAll/fulfilled', payload: sampleData },
    ]
    const store = mockStore({ all: { data: [], status: 'idle' } })

    store.dispatch(fetchAll()).then(() => {
      const actions = store.getActions()
      expect(actions[0].type).toEqual('all/fetchAll/pending')
      expect(actions[1].type).toEqual('all/fetchAll/fulfilled')
    })
  })
  
  // test('dispatches pending & rejected action on unsuccessful API call', () => {
  //   apiClient.get.mockImplementation(() => {
  //     throw new Error('Some error')
  //   })
  
  //   const expectedActions = [
  //     { type: 'all/fetchAll/pending' },
  //     { type: 'all/fetchAll/rejected', payload: 'Some error' }
  //   ]
  //   const store = mockStore({ all : { data: [], status: 'idle' } })
    
  //   store.dispatch(fetchAll()).then(() => {
  //     const actions = store.getActions()
  //     expect(actions[0].type).toEqual('all/fetchAll/pending')
  //     expect(actions[1].type).toEqual('all/fetchAll/rejected')
  //     expect(actions[1].payload).toEqual('Some error')
  //   })
  // })
})
