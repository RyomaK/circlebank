const circleTag = (state={circle:[{id:0}],isLoad:false},action) => {
  switch(action.type){
    case 'TAG_SEARCH':

      return{
        circle:action.data
      }
    case 'TAG_RESET':
    return {
        circle:[{id:0}]
    }
    default:
    return(
      state
    )
  }
}
export default circleTag
