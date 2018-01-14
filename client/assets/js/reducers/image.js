const image = (state={image: ""},action) => {
  switch(action.type){
    case 'IMAGE_SET':
      return{
        image: action.image
      }
    default:
    return(
      state
    )
  }
}

export default image
