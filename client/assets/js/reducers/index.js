import { combineReducers } from 'redux'
import search  from './search'
import allTagSearch from './allTagSearch'
import setStatus from './setStatus'
import loginCheck from './loginCheck'
import user from './user'


const reducer = combineReducers({
  search,
  allTagSearch,
  setStatus,
  user,
  loginCheck
})

export default reducer
