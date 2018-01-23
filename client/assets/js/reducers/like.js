const like = (state="",action) => {
  switch(action.type){

    case 'LIKE':
      return{
        circle: action.circle
      }
    break;
    default:
      return(
        state
      )
    break;
  }
}

export default like
