const initialState ={
      name:"" ,
      image: "",
      fee: 0,
      capacity: 0,
      place:"",
      detail:"",
      agenda:"",
  }

const adminEventState = (state=initialState,action) => {
  switch(action.type){

    case 'EVENT_NAME':
      return Object.assign({},state,{
          name: action.name
        })
    case 'EVENT_FEE':
      return Object.assign({}, state, {
        fee: Number(action.fee)
        })
    case 'EVENT_CAPACITY':

      return Object.assign({}, state, {
        capacity: Number(action.capacity)
        })
    case 'EVENT_PLACE':
      return Object.assign({}, state, {
        place: action.place
        })
    case 'EVENT_DETAIL':
      return Object.assign({}, state, {
        detail: action.detail
      })
    case 'EVENT_AGENDA':
      return Object.assign({}, state, {
        agenda: action.agenda
      })
    default:
      return(
        state
      )

  }
};

export default adminEventState
