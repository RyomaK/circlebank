import React, { Component } from 'react'
import Home from './admin/Home'
import AdminCirclePage from './admin/AdminCirclePage'
import AddEvent from './admin/AddEvent'
import adminEventPage from './admin/adminEventPage'
import DeletePage from './admin/DeletePage'
import CirclePage from '../containers/CirclePage'
import CircleImage from './admin/CircleImage'
import { Redirect, Route} from 'react-router-dom'
import { loginCheck } from '../actions/index'
import { connect } from 'react-redux'

class Auth extends Component{
  componentWillMount(){
    this.props.LoginCheck();
  }

  componentWillUpdate(){
    this.props.LoginCheck();
  }


  render(){

    const isLogin = this.props.isLogin
    const admin = this.props.admin
    if((isLogin=="true")&&(admin==true)){

      return(
        <div className="contents">
          <Route exact path='/' component={Home}/>
          <Route exact path='/admin/add/circle' component={AdminCirclePage}/>
          <Route exact path='/admin/event/:name' component={adminEventPage}/>
          <Route exact path='/admin/circle/:name' component={CirclePage}/>
          <Route exact path='/admin/delete/:name' component={DeletePage}/>
          <Route exact path='/admin/add/event/:id' component={AddEvent}/>
          <Route exact path='/admin/image/:circle_url/:id' component={CircleImage}/>
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)
