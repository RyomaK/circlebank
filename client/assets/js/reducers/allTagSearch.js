
const initialState = {
  tags:[{
    id:1,
    name:"テスト"
  }]
}

const allTagSearch = (state = initialState, action) => {
  switch(action.type){

    case 'ALL_TAG_SEARCH':
      return  {
        tags: action.tags
      }
      break;
    case 'ZERO_RESULT':
      return{
        message: action.message
      }
      break;

    default:
      return(
        state
      )
      break;
    }
}
export default allTagSearch
