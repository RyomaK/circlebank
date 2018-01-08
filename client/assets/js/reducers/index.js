import { combineReducers } from 'redux'
import search  from './search'
import allTagSearch from './allTagSearch'
import setStatus from './setStatus'


const reducer = combineReducers({
  search,
  allTagSearch,
  setStatus
})

export default reducer
