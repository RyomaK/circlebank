import React, {Component} from "react"
import LoginForm from '../containers/LoginForm';
import {Grid,Button} from "react-bootstrap"
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'
import {loginCheck} from '../actions/index'
import {Card} from 'material-ui/Card';




const style={
  color:"white"
}

class LoginPage extends Component{
  componentWillMount(){
    this.props.LoginCheck()

  }
  render(){
    console.log(this.props.isLogin)
        return(
          <div className="login">
            <div className="top">
                <h3>ログインしてください</h3>
                <LoginForm />
            </div>
          </div>
        )
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

)(LoginPage)
