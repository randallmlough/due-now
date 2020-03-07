import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'
import { logger } from 'redux-logger'
import thunk from '../middleware/thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// const enhancers =
//   process.env.NODE_ENV === 'development'
//     ? composeWithDevTools({
//         trace: true,
//         traceLimit: 25,
//       })(applyMiddleware(thunk, logger))
//     : applyMiddleware(thunk, logger)

const configureStore = (preloadedState = {}) =>
  createStore(
    reducers,
    preloadedState,
    composeWithDevTools({
      trace: true,
      traceLimit: 25,
    })(applyMiddleware(thunk, logger))
  )

export default configureStore
