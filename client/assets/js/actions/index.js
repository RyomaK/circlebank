
import axios from'axios'

const domain = 'http://localhost:8080'

export const setErrorMessage = message => dispatch => dispatch({type: 'ZERO_RESULTS',message});

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
        }
        case 'ZERO_RESULTS': {
          dispatch(setErrorMessage('結果が見つかりませんでした'));
        }

        default: {
          dispatch(setErrorMessage('エラーが発生しました'));
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
        }
        case 'ZERO_RESULTS': {
          dispatch(setErrorMessage('結果が見つかりませんでした'));
        }
        default: {
          dispatch(setErrorMessage('エラーが発生しました'));
        }
      }
    })
    .catch(() => {
      dispatch(setErrorMessage('通信に失敗しました'));
    });
}

export const login = () => dispatch => {
  axios
  .get(`${domain}/auth/login/google`)
  .then((response) =>{
    console.log("i")


    return {response}
  })
  .catch(() => {
    dispatch(setErrorMessage('通信に失敗しました'));
  });
}
