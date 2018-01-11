import React, { Component } from 'react'
import UserBox from './UserBox'
import { getUserInfo } from '../actions/index'
import { connect } from 'react-redux'

class UserPage extends Component{
  componentDidMount(){
    this.props.getUser();
  }
  render(){
    return(
      <div>
        <UserBox data={this.props.user}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
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
