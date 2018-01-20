import React from 'react'
import LikePage from './LikePage'
import {Col,Table} from "react-bootstrap"
import {connect} from 'react-redux'

const UserBox = ({data}) => {
  return(
    <div>
      <Col sm={9} className="paper">
        <div className="mypage">
          <h1>マイページ</h1>
        <Table responsive>
          <tbody>
            <tr>
              <td>名前</td>
              <td>{data.name}</td>
            </tr>
            <tr>
              <td>入学年度</td>
              <td>{data.year}</td>
            </tr>
            <tr>
              <td>学部</td>
              <td>{data.department}</td>
            </tr>
            <tr>
              <td>学部</td>
              <td>{data.department}</td>
            </tr>
            <tr>
              <td>学科</td>
              <td>{data.subject}</td>
            </tr>
          </tbody>
        </Table>
        <LikePage/>
        </div>
      </Col>

    </div>
  )
}

export default UserBox
