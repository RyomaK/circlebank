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
              <div className="picture">
              <img src="static/img/users/LINEスタンプ(公式)_180126_0008.jpg"/>
              </div>

            </Carousel.Item>
            <Carousel.Item>
              <div className="picture">
                <img src="static/img/users/LINEスタンプ(公式)_180126_0010.jpg"/>
              </div>

            </Carousel.Item>
            <Carousel.Item>
            <div className="picture">
              <img src="static/img/users/LINEスタンプ(公式)_180126_0012.jpg"/>
            </div>
            
            </Carousel.Item>
          </Carousel>
        </div>
        <Menu/>
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
