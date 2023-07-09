import { combineReducers } from 'redux'
import toggleSidebarReducer from './toggleSidebarReducer'
import listSeenReducer from './listSeenReducer'
import loginStatusReducer from './loginStatusReducer'
import subscribeStatusReducer from './subscribeStatusReducer'
const allReducers = combineReducers({
  toggleSidebarReducer,
  listSeenReducer,
  loginStatusReducer,
  subscribeStatusReducer,
  // add more reducers here
})

export default allReducers
