import React, { Component } from 'react'
import Home from './admin/Home'
import AdminCirclePage from './admin/AdminCirclePage'
import AddEvent from './admin/AddEvent'
import adminEventPage from './admin/adminEventPage'
import DeletePage from './admin/DeletePage'
import CirclePage from '../containers/CirclePage'
import CircleImage from './admin/CircleImage'
import AddTagPage from './admin/AddTagPage'
import AddSNS from './admin/AddSNS'


import { Redirect, Route} from 'react-router-dom'
import { loginCheck } from '../actions/index'
import { connect } from 'react-redux'

class Auth extends Component{

  render(){
    const isLogin = this.props.isLogin
    if(isLogin==true){

      return(
        <div className="contents">
          <Route exact path='/admin' component={Home}/>
          <Route exact path='/admin/add/circle' component={AdminCirclePage}/>
          <Route exact path='/admin/event/:name' component={adminEventPage}/>
          <Route exact path='/admin/circle/:name' component={CirclePage}/>
          <Route exact path='/admin/delete/:name' component={DeletePage}/>
          <Route exact path='/admin/add/event/:name/:id' component={AddEvent}/>
          <Route exact path='/admin/image/:circle_url/:id' component={CircleImage}/>
          <Route exact path='/admin/newtag' component={AddTagPage}/>
          <Route exact path='/admin/sns/:name/:id' component={AddSNS}/>
          <Route exact path='/admin/circle/search/:name' component={CirclePage}/>
        </div>
      )
    }else{
      return(
        <div>
          <Route children={this.props.children} />
        </div>
      )
    }
  }
}
const mapStateToProps = state => {
  return{
    isLogin: state.loginCheck.isLogin,
  }
}
const mapDispatchToProps = dispatch => {
  return{

  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)
