const initialState = {
      name:"" ,
      url_name: "",
      number: 0,
      gender_ratio: "",
      image: "",
      introduction: "",
      message_for_fresh: "",
      delegete_name:  "",
      delegete_contact: "",
      campus:"" ,
      excite:  0,
      fee: 0,
      university:"同志社大学"
  }

const adminSetState = (state=initialState,action) => {
console.log(action)
  switch(action.type){

    case 'ADMIN_SET_NAME':
      return Object.assign({},state,{
          name: action.name}
          )
    case 'ADMIN_SET_URL':
      return Object.assign({}, state, {
        url_name: action.url
        })
    case 'ADMIN_SET_NUMBER':
      return Object.assign({}, state, {
        number: Number(action.number)
        })
    case 'ADMIN_SET_RAITIO':
      return Object.assign({}, state, {
        gender_ratio: action.raitio
        })
    case 'ADMIN_SET_IMAGE':
      return Object.assign({}, state, {
        image: action.image
      })
    case 'ADMIN_SET_INTRO':
      return Object.assign({}, state, {
        introduction: action.intro
      })
    case 'ADMIN_SET_MESSAGE':
      return Object.assign({}, state, {
        message_for_fresh: action.message
      })
    case 'ADMIN_SET_DELENAME':
      return Object.assign({}, state, {
        delegete_name: action.name
      })
    case 'ADMIN_SET_CONTACT':
      return Object.assign({}, state, {
        delegete_contact: action.contact
      })
    case 'ADMIN_SET_CAMPUS':
      return Object.assign({}, state, {
        campus: action.campus
      })
    case 'ADMIN_SET_EXCITE':
      return Object.assign({}, state, {
        excite: Number(action.excite)
      })
    case 'ADMIN_SET_FEE':
      return Object.assign({}, state, {
        fee: Number(action.fee)
      })
    default:
      return(
        state
      )

  }
};

export default adminSetState
