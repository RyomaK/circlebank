const loginCheck = (state={isLogin:'false'},action) => {

  switch(action.type){
    case 'LOGIN_CHECK':
      if(action.number){
        return{
          isLogin: 'true'
        }
      }else{
        return{
          isLogin: 'false'
        }
      }
    default:
    return(
      state
    )
  }
}

export default loginCheck
