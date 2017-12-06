
import axios from'axios'

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
          break;

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
    .get(`http://localhost:8080/api/doshisha/tag/`)
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
