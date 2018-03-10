const eventInfo = (state={events:[]},action) => {
  switch(action.type){
    case 'EVENT_INFO':
      return{
        events:action.events
      }
    default:
      return(
        state
      )
  }
}

export default eventInfo
