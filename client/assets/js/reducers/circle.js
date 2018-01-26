const initialState = {
  circle: {
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
    },
    events: [],
    tags: []
}


const circle = (state=initialState,action) => {

  switch(action.type){
    case 'CIRCLE':

      return{
        circle:action.circle.Circle,
        events:action.circle.events,
        tags:action.circle.tags
      }
    default:
    return(
      state
    )
  }
}

export default circle
