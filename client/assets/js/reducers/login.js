const login = (state = {isLogin: false},action) => {
  switch(action.type){
    case 'LOGIN_CHECK':
      if(action.isLogin == 1){
        return{
          isLogin:true
        }
      }else{
        return{
          isLogin:false
        }
      }
      break;

    default:
    return(
      state
    )
  }
}

export default login
