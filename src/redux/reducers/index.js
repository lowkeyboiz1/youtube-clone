import { combineReducers } from 'redux'
import toggleSidebarReducer from './toggleSidebarReducer'
import listSeenReducer from './listSeenReducer'
import loginStatusReducer from './loginStatusReducer'
import subscribeStatusReducer from './subscribeStatusReducer'
import likeVideoReducer from './likeVideoReducer'
const allReducers = combineReducers({
  toggleSidebarReducer,
  listSeenReducer,
  loginStatusReducer,
  subscribeStatusReducer,
  likeVideoReducer,
  // add more reducers here
})

export default allReducers
