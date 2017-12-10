import React from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col } from 'react-bootstrap'

const ResultPage = ({circle}) => {
  return(
    <div>
    <Col md={5} className="circle">
      <div>{circle.name}</div>
      <div>{circle.number}</div>
      <div>{circle.introduction}</div>
      <div>{circle.campus}</div>
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
