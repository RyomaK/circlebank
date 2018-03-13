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
        delegate_name:  "",
        delegate_contact: "",
        campus:"" ,
        excite:  "",
        fee: "",
        university:""
    },
    sns:[
    ],
    events: [],
    tags: []
}


const circle = (state=initialState,action) => {
  switch(action.type){
    case 'CIRCLE':
    if(action.circle.tags==null&& action.circle.sns==null){

      return{
        circle:action.circle.Circle,
        events:action.circle.events,
        sns:[],
        tags:[]
      }
    }else if(action.circle.sns==null){
        return{
          circle:action.circle.Circle,
          sns:[],
          events:action.circle.events,
          tags:action.circle.tags
        }
      }else if(action.circle.tags==null){
        return{
          circle:action.circle.Circle,
          sns:action.circle.sns,
          events:action.circle.events,
          tags:[]
        }
      }else{
        return{
          circle:action.circle.Circle,
          sns:action.circle.sns,
          events:action.circle.events,
          tags:action.circle.tags
        }

      }


    default:
    return(
      state
    )
  }
}

export default circle
