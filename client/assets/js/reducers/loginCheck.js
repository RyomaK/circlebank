const loginCheck = (state={isLogin:false},action) => {

  switch(action.type){

    case 'LOGIN_CHECK':
      if(action.number == 1){
        return{
          isLogin:true
        }
      }else{
        return{
          isLogin:false
        }
      }
    case 'LOGOUT':
      return{
        isLogin:false
      }
      break;
    case 'LOGIN':
      return{
        isLogin:true
      }
    default:
    return(
      state
    )
  }
}

export default loginCheck
