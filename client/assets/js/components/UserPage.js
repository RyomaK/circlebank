import React, { Component } from 'react'
import UserBox from './UserBox'
import { getUserInfo } from '../actions/index'
import { connect } from 'react-redux'

class UserPage extends Component{
  componentWillMount(){
    this.props.getUser();
  }

  render(){

    return(
      <div>
        <UserBox/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return{
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return{
    getUser: () => {
      dispatch(getUserInfo())
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage)
