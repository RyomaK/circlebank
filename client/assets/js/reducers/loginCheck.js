const loginCheck = (state={isLogin:'false',permit:'true'},action) => {
  switch(action.type){

    case 'LOGIN_CHECK':
      if((action.number == 1) &&(state.permit == 'true')){

        return{
          isLogin: 'true',permit: 'true'
        }
      }else{
        
        return{

          isLogin: 'false',permit: 'true'
        }
      }
    case 'LOGOUT':
      return{
        isLogin: 'false',permit: 'false'
      }
    case 'LOGIN':
      return{
        isLogin: 'true',permit: 'true'
      }
    default:
    return(
      state
    )
  }
}

export default loginCheck
