import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getlike,getUserEvent} from '../actions/index'
import Result from './Result'
import {Carousel,Col} from 'react-bootstrap'
import Menu from './Menu'
import {Row} from 'react-bootstrap'

class MainPage extends Component{
  componentDidMount(){
    this.props.getLike();
    this.props.getEvents();
  }
  render(){
    return(
        <div>
        <div>
          <Carousel>
            <Carousel.Item>
              <div className="picture">
              <img src="static/img/users/11.jpg" height='250'/>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="picture">
                <img src="static/img/users/12.JPG" height='250'/>
              </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="picture">
              <img src="static/img/users/13.jpg" height='250'/>
            </div>
            </Carousel.Item>
          </Carousel>
        </div>
          <Col sm={3} className="reset">
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
      getLike:() => {
        dispatch(getlike())
      },
      getEvents:()=>{
        dispatch(getUserEvent())
      }
    }
  }
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage)
