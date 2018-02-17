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

export const setfilter = item => dispatch => dispatch({type: 'SET_ITEM',item});

export const tagReset = () => dispatch => dispatch({type: 'TAG_RESET'});

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
    let status = 0;
    const Auth = getAuth();
      if(Auth){
        status = 200
      }else{
        status = 401
      }
      switch (status) {
        case 200:

          dispatch(setLogin(1));
          break;

        case 401:
          dispatch(setLogin(-1));
          break;

        default:
          dispatch(setErrorMessage('エラーが発生しました'));
          break;
        }
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

export const circleSearchAll1 = () => dispatch=> {
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
  .then(({status,circles})=>{
    switch (status) {
      case 200: {
        dispatch({type:'SEARCLE_FILTER',circles});
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
    console.log("error");
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

export const getComment = (name) => dispatch =>{
  const Auth = getAuth();
  axios
  .get(`/api/user/${name}/comment`,{headers:{'Authorization':`Bearer ${Auth}`}})
  .then((results) => {
    console.log(results)
    const status = results.status
    const comment = results.data.comment.university
    return{status,comment}
  }).then(({status,comment})=>{
    switch(status){
      case 200:
        dispatch({type:'GET_COMMENT',comment})
        break;
      default:
        break;
    }
  })
  .catch((e) => {
    console.log(e);
  });
}
export const comment = (circleName, circle_Id, text)=> dispatch => {
  const Auth = getAuth();
  var params = new URLSearchParams();
  const id = circle_Id
  params.append('circle_id',id);
  params.append('point',1);
  params.append('text',text);
  axios
  .post(`/api/user/${circleName}/comment`,params,{headers:{'Authorization':`Bearer ${Auth}`}})
  .then((results) => {
    const status = results.status
    return{status}
  }).then(({status})=>{
    switch(status){
      case 200:
        dispatch(getlike(id))
        break;
      default:
        break;
    }
  })
  .catch((e) => {
    console.log(e);
  });
}

export const deleteComment = (circleName,circleId)=> dispatch => {
  const Auth = getAuth();
  const id = circleId
  const headers = {'Authorization':`Bearer ${Auth}`}
  const data = new FormData();
  data.append('circle_id',circleId);
  axios
  .delete(`/api/user/${circleName}/comment`,{headers,data})
  .then((results) => {

    const status = results.status
    return{status}
  }).then(({status})=>{
    switch(status){
      case 200:
        dispatch(getlike(id))
        break;
      default:
        break;
    }
  })
  .catch((e) => {
    console.log(e);
  });
}

export const like = circleId => dispatch => {
    const Auth = getAuth();
    var params = new URLSearchParams();
    params.append('circle_id',circleId);
    axios
    .post('/api/user/like',params,{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {

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
      let circle = results.data

      if(!circle){
        circle = []
      }
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

      const status = results.status
    })
    .catch((e) => {
      console.log(e);
    });
}


export const adminSetName = name => dispatch => dispatch({type: 'ADMIN_SET_NAME',name});
export const adminSetUrl = url => dispatch => dispatch({type: 'ADMIN_SET_URL',url});
export const adminSetNumber = number => dispatch => dispatch({type: 'ADMIN_SET_NUMBER',number});
export const adminSetRaitio = raitio => dispatch => dispatch({type: 'ADMIN_SET_RAITIO',raitio});
export const adminSetImage = image => dispatch => dispatch({type: 'ADMIN_SET_IMAGE',image});
export const adminSetIntro = intro => dispatch => dispatch({type: 'ADMIN_SET_INTRO',intro});
export const adminSetMessage = message => dispatch => dispatch({type: 'ADMIN_SET_MESSAGE',message});
export const adminSetDeleName = name => dispatch => dispatch({type: 'ADMIN_SET_DELENAME',name});
export const adminSetContact = contact => dispatch => dispatch({type: 'ADMIN_SET_CONTACT',contact});
export const adminSetCampus = campus => dispatch => dispatch({type: 'ADMIN_SET_CAMPUS',campus});
export const adminSetExcite = excite => dispatch => dispatch({type: 'ADMIN_SET_EXCITE',excite});
export const adminSetFee = fee => dispatch => dispatch({type: 'ADMIN_SET_FEE',fee});

export const EventName = name => dispatch => dispatch({type: 'EVENT_NAME',name});
export const EventAgenda = agenda => dispatch => dispatch({type: 'EVENT_AGENDA',agenda});
export const EventPlace = place => dispatch => dispatch({type: 'EVENT_PLACE',place});
export const EventDetail = detail => dispatch => dispatch({type: 'EVENT_DETAIL',detail});
export const EventFee = fee => dispatch => dispatch({type: 'EVENT_FEE',fee});
export const EventCapacity = capacity => dispatch => dispatch({type: 'EVENT_CAPACITY',capacity});


export const adminCheck = (id) => dispatch => {
  let Auth =''
  if(id=='admin@user1234'){
  Auth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRob3JpdHkiOiJhZG1pbnVzZXIiLCJNYWlsIjoiYWRtaW5AdXNlcjEyMzQifQ.b5rkA7_fzseEf-3wdxKpNVWn3qfj81w67rf9lpTWp5g'
  }
    axios
    .get('/admin/doshisha/circle',{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {
      const status = results.status
      return { status }
    }).then(({ status }) => {
      switch (status) {
        case 200: {
          dispatch({type:'ADMIN_CHECK'});
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


export const adminGetCircle = () => dispatch => {
  const Auth = getAuth();
    axios
    .get('/admin/doshisha/circle',{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {

      const status = results.status
      const circle = results.data
      return { status, circle }
    }).then(({ status, circle }) => {
      switch (status) {
        case 200: {
          dispatch({type:'ADMIN_CIRCLE',circle});
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


export const adminSetCircle = circle => dispatch => {
    const Auth = getAuth();
    axios
    .post('/admin/doshisha/circle',{
      'name':circle.name,
      'url_name':circle.url_name,
      'number':circle.number,
      'gender_ratio':circle.gender_ratio,
      'delegete_name':circle.delegete_name,
      'introduction':circle.introduction,
      'message_for_fresh':circle.message_for_fresh,
      'delegete_contact':circle.delegete_contact,
      'campus':circle.campus,
      'excite':circle.excite,
      'fee':circle.fee,
},{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {

      const status = results.status
      return{status}
    }).then(({status})=>{
      switch(status){
        case 200:
          dispatch(adminGetCircle())
          break;
        default:
          break;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

export const adminGetEvent = (name) => dispatch => {
  const Auth = getAuth();
    axios
    .get(`/api/doshisha/circle/${name}`,{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {

      const status = results.status
      const circle = results.data
      return { status, circle }
    }).then(({ status, circle }) => {
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
    .catch((e) => {
      console.log(e);
    });
}



export const adminSetEvent = (id,events) => dispatch =>{
    const Auth = getAuth();
    var params = [events]
    axios
    .post(`/admin/doshisha/circle/${id}/event`,params

,{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {

      const status = results.status
      return{status}
    }).then(({status})=>{
      switch(status){
        case 200:
          dispatch(adminGetCircle())
          break;
        default:
          break;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

export const adminDeleteEvent = (circle_id,event_id,name) => dispatch =>{
    const Auth = getAuth();
    const Url = name
    axios
    .delete(`/admin/doshisha/circle/${circle_id}/event/${event_id}`

,{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {

      const status = results.status
      return{status}
    }).then(({status})=>{
      switch(status){
        case 200:
          dispatch(adminGetCircle(Url))
          break;
        default:
          break;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}


export const adminDeleteCircle = (id) => dispatch =>{
    const Auth = getAuth();
    axios
    .delete(`/admin/doshisha/circle/${id}`,{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {

      const status = results.status
      return{status}
    }).then(({status})=>{
      switch(status){
        case 200:
          break;
        default:
          break;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}


export const circleImage = (image,id) => dispatch => {
    const Auth = getAuth();
    var params = new FormData();
    params.append('image',image);
    axios
    .post(`/admin/doshisha/circle/${id}/upload`,params,{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {

      const status = results.status
    })
    .catch((e) => {
      console.log(e);
    });
}
