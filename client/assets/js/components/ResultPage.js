import React from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col } from 'react-bootstrap'
import {Card} from 'material-ui/Card';

const ResultPage = ({circle}) => {
  return(
    <div>
    <Col md={5} className="circle">
      <Card>
        <div>{circle.name}</div>
        <div>{circle.number}</div>
        <div>{circle.introduction}</div>
        <div>{circle.campus}</div>
      </Card>
    </Col>
    <Col md={1}></Col>
    </div>

  )
}

ResultPage.propTypes = {
  circle: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    number: PropTypes.string,
    introduction: PropTypes.string,
    campus: PropTypes.string
  })
}


export default ResultPage
