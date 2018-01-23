import React, { Component } from 'react'
import UserBox from './UserBox'
import ImageUp from './ImageUp'
import Menu from './Menu'
import {Row} from "react-bootstrap"
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
        <Row>
          <Menu/>
          <UserBox data={this.props.user} />
        </Row>
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
