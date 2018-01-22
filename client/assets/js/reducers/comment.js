const comment = (state={comment:""},action) => {
  switch(action.type){
    case 'GET_COMMENT':
      return{
        comment:action.comment
      }
    default:
      return(
        state
      )
  }
}

export default comment
