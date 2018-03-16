const search = (state={circles:[]}, action) => {
  switch(action.type){
    case 'CERCLE_SEARCH':
      if(action.circles){
        return{circles: action.circles}
      }else{
        return{circles:[]}
      }
    case 'SEARCH_RESET':
      return{circles:[]}

    default:
      return(
        state
      )
    }
}
export default search
