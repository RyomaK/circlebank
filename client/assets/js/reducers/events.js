const events = (state={events:[]},action) => {
  switch(action.type){

    case 'EVENT':
      return{
        events:action.events
      }
    default:
      return(
        state
      )
  }
}

export default events
