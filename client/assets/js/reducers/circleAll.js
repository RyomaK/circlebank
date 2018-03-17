const circleAll = (state={item:[]},action) => {

  switch(action.type){

    case 'SET_ITEM':
      if(action.circles){
        return{
          item: action.circles
        }
      }else{
        return{
          item: []
        }
      }

    break;
    default:
    return(
      state
    )
  }
}
export default circleAll
