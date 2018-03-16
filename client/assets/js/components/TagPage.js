import React, { Component } from 'react'
import Menu from './Menu'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {setLoad} from '../actions/index'
import { Link, withRouter } from 'react-router-dom'
import { Col} from 'react-bootstrap'
import { connect } from 'react-redux'

class TagPage extends Component {
  componentDidMount(){
    this.props.setLoad()
  }
  handleClick(event,url){
    event.preventDefault()
    this.props.history.push(`/circle/search/${url}`)
  }

  render(){
    return(
      <div className="relative">
        <div>
          <div>
            <Col smOffset={2} sm={8}>
            <h2>検索結果</h2>
            {this.props.circle.map( circle => (
              <Col sm={6} className="marginbottom circleName cardReset" key={circle.id} onClick={(event)=>this.handleClick(event,circle.url_name)}>
                  <Card>
                  <CardMedia
                    overlay={<CardTitle title={circle.name}/>}
                  >
                    <img src={`static/${circle.image}`} alt="aa" height="250px;"/>
                  </CardMedia>
                </Card>
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
const mapDispatchToProps = dispatch => {
  return{
    setLoad:()=>{
      dispatch(setLoad())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagPage))
