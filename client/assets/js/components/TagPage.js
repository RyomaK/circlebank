import React, { Component } from 'react'
import Menu from './Menu'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Link } from 'react-router-dom'
import { Col,Row } from 'react-bootstrap'
import { connect } from 'react-redux'

class TagPage extends Component {
  render(){
    return(
      <div>
        <Col sm={3} xsHidden>
          <Menu/>
        </Col>
        <Col sm={9} className="paper">
          <div>
            <h2>検索結果</h2>
          {this.props.circle.map( circle => (
            <div key={circle.id}><Link to={`/circle/search/${circle.url_name}`} >
                <Card>
                <CardMedia>
                  <img src="static/img/users/default.png" alt="aa" height="200px;"/>
                </CardMedia>
                <CardTitle title={circle.name} />
                <CardText>
                  {circle.message_for_fresh}
                </CardText>
              </Card>
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
