import React from 'react'
import LikePage from './LikePage'
import {Col,Table} from "react-bootstrap"
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux'

const UserBox = ({data}) => {
  return(
    <div>

        <div className="centerPosition">
          <h3>マイページ</h3>
          </div>
              <Paper zDepth={1}>
            <Table className="fontChange">
              <tbody>
                <tr>
                  <td　width="50%">名前</td>
                  <td　width="50%">{data.name}</td>
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
                  <td>学科</td>
                  <td>{data.subject}</td>
                </tr>
              </tbody>
            </Table>
            </Paper>
        <LikePage/>
    </div>
  )
}

export default UserBox
