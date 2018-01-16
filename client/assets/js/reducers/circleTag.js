const circleTag = (state={circle:[{id:0}]},action) => {
  switch(action.type){
    case 'TAG_SEARCH':

      return{
        circle: action.data
      }
    break;
    default:
    return(
      state
    )
  }
}
export default circleTag
