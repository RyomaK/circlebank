import { combineReducers } from 'redux'
import search  from './search'
import allTagSearch from './allTagSearch'
import setStatus from './setStatus'
import loginCheck from './loginCheck'
import user from './user'
import image from './image'
import searchWord from './searchWord'
import circle from './circle'


const reducer = combineReducers({
  search,
  allTagSearch,
  setStatus,
  user,
  loginCheck,
  image,
  searchWord,
  circle

})

export default reducer
