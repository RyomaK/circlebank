import axios from'axios'
import Cookies from 'universal-cookie';

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

export const selectUniversity = university => dispatch => dispatch({type: 'SELECT_UNIVER',university});

export const setImage = image => dispatch => dispatch({type: 'IMAGE_SET',image});

export const setSearchWord = word => dispatch => dispatch({type: 'SET_WORD',word});

export const setProIma = image => dispatch => dispatch({type: 'PRO_IMAGE',image});

export const image = () => dispatch => {
  axios
  .get('/static/img/users/2.png').then((results) => {
    const status = results.status
    const data = results.data
    return { status, data }
  }).then(({ status, data })=>{
    switch(status){
      case 200:
        dispatch(setImage(data))
      break;

      default:
      break;
    }
  }).catch(() => {
      console.log("エラー")
  });
}

export const signup = data => dispatch => {
  var params = new URLSearchParams();
  params.append('mail',data.email);
  params.append('name',data.name);
  params.append('password',data.password);
  params.append('university',data.university);
  params.append('sex',data.sex);
  params.append('department',data.department);
  params.append('subject',data.subject);
  params.append('year',data.year);

  axios
  .post('/signup',params).then((results) => {
    const status = results.status
    return { status }
  }).then(({status}) => {
    switch(status){
      case 201:

      dispatch({type:'LOGIN'})
        break;
      default:
        break;
    }
  })
  .catch(() => {
    console.log("エラー")
  });
}

export const login = data => dispatch => {

  var params = new URLSearchParams();
  params.append('mail',data.email);
  params.append('password',data.password);

  axios
  .post('/login',params)
  .then((results) => {
    const status = results.status
    return{ status }
  }).then(({status}) => {
      switch(status){
        case 200:
        dispatch({type:'LOGIN'})
          break;
        default:
          break;
      }
  }).catch(() => {
    console.log("エラーログイン")
  });
}





export const getUserInfo = () => dispatch => {
  const Auth = getAuth();
  axios
  .get('/api/user',{ headers:{'Authorization':`Bearer ${Auth}`}})
  .then((results) => {
    const status = results.status
    const mail = results.data.User.mail
    const name = results.data.User.name
    const department = results.data.User.department
    const subject = results.data.User.subject
    const year = results.data.User.year
    const image = results.data.User.image


    return { status, mail ,name,department,subject,year,image}})
  .then(({ status,mail,name,department,subject,year,image}) => {
    switch(status){
      case 200:
        dispatch({type:'SHOW_USER',mail,name,department,subject,year,image});
        break;
      case 401:
        dispatch(setLogin(-1));
        break;
      default:
        console.log("エラーgetuerinfo")
        break;
    }
  })
  .catch((e) => {
    console.log(e)
  });
}

export const logout = () => dispatch => {
  axios
  .post('/logout')
  .then((results)=>{
    const status = results.status

    return { status };
  }).then(({status}) => {
      switch (status){
        case 202:{
          dispatch({type:'LOGOUT'});
          break;
        }
        default: {
          break;
        }
      }
  }).catch(() => {
    console.log("エラーログアウト")
  });
}

export const loginCheck = () => dispatch => {

    const Auth = getAuth();
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
    .catch((e) => {
      console.log("loginCheckerror")
    });
}

export const circleSearch = name => dispatch => {
  const Auth = getAuth();
  axios
  .get(`/api/doshisha/circle/${name}`,{ headers:{'Authorization':`Bearer ${Auth}`}})
  .then((results) => {
    const status = results.status
    const circle = results.data
    return { status, circle };
    if (typeof circle === undefined) {
      return { status };
    }
  })
  .then(({status, circle})=> {
    switch (status) {
      case 200: {
        dispatch({type:'CIRCLE',circle})
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
    dispatch(setSearchWord('notFound'));
  });
}


export const circleSearchAll = ()=> dispatch => {
    const Auth = getAuth();
    axios
    .get('/api/doshisha/circle',{ headers:{'Authorization':`Bearer ${Auth}`}})
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
      console.log("circleStart");
    });
}

export const tagSearchStart = () => dispatch => {
  const Auth = getAuth();
    axios
    .get('/api/doshisha/tag',{ headers:{'Authorization':`Bearer ${Auth}`}})
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
      console.log("エラーtagSearchStart")
    });
}

export const tagSearch = id => dispatch => {
  const Auth = getAuth();
    axios
    .get(`/api/doshisha/tag/${id}`,{ headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {
      const status = results.status
      const data = results.data
      if (typeof tags === undefined) {
        return { status };
      }
      return { status, data };
    })
  .then(({status, data})=> {
      switch (status) {
        case 200: {
          dispatch({type:'TAG_SEARCH',data});
          break;
        }
        case 401: {
          dispatch(setLogin(-1));
          break;
        }
        default:
          dispatch(setErrorMessage('エラーが発生しました'));
          break;
        }
      }
    )
    .catch(() => {
      console.log("エラーtagSearchStart")
    });
}

export const like = circleId => dispatch => {
    const Auth = getAuth();
    var params = new URLSearchParams();
    params.append('circle_id',circleId);
    console.log(circleId)
    axios
    .post('/api/user/like',params,{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {
      console.log(results)
      const status = results.status
      return{status}
    }).then(({status})=>{
      switch(status){
        case 200:
          dispatch(getlike())
          break;
        default:
          break;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

export const getlike = () => dispatch => {
  const Auth = getAuth();
    axios
    .get('/api/user/like',{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {
      const status = results.status
      const circle = results.data.circle
      return { status, circle }
    }).then(({ status, circle }) => {
      switch (status) {
        case 200: {
          dispatch({type:'LIKE',circle});
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
    .catch((e) => {
      console.log(e);
    });
}

export const deletelike = circleId => dispatch => {
    const Auth = getAuth();
    const headers = {'Authorization':`Bearer ${Auth}`}
    const data = new FormData();
    data.append('circle_id',circleId);
    axios.delete('/api/user/like',{headers,data})
    .then((results) => {
      console.log(results)
      const status = results.status
      return({status})
    }).then(({status})=>{
      switch(status){
        case 200:
          dispatch(getlike())
          break;
        default:
          break;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}



export const ImageUpload = image => dispatch => {
    const Auth = getAuth();
    var params = new FormData();
    params.append('image',image);
    axios
    .post('/api/user/upload',params,{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {
      console.log(results)
      const status = results.status
    })
    .catch((e) => {
      console.log(e);
    });
}
