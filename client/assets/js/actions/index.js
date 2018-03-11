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
export const deletesns = (data,id) => dispatch => {
  const Auth = getAuth();
  axios
  .delete(`admin/circle/10/sns`,{headers:{'Authorization':`Bearer ${Auth}`},data}).then((results) => {
    const status = results.status
    return { status }
  }).then(({ status })=>{
    switch(status){
      case 200:

      break;

      default:
      break;
    }
  }).catch(() => {
      console.log("エラー")
  });
}
export const sns = (data,id) => dispatch => {
  const Auth = getAuth();
  axios
  .post(`admin/circle/${id}/sns`,data,{headers:{'Authorization':`Bearer ${Auth}`}}).then((results) => {
    const status = results.status
    return { status }
  }).then(({ status })=>{
    switch(status){
      case 200:

      break;

      default:
      break;
    }
  }).catch(() => {
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


    export const getEventInfo = date => dispatch => {
      const Auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRob3JpdHkiOiIiLCJNYWlsIjoiYWRtaW5AdXNlcjEyMzQifQ.W8Don6BgvT0KOTUcx8hFamyEcQzIeBB0i1PZgdp_b5g"
      axios
      .get(`/admin/circle/event?date=${date}`,{headers:{'Authorization':`Bearer ${Auth}`}})
      .then((results) => {
        const status = results.status
        const events = results.data
        return { status, events };
        if (typeof events === undefined) {
          return { status };
        }
      })
      .then(({status, events})=> {
        switch (status) {
          case 200: {
            dispatch({type:'EVENT_INFO',events})
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
      });
    }

export const circleSearch = name => dispatch => {
  axios
  .get(`/api/circle/${name}`)
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
  axios
  .get('/api/circle')
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
    axios
    .get('/api/circle')
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
    axios
    .get('/api/tag')
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
    axios
    .get(`/api/tag/${id}`)
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

export const getEvent = () => dispatch => {
  const Auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRob3JpdHkiOiIiLCJNYWlsIjoiYWRtaW5AdXNlcjEyMzQifQ.W8Don6BgvT0KOTUcx8hFamyEcQzIeBB0i1PZgdp_b5g"
  axios
  .get('/admin/circle/event',{headers:{'Authorization':`Bearer ${Auth}`}})
  .then((results) => {
    const status = results.status
    const events = results.data
    return {status,events}
  }).then(({ status, events }) => {
    switch (status) {
      case 200: {
        dispatch({type:'EVENT',events});
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
export const adminSetName = name => dispatch => dispatch({type: 'ADMIN_SET_NAME',name});
export const adminSetUrl = url => dispatch => dispatch({type: 'ADMIN_SET_URL',url});
export const adminSetNumber = number => dispatch => dispatch({type: 'ADMIN_SET_NUMBER',number});
export const adminSetIntro = intro => dispatch => dispatch({type: 'ADMIN_SET_INTRO',intro});
export const adminSetDeleName = name => dispatch => dispatch({type: 'ADMIN_SET_DELENAME',name});
export const adminSetContact = contact => dispatch => dispatch({type: 'ADMIN_SET_CONTACT',contact});
export const adminSetCampus = campus => dispatch => dispatch({type: 'ADMIN_SET_CAMPUS',campus});
export const adminSetEntrance = entrance => dispatch => dispatch({type: 'ADMIN_SET_ENTRANCE',entrance});
export const adminSetAnnual = annual => dispatch => dispatch({type: 'ADMIN_SET_ANNUAL',annual});
export const adminSetWeek = week => dispatch => dispatch({type: 'ADMIN_SET_WEEK',week});
export const adminSetTime = time => dispatch => dispatch({type: 'ADMIN_SET_TIME',time});
export const adminSetAdmission = admission => dispatch => dispatch({type: 'ADMIN_SET_ADMISSION',admission});
export const adminSetBox = box => dispatch => dispatch({type: 'ADMIN_SET_BOX',box});
export const adminSetBooth = booth => dispatch => dispatch({type: 'ADMIN_SET_BOOTH',booth});

export const adminSetTags = tag => dispatch => dispatch({type: 'ADMIN_CIRCLE_TAG',tag})

export const EventName = name => dispatch => dispatch({type: 'EVENT_NAME',name});
export const EventAgenda = agenda => dispatch => dispatch({type: 'EVENT_AGENDA',agenda});
export const EventPlace = place => dispatch => dispatch({type: 'EVENT_PLACE',place});
export const EventDetail = detail => dispatch => dispatch({type: 'EVENT_DETAIL',detail});
export const EventFee = fee => dispatch => dispatch({type: 'EVENT_FEE',fee});
export const EventCapacity = capacity => dispatch => dispatch({type: 'EVENT_CAPACITY',capacity});


export const adminCheck = () => dispatch => {
    const Auth = getAuth();
    axios
    .get('/admin/circle',{headers:{'Authorization':`Bearer ${Auth}`}})
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
    .get('/admin/circle',{headers:{'Authorization':`Bearer ${Auth}`}})
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
export const deleteCircleTag = (circle_id,data) => dispatch => {
  const Auth = getAuth();
    axios
    .delete(`admin/circle/${circle_id}/tag`,{headers:{'Authorization':`Bearer ${Auth}`},data})
    .then((results) => {

      const status = results.status
      return { status}
    }).then(({ status}) => {
      switch (status) {
        case 200: {
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
export const deleteTag = (circle_id,tag_id) => dispatch => {
  const Auth = getAuth();
    axios
    .delete(`/admin/circle/tag/${circle_id}/${tag_id}`,{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {

      const status = results.status
      return { status}
    }).then(({ status}) => {
      switch (status) {
        case 200: {
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
    .post('/admin/circle',{
      'name':circle.name,
      'url_name':circle.url_name,
      'number':circle.number,
      'image':circle.gender_ratio,
      'bill_image':circle.delegete_name,
      'introduction':circle.introduction,
      'delegate_name':circle.message_for_fresh,
      'delegete_contact':circle.delegete_contact,
      'campus':circle.campus,
      'entrance_fee':circle.excite,
      'annual_fee':circle.fee,
      'activity_week':circle.fee,
      'activity_time':circle.fee,
      'admission_deadline':circle.fee,
      "box_number": 1,
      "booth_number": 1
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
    .get(`/api/circle/${name}`,{headers:{'Authorization':`Bearer ${Auth}`}})
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
    .post(`/admin/circle/${id}/event`,params

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
    .delete(`/admin/circle/${circle_id}/event/${event_id}`

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
    .delete(`/admin/circle/${id}`,{headers:{'Authorization':`Bearer ${Auth}`}})
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

export const adminAddTag = (tag) => dispatch => {
  const Auth = getAuth();
  console.log(tag)
  axios
    .post(`/admin/tag`,tag,{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results => {
      console.log(results)
      const status = results.status
    }))
    .catch((e) => {
      console.log(e);
    });
}


export const adminAddCircleTag = (tag,circleId) => dispatch => {
  const Auth = getAuth();
  const tags = tag.tags
  axios
    .post(`/admin/circle/${circleId}/tag`,tags,{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results => {

      const status = results.status
    }))
    .catch((e) => {
      console.log(e);
    });
}

export const circleImage = (image,id) => dispatch => {
    const Auth = getAuth();
    var params = new FormData();
    params.append('image',image);
    axios
    .post(`/admin/circle/${id}/upload`,params,{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {

      const status = results.status
    })
    .catch((e) => {
      console.log(e);
    });
}
export const billImage = (image,id) => dispatch => {
    const Auth = getAuth();
    var params = new FormData();
    params.append('image',image);
    axios
    .post(`/admin/circle/${id}/bill/upload`,params,{headers:{'Authorization':`Bearer ${Auth}`}})
    .then((results) => {

      const status = results.status
    })
    .catch((e) => {
      console.log(e);
    });
}
