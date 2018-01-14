const search = (state={circles:[]}, action) => {
  switch(action.type){
    case 'CERCLE_SEARCH':
      return{circles: action.circles}
    default:
      return(
        state
      )
      break;
    }
}
export default search
