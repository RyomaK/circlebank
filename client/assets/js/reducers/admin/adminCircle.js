const initialState = {
  circle: [{
        id:"",
        name:"" ,
        url_name: "",
        number: "",
        gender_ratio: "",
        image: "",
        introduction: "",
        message_for_fresh: "",
        delegete_name:  "",
        delegete_contact: "",
        campus:"" ,
        excite:  "",
        fee: "",
        university:""
    }
  ]
}

const adminCircle = (state=initialState,action) => {
  switch(action.type){
    case 'ADMIN_CIRCLE':
      
      return{
        circle: action.circle
      }
    default:
      return(
        state
      )
  }
}

export default adminCircle
