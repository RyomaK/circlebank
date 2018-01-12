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
  console.log("user")
  switch(action.type){

    case 'SHOW_USER':
    return{
      name: action.name,
      mail: action.email,
      year: action.year,
      department: action.department,
      subject: action.subject
    }
    default:

    return(
      state
    )
  }
}

export default user
