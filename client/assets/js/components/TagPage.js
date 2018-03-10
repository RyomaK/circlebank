import React, { Component } from 'react'
import Menu from './Menu'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Link } from 'react-router-dom'
import { Col} from 'react-bootstrap'
import { connect } from 'react-redux'

class TagPage extends Component {

  render(){
    console.log(this.props.circle)
    return(
      <div>
        <div>
          <div>
            <Col smOffset={2} sm={8}>
            <h2>検索結果</h2>
          {this.props.circle.map( circle => (
            <Col sm={6} className="marginbottom circleName reset" key={circle.id}><Link to={`/circle/search/${circle.url_name}`} >
                <Card>
                <CardMedia
                  overlay={<CardTitle title={circle.name}/>}
                >
                  <img src={`static/${circle.image}`} alt="aa" height="250px;"/>
                </CardMedia>
              </Card>
              </Link>
              </Col>
          ))}
          </Col>
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
