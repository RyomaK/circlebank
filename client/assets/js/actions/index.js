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

export const setYear = year => dispatch => dispatch({type: 'SET_YEAR',year});

export const setLogin = number => dispatch => dispatch({type: 'LOGIN_CHECK',number});

export const signup = data => dispatch => {
  console.log(data)
  axios
  .post('/signup',{
    university: data.university,
    name: data.name,
    year: data.year,
    mail: data.email,
    sex: data.sex,
    department: data.department,
    subject: data.subject,
    password: data.password
  }).then((response) => {
    const code = response.code
    const message = response.message
    console.log(response)
  }).catch(() => {
    console.log("エラー")
  });
}

export const login = data => dispatch => {
  console.log(data)
  axios
  .post('/login',{
    mail: data.email,
    password: data.password
  }).then((response) => {
    const code = response.code
    const message = response.message
    console.log(response)
  }).catch(() => {
    console.log("エラー")
  });
}

export const getUserInfo = () => dispatch => {
  axios
  .get('/api/user',{ Headers:{'Authorization':`Bearer ${Auth}`}})
  .then((response) => {
    const status = response.status
    const user = rensponse.data
    console.log(response)
    if(typeof user === undefined){
      return { status };
    }
    return { status, user };
  })
  .then(({ status,user }) => {
    switch(status){
      case 200:
        dispatch({type:'SHOW_USER',user});
        break;
      case 401:
        dispatch(setLogin(-1));
        break;
      default:
        console.log("エラー")
        break;
    }
  })
  .catch(() => {
    dispatch(setErrorMessage('通信に失敗しました'));
  });
}

export const loginCheck = () => dispatch => {
    axios
    .get('/api/doshisha/tag',{ Headers:{'Authorization':`Bearer ${Auth}`}})
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
    .get(URL,{ Headers:{'Authorization':`Bearer ${Auth}`}})
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

export const tagSearchStart = () => dispatch => {
    axios
    .get('/api/doshisha/tag/',{ Headers:{'Authorization':`Bearer ${Auth}`}})
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
