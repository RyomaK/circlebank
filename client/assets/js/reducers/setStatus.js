const initialState = {

  university: "同志社大学",
  name: "",
  sex: "男",
  year: "2018",
  email: "",
  department: "神学部",
  subject: "神学科",
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
    case 'SET_YEAR':
      return Object.assign({}, state, {
        year: action.year
        })
    case 'SET_SEX':
    console.log("a")
      return Object.assign({}, state, {
        sex: action.sex
        })
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
