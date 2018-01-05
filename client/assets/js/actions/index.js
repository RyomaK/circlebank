import axios from'axios'
import Cookies from 'universal-cookie';


const domain = 'http://localhost:8080'
var auth = '';
if(document.cookie.split('Authorization=')[1]){
  const box = document.cookie.split('Authorization=')[1];
  if(box.split(';')[0]){
    auth = box.split(';'[0])
  }else{
    auth = box;
  }
}

export const setErrorMessage = message => dispatch => dispatch({type: 'ZERO_RESULTS',message});

export const setLogin = isLogin => dispatch => dispatch({type:'LOGIN_CHECK',isLogin});

export const logout = () => dispatch => {
  axios.post('http://localhost:8080/logout')
}

export const loginCheck = () => dispatch => {

  axios
  .get('http://localhost:8080/api/doshisha/circle',{headers: { "Authorization": `Bearer ${auth}`}})
  .then((results) => {
    const status = results.status

    return { status };
  })
  .then(({status})=> {
    switch (status) {
      case 200: {
        dispatch(setLogin(1));
        break;
      }
      case 401: {
        dispatch(setLogin(-1));
        break;
      }
      default: {
        dispatch(setErrorMessage('エラーが発生しました'));
        break;
      }
    }
  })
  .catch(() => {
    dispatch(setErrorMessage('通信に失敗しました'));
  });
}

export const circleSearchStart = URL => dispatch => {
    axios
    .get(URL,{headers: { "Authorization": `Bearer ${auth}`}})
    .then((results) => {
      const status = results.status
      const circles = results.data
      if (typeof circles === undefined) {
        return { status };
      }

      return { status, circles };
    })
    .then(({status, circles})=> {
      switch (status) {
        case 200: {
          dispatch({type:'CERCLE_SEARCH',circles});
          break;
        }
        case 401: {
          dispatch(setLogin(-1));
          break;
        }
        default: {
          dispatch(setErrorMessage('エラーが発生しました'));
          break;
        }
      }
    })
    .catch(() => {
      dispatch(setErrorMessage('通信に失敗しました'));
    });
}

export const tagSearchStart = ()=> dispatch => {
    axios
    .get(`${domain}/api/doshisha/tag/`,{headers: { "Authorization": `Bearer ${auth}`}})
    .then((results) => {
      const status = results.status
      const tags = results.data
      if (typeof tags === undefined) {
        return { status };
      }
      return { status, tags };
    })
  .then(({status, tags})=> {
      switch (status) {
        case 200: {
          dispatch({type:'ALL_TAG_SEARCH',tags});
          break;
        }
        case 401: {
          dispatch(setLogin(-1));
          break;
        }
        default: {
          dispatch(setErrorMessage('エラーが発生しました'));
          break;
        }
      }
    })
    .catch(() => {
      dispatch(setErrorMessage('通信に失敗しました'));
    });
}
