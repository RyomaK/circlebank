import React,{Component} from 'react'
import { connect } from 'react-redux'
import {loginCheck} from '../actions/index'
import { Redirect,Route} from 'react-router-dom';

class Auth extends Component {
  componentWillMount(){
    this.props.LoginCheck()
  }


  render(){
    if(this.props.isLogin){
      return(
        <Route children={this.props.children} />
      )
    }else{
      return(
         <Redirect to="/login"/>
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

)(Auth)
