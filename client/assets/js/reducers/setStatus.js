const initialState = {

  university: "同志社",
  name: "",
  sex: "男",
  email: "",
  department: "",
  subject: "",
  password: ""

}

const setStatus = (state=initialState,action) => {

  switch(action.type){
    case 'SET_UNIVERSITY':
      return Object.assign({},state,{
          university: action.university}

          )
    case 'SET_NAME':
      return Object.assign({}, state, {
        name: action.name
        })
    case 'SET_SEX':
      if(action.sex){
        return Object.assign({}, state, {
            sex: "男"
            })
      }else{
        return Object.assign({}, state, {
            sex: "女"
          })
      }

    case 'SET_EMAIL':
      return Object.assign({}, state, {
        email: action.email
      })
    case 'SET_DEPARTMENT':
      return Object.assign({}, state, {
        department: action.department
      })
    case 'SET_SUBJECT':
      return Object.assign({}, state, {
        subject: action.subject
      })
    case 'SET_PASSWORD':
      return Object.assign({}, state, {
        password: action.password
      })
    default:
      return(
        state
      )

  }
};

export default setStatus
