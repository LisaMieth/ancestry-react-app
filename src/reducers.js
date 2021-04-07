// NOTE: available statuses for any part of the store:
// [idle, loading, success, failure]
export const initialState = {
  status: 'idle',
  all: [],
  family: [],
  lastname: [],
  lineage: [],
  error: null,
}

export const allReducer = function (state = initialState, action) {
  if (action.type === 'LOAD_ALL') {
    return {
      ...state,
      status: 'loading',
    }
  }

  if (action.type === 'LOADED_ALL') {
    return {
      ...state,
      status: 'success',
      all: action.payload,
    }
  }

  return state
}

export const rootReducer = function (state = initialState, action) {
  // NOTE: This piece of code checks for potential errors
  if (action.error) {
    return {
      ...state,
      error: {
        errorMessage: 'AN ERROR OCCURED',
        ...action.payload.response.data,
      },
    }
  }

  return {
    all: allReducer(state),
  }
}
