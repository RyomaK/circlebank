import { combineReducers } from 'redux'
import search  from './search'
import allTagSearch from './allTagSearch'
import setStatus from './setStatus'
import loginCheck from './loginCheck'
import user from './user'
import image from './image'
import like from './like'
import searchWord from './searchWord'
import circle from './circle'
import circleTag from './circleTag'


const reducer = combineReducers({
  search,
  allTagSearch,
  setStatus,
  user,
  loginCheck,
  image,
  searchWord,
  circle,
  circleTag,
  like
})

export default reducer
