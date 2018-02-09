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
import comment from './comment'
import adminCheck from './admin/adminCheck'
import adminCircle from './admin/adminCircle'
import adminSetState from './admin/adminSetState'
import adminEventState from './admin/adminEventState'
import circleAll from './circleAll'


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
  like,
  comment,
  circleAll,

  adminCheck,
  adminCircle,
  adminSetState,
  adminEventState
})

export default reducer
