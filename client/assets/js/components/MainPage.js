import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getlike} from '../actions/index'
import Result from './Result'
import {Carousel,Col} from 'react-bootstrap'
import Menu from './Menu'
import {Row} from 'react-bootstrap'


class MainPage extends Component{
  componentDidMount(){
    this.props.getLike();
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
      }
    }
  }


export default connect(
  mapStateToProps,
  mapDispatchToProps

)(MainPage)
