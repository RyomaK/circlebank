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
    console.log("aaaa")
    return{
      university: action.university,
      name: action.name,
      sex: action.sex,
      year: action.year,
      email: action.mail,
      department: action.department,
      subject: action.subject,
      password: action.password
    }
    default:
    return(
      state
    )
  }
}

export default user
