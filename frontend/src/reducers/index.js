import { combineReducers } from 'redux'
import { sessionReducer } from './session_reducer'
import { entitiesReducer } from './entities_reducer'

const reducers = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
})

export default reducers
