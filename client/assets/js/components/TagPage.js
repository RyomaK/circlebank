import React, { Component } from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'
import { Col,Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import {  tagSearch } from '../actions/index'

class TagPage extends Component {
  componentWillMount(){
    const id = this.props.match.params.id
    this.props.Search(id)
  }
  render(){
    return(
      <div>
        <Row>
          <Menu/>
        <Col sm={9}>
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

const mapDispatchToProps = dispatch => {
  return{
    Search: id =>{
      dispatch(tagSearch(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagPage)
