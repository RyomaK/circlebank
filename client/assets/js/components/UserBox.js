import React from 'react'
import {Col} from "react-bootstrap"
import {connect} from 'react-redux'

const UserBox = ({data}) => {
  return(
    <div>
      <Col sm={9} className="paper">
        <ul>
          <li>名前:{data.name}</li>
          <li>入学年:{data.year}</li>
          <li>学部:{data.department}</li>
          <li>学科:{data.subject}</li>
          <li>メールアドレス:{data.mail}</li>
        </ul>
      </Col>

    </div>
  )
}

export default UserBox
