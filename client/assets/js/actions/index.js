export const search = value => {
  return{
    type: 'SEARCH',
    value
  }
}

export const getCircle = () => {
  return{
    type:'GetCircle'
  }
}
