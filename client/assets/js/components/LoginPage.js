import React, {Component} from "react"
import LoginForm from '../containers/LoginForm';
import {Col} from "react-bootstrap"
import {Redirect} from 'react-router-dom'
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'
const style={
  color:"white"
}
class LoginPage extends Component{
  render(){
    const style = {
      width: '100%',
      padding: 30,
      marginTop:'130px',
      textAlign:'center',
      position: 'absolute',
      display: 'inline-block',
    };
    const isLogin = this.props.isLogin
      if(isLogin == "true"){
        return(
            <Redirect to="/admin"/>
          )
      }else{
        return(
          <div className="log">
            <Col xs={11} smOffset={3} sm={6}>
                <Paper style = {style} zDepth={3}>
                <h4>Circle Bankにログイン</h4>
                <LoginForm />
              </Paper>
            </Col>
          </div>
        )
      }
    }
  }
const mapStateToProps = state => {
  return{
    isLogin: state.loginCheck.isLogin
  }
}
export default connect(
  mapStateToProps
)(LoginPage)
