import React, { Component } from 'react'
import UserBox from './UserBox'
import ImageUp from './ImageUp'
import Menu from './Menu'
import {Col} from "react-bootstrap"
import { getUserInfo, image } from '../actions/index'
import { connect } from 'react-redux'
class UserPage extends Component{

componentWillMount(){
  this.props.getUser();
  this.props.getImage();
}


render(){
    return(
      <div>
          <Col sm={3} xsHidden className="reset">
          <Menu/>
          </Col>
          <Col xs ={12} sm={9} className="paper">
          <UserBox data={this.props.user} />
          </Col>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.user,
    image: state.image.image
  }
}

const mapDispatchToProps = dispatch => {
  return{
    getUser: () => {
      dispatch(getUserInfo())
    },
    getImage: () => {
      dispatch(image())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage)
