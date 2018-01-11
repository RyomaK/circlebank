import React, { Component } from 'react'
import { Redirect, Route} from 'react-router-dom'
import { loginCheck } from '../actions/index'
import { connect } from 'react-redux'

class Auth extends Component{
  componentWillMount(){
    console.log("a")
    this.props.LoginCheck();
  }
  componentWillReceiveProps(){
    console.log("i")
    this.props.LoginCheck();
  }

  render(){

    const isLogin = this.props.isLogin
    if(isLogin=="true"){

      return(
        <div>
        <Route children={this.props.children} />
        </div>
      )
    }else{

      return(

        <Redirect to="/login" />
      )
    }
  }

}
const mapStateToProps = state => {
  return{
    isLogin: state.loginCheck.isLogin
  }
}
const mapDispatchToProps = dispatch => {
  return{
    LoginCheck: () => {
      dispatch(loginCheck())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)
