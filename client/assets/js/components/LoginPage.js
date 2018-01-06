import React, {Component} from "react"
import {Grid,Button} from "react-bootstrap"
import { Link,Redirect} from 'react-router-dom'
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
    if(this.props.isLogin){
      return(
        <Redirect to="/"/>
      )
      }else{
        return(
          <div className="login">
            <div className="top">
                <h3>ログインしてください</h3>

                <div className="button">
                  <div className="button1">
                    <a href="auth/login/google"><FlatButton label="Log In" fullWidth={true} backgroundColor="#8AA62F" hoverColor="#7CBD1E" style={style}/></a>
                  </div>
                  <FlatButton label="Sign Up" fullWidth={true} backgroundColor="#1160AA"  hoverColor="#3F52E3" style={style}/>
                </div>
            </div>
          </div>
        )
    }
  }
}

const mapStateToProps = state => {
  return{
    isLogin: state.login.isLogin
  }
}
const mapDispatchToProps= dispatch => {
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
