
const initialState = {
  tags:[
    {
        "title": "運動",
        "tags": [
            {
                "id": 1,
                "name": "バスケットボール"
            },
            {
                "id": 6,
                "name": "テニス"
            }
        ]
    },
    {
        "title": "文化",
        "tags": [
            {
                "id": 7,
                "name": "軽音"
            }
        ]
    },
    {
        "title": "その他",
        "tags": [
            {
                "id": 2,
                "name": "アットホーム"
            },
            {
                "id": 3,
                "name": "京田辺"
            },
            {
                "id": 4,
                "name": "今出川"
            },
            {
                "id": 5,
                "name": "飲みサークル"
            }
        ]
    }
]
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
