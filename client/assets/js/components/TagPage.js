import React, { Component } from 'react'
import Menu from './Menu'
import { Link } from 'react-router-dom'
import { Col,Row } from 'react-bootstrap'
import { connect } from 'react-redux'

class TagPage extends Component {
  render(){
    return(
      <div>
          <Menu/>
        <Col sm={8} className="paper">
          <div className="SearchResult">
            <h2>検索結果</h2>
          {this.props.circle.map( circle => (
            <div key={circle.id}><Link to={`/circle/search/${circle.url_name}`} >
              <h3>{circle.name}</h3>
            </Link>
            </div>
          ))}
          </div>
        </Col>
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
