const initialState = {
  university: "",
  name: "",
  sex: "",
  year: "",
  email: "",
  department: "",
  subject: "",
  password: ""
}

const user = (state=initialState,action) => {
  switch(action.type){
    case 'SHOW_USER':
    console.log("a")
    return{
      university: action.user.university,
      name: action.user.data.name,
      sex: action.user.data.sex,
      year: action.user.data.year,
      email: action.user.data.mail,
      department: action.user.data.department,
      subject: action.user.data.subject,
      password: action.user.data.password
    }
    default:
    return(
      state
    )
  }
}

export default user
