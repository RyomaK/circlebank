import React,{Component} from 'react'
import {connect} from 'react-redux'
import Result from './Result'
import Schedule from './Schedule'
import {Col} from 'react-bootstrap'
import Menu from './Menu'
import {Row} from 'react-bootstrap'

class MainPage extends Component{
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

    }

}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage)
