import React ,{ Component }from 'react'

const UserBox = ({data}) => {
  console.log(data)
  return(
    <div>
      <ul>
        <li>名前:{data.name}</li>
        <li>学部:{data.department}</li>
        <li>学科:{data.subject}</li>
      </ul>
    </div>
  )
}

export default UserBox
