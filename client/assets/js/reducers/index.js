import { combineReducers } from 'redux'
import search  from './search'
import login from'./login'
import allTagSearch from './allTagSearch'


const reducer = combineReducers({
  search,
  allTagSearch,
  login
})

export default reducer
