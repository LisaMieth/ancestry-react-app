import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import allReducer from './allSlice'

// const rootReducer = combineReducers({
//   all: allReducer,
// })

// export default function configureAppStore(preloadedState) {
//   const store = configureStore({
//     reducer: rootReducer,
//     middleware: [thunkMiddleware, ...getDefaultMiddleware()],
//     preloadedState,
//   })

//   if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
//   }

//   return store
// }

export default configureStore({
  reducer: {
    all: allReducer,
  },
})
