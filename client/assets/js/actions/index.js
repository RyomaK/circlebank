import axios from'axios'
import Cookies from 'universal-cookie';


const domain = 'http://localhost:8080'

const getAuth = () => {
  let box1=""
  const box = document.cookie.split('Authorization=');
    if(box[1]){
       box1 = box[1].split(';')[0];
    }
  return (box1)

}

export const setErrorMessage = message => dispatch => dispatch({type: 'ZERO_RESULTS',message});

export const setUniversity = university => dispatch => dispatch({type: 'SET_UNIVERSITY',university});

export const setName = name => dispatch => dispatch({type: 'SET_NAME',name});

export const setSex= sex => dispatch => dispatch({type: 'SET_SEX',sex});

export const setDepartment = department => dispatch => dispatch({type: 'SET_DEPARTMENT',department});

export const setSubject = subject => dispatch => dispatch({type: 'SET_SUBJECT',subject});

export const setEmail = email => dispatch => dispatch({type: 'SET_EMAIL',email});

export const setPassword = password => dispatch => dispatch({type: 'SET_PASSWORD',password});

export const settYear = year => dispatch => dispatch({type: 'SET_YEAR',year});

export const setLogin = number => dispatch => dispatch({type: 'LOGIN_CHECK',number});



export const signup = data => dispatch => {
  var params = new URLSearchParams();
  params.append('mail',data.email);
  params.append('name',data.name);
  params.append('passwrod',data.password);
  params.append('university',data.university);
  params.append('sex',data.sex);
  params.append('department',data.department);
  params.append('subject',data.subject);
  params.append('year',data.year);

  axios
  .post('/signup',params).then((results) => {
    const code = results.code
    const message = redults.message
  }).catch(() => {
    console.log("エラー")
  });
}

export const login = data => dispatch => {
  axios
  .post('/login',{
    mail: data.email,
    password: data.password
  }).then((results) => {
    const code = results.code
    const message = results.message
  }).catch(() => {
    console.log("エラー")
  });
}

export const getUserInfo = () => dispatch => {
const Auth = getAuth();
  axios
  .get('/api/user',{ headers:{'Authorization':`Bearer ${Auth}`}})
  .then((results) => {
    const status = results.status
    const user = results.data
    console.log(results)
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


export const logout = () => dispatch => {
  axios
  .post('/logout')
  .then((results)=>{
    console.log(results)
  }).catch(() => {
    console.log("エラー")
  });
}

export const loginCheck = () => dispatch => {
    const Auth = getAuth();
    console.log(Auth)
    axios
    .get('/api/doshisha/circle',{headers: { "Authorization": `Bearer ${Auth}`}})
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
    const Auth = getAuth();
    axios
    .get(URL,{ headers:{'Authorization':`Bearer ${Auth}`}})
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
  const Auth = getAuth();
    axios
    .get('/api/doshisha/tag/',{ headers:{'Authorization':`Bearer ${Auth}`}})
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
