const circleAll = (state={item:[]},action) => {
  switch(action.type){
    case 'SET_ITEM':
      return{
        item: action.item
      }
    break;
    default:
    return(
      state
    )
  }
}
export default circleAll
