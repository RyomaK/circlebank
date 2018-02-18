const userEvent = (state={events:[]},action) => {
  switch(action.type){

    case 'USER_EVENT':
      return{
        events:action.events
      }
    default:
      return(
        state
      )
  }
}

export default userEvent
