const adminCheck = (state={admin:false},action) => {
  switch(action.type){
    case 'ADMIN_CHECK':
      return{
        admin:true
      }
    default:
      return(
        state
      )
  }
}

export default adminCheck
