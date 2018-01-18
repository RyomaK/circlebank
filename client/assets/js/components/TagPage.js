import React, { Component } from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'
import { Col,Row } from 'react-bootstrap'
import { connect } from 'react-redux'

class TagPage extends Component {
  render(){
    return(
      <div>
        <Row>
          <Menu/>
        <Col sm={9} className="paper">
        {this.props.circle.map( circle => (
          <div key={circle.id}><Link to={`/circle/${circle.url_name}`} >

              {circle.name}
          </Link>
          </div>
        ))}
        </Col>
        </Row>
      </div>
    )
}
}

const mapStateToProps = state => {

  return{
    circle: state.circleTag.circle
  }
}

export default connect(
  mapStateToProps
)(TagPage)
