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
        <Col sm={3} xsHidden className="reset">
          <Menu/>
        </Col>
        <div className="paper">
          <div>
            <Col sm={9}>
            <h2>検索結果</h2>
            </Col>
          {this.props.circle.map( circle => (
            <Col sm={4} className="marginbottom" key={circle.id}><Link to={`/circle/search/${circle.url_name}`} >
                <Card className="sizebox">
                <CardMedia>
                  <img src={`static/${circle.image}`} alt="aa" height="200px;"/>
                </CardMedia>
                <CardTitle title={circle.name} />
                <CardText>
                  サークルの種類:{circle.introduction}
                </CardText>
              </Card>
              </Link>
              </Col>
          ))}
          </div>
        </div>
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
