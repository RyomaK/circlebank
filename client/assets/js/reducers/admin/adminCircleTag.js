const adminCircleTag = (state="",action) => {
  switch(action.type){
    case 'ADMIN_CIRCLE_TAG':
      return{
        tags:action.tag
      }
    default:
      return(
        state
      )
  }
}

export default adminCircleTag
