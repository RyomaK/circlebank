import { combineReducers } from 'redux'
import search  from './search'
import allTagSearch from './allTagSearch'


const reducer = combineReducers({
  search,
  allTagSearch
})

export default reducer
