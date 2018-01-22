import React, { Component } from 'react'
import Home from './admin/Home'
import CirclePage from './admin/CirclePage'
import AddEvent from './admin/AddEvent'
import { Redirect, Route} from 'react-router-dom'
import { loginCheck,adminCheck} from '../actions/index'
import { connect } from 'react-redux'

class Auth extends Component{
  componentWillMount(){
    this.props.LoginCheck();
    this.props.AdminCheck();
  }

  componentWillUpdate(){
    this.props.LoginCheck();
    this.props.AdminCheck();
  }


  render(){

    const isLogin = this.props.isLogin
    const admin = this.props.admin
    if((isLogin=="true")&&(admin==true)){

      return(
        <div>
          <Route exact path='/' component={Home}/>
          <Route exact path='/admin/circle' component={CirclePage}/>
          <Route exact path='/admin/add/:id/event' component={AddEvent}/>
        </div>

      )
    }else if((isLogin=="true")&&(admin==false)){
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
    isLogin: state.loginCheck.isLogin,
    admin: state.adminCheck.admin
  }
}
const mapDispatchToProps = dispatch => {
  return{
    LoginCheck: () => {
      dispatch(loginCheck())
    },
    AdminCheck: () => {
      dispatch(adminCheck())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)
