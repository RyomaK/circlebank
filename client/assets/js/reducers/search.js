import axios from 'axios'



const search = (state="なし", action) => {
  const URL = `http://localhost:8080/api/doshisha/tag/${action.value}`
  switch (action.type){
    case 'SEARCH':
      axios
      .get(URL)
      .then((results) => {
        id: results.id;
        name: results.name;
        number: results.number;
        introduction: results.introduction;
        campup: results.campus;
        return {
          id, name, number, introduction,campus
        }
      })
      .catch((error) => {
        console.log("エラー")
        return{state}
      })
      return {state}

    default:
      return {state}
  }
}

export default search
