import React, {Component} from "react"
import LoginForm from '../containers/LoginForm';
import {Grid,Col,Row} from "react-bootstrap"
import {Redirect} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'
import {loginCheck} from '../actions/index'




const style={
  color:"white"
}

class LoginPage extends Component{

  render(){
    const style = {
      width: '100%',
      padding: 30,
      marginTop:'15%',
      textAlign:'center',
      position: 'absolute',
      display: 'inline-block',
    };
    const isLogin = this.props.isLogin
      if(isLogin == "true"){
        return(
            <Redirect to="/"/>
)
      }else{
        return(
          <div className="log">

            <Row>
            <Col xs={11} smOffset={3} sm={6}>
            <Paper style = {style} zDepth={3}>
                <h4>Circle Bankにログイン</h4>
                <LoginForm />
            </Paper>
            </Col>
            </Row>


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
