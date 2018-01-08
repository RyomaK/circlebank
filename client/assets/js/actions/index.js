import axios from'axios'
import Cookies from 'universal-cookie';


const domain = 'http://localhost:8080'

export const setErrorMessage = message => dispatch => dispatch({type: 'ZERO_RESULTS',message});

export const setUniversity = university => dispatch => dispatch({type: 'SET_UNIVERSITY',university});

export const setName = name => dispatch => dispatch({type: 'SET_NAME',name});

export const setSex= sex => dispatch => dispatch({type: 'SET_SEX',sex});

export const setDepartment = department => dispatch => dispatch({type: 'SET_DEPARTMENT',department});

export const setSubject = subject => dispatch => dispatch({type: 'SET_SUBJECT',subject});

export const setEmail = email => dispatch => dispatch({type: 'SET_EMAIL',email});

export const setPassword = password => dispatch => dispatch({type: 'SET_PASSWORD',password});


export const circleSearchStart = URL => dispatch => {
    axios
    .get(URL)
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
    .get(`${domain}/api/doshisha/tag/`)
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
