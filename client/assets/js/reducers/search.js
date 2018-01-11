const search = (state={circles:[]}, action) => {
  console.log("search")
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
