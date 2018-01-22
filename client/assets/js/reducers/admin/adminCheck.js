const adminCheck = (state={admin:false},action) => {
  switch(action.type){
    case 'ADMIN_CHECK':
      return{
        admin:true
      }
    case 'ADMIN_LOGOUT':
      return{
        admin:false
      }
    default:
      return(
        state
      )
  }
}

export default adminCheck
