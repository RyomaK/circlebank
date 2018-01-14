const initialState = {
  university: "",
  name: "",
  sex: "",
  year: "",
  email: "",
  image: "",
  department: "",
  subject: "",
  password: ""
}

const user = (state=initialState,action) => {
  switch(action.type){

    case 'SHOW_USER':
    return{
      name: action.name,
      mail: action.mail,
      year: action.year,
      department: action.department,
      subject: action.subject,
      password: action.password,
      image: action.image,
      sex: action.sex,
      university: action.university
    }
    default:

    return(
      state
    )
  }
}

export default user
