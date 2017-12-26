
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

    case 'ZERO_RESULT':
      return{
        message: action.message
      }


    default:
      return(
        state
      )
    }
}
export default allTagSearch
