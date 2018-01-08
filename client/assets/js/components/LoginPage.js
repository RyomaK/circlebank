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

  }


  render(){
        return(
          <div className="login">
            <div className="top">
                <h3>ログインしてください</h3>
                <LoginForm />
                <div>
                  <div className="button1">
                    <a href="auth/login/google"><FlatButton label="Log In" fullWidth={true} backgroundColor="#8AA62F" hoverColor="#7CBD1E" style={style}/></a>
                  </div>
                  <Link to="/signup"><FlatButton label="Sign Up" fullWidth={true} backgroundColor="#1160AA"  hoverColor="#3F52E3" style={style}/></Link>
                </div>
            </div>
          </div>
        )
    }
  }
const mapStateToProps = state => {
  return{
    state
  }
}


export default connect(
  mapStateToProps

)(LoginPage)
