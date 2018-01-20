import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getlike} from '../actions/index'
import Result from './Result'
import {Carousel} from 'react-bootstrap'
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
                <div className="picture1"></div>
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="picture2"></div>
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="picture3"></div>
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <Row>
          <Menu/>
          </Row>
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
