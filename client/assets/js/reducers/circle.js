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
    tags: [],
    isLoading:true
  }


const circle = (state=initialState,action) => {
  switch(action.type){
    case 'CIRCLE':
    if(action.circle.tags==null&& action.circle.sns==null){
      return{
        circle:action.circle.Circle,
        events:action.circle.events,
        sns:[],
        tags:[],
        isLoading:false
      }
    }else if(action.circle.sns==null){
        return{
          circle:action.circle.Circle,
          sns:[],
          events:action.circle.events,
          tags:action.circle.tags,
          isLoading:false
        }
      }else if(action.circle.tags==null){
        return{
          circle:action.circle.Circle,
          sns:action.circle.sns,
          events:action.circle.events,
          tags:[],
          isLoading:false
        }
      }else{
        return{
          circle:action.circle.Circle,
          sns:action.circle.sns,
          events:action.circle.events,
          tags:action.circle.tags,
          isLoading:false
        }
      }
      case 'LOAD_START':
        return Object.assign({},state,{
            isLoading:true
          })
    default:
    return (
      state
    )
  }
}

export default circle
