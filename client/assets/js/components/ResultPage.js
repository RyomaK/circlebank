import React from 'react'
import {Col } from 'react-bootstrap'
import {Card} from 'material-ui/Card';
const ResultPage = ({circle}) => {
  return(
    <div>
    <Col md={5} className="circle">
      <Card>
        <div className="card">
        <div>{circle.name}</div>
        <div>{circle.number}</div>
        <div>{circle.introduction}</div>
        <div>{circle.campus}</div>
        </div>
      </Card>
    </Col>
    <Col md={1}></Col>
    </div>
  )
}
export default ResultPage
