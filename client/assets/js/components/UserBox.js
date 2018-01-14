import React from 'react'
import {connect} from 'react-redux'

const UserBox = ({data}) => {
  return(
    <div>
      <ul>
        <li>名前:{data.name}</li>
        <li>入学年:{data.year}</li>
        <li>学部:{data.department}</li>
        <li>学科:{data.subject}</li>
        <li>メールアドレス:{data.mail}</li>
      </ul>
    </div>
  )
}

export default UserBox
