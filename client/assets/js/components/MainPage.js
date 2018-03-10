import React,{Component} from 'react'
import {connect} from 'react-redux'
import Result from './Result'
import Schedule from './Schedule'
import {Carousel,Col} from 'react-bootstrap'
import {getEvent} from '../actions/index'
import Menu from './Menu'
import {Row} from 'react-bootstrap'

class MainPage extends Component{
  componentDidMount(){
    this.props.getEvent()
  }
  render(){
    return(
        <div>
          <img src="static/img/topImage.jpg" className="topImage"/>

          <Col sm={12} className="reset">
            <Menu/>
          </Col>
        </div>
      )
  }
}
const mapStateToProps = state => {
  return{
    state
  }
}
const mapDispatchToProps = dispatch => {
  return{
    getEvent:()=> {
      dispatch(getEvent())
    }
    }

}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage)
