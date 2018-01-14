const searchWord = (state={word:""},action)=>{
  switch(action.type){
    case 'SET_WORD':
      return{
        word: action.word
      }
    default:
    return(
      state
    )
  }
};

export default searchWord
