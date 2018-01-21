import React, { Component } from 'react'
import Home from './Home'
import CirclePage from './CirclePage'
import AddEvent from './AddEvent'
import { Redirect, Route} from 'react-router-dom'
import { adminCheck } from '../../actions/index'
import { connect } from 'react-redux'

class AdminAuth extends Component{
  componentWillMount(){
    this.props.AdminCheck();
  }

  componentWillUpdate(){
    this.props.AdminCheck();
  }


  render(){

    const admin = this.props.admin
    if(admin==true){

      return(
        <div>
          <Route exact path='/' component={Home}/>
          <Route exact path='/admin/circle' component={CirclePage}/>
          <Route exact path='/admin/add/:id/event' component={AddEvent}/>
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
    admin: state.adminCheck.admin
  }
}
const mapDispatchToProps = dispatch => {
  return{
    AdminCheck: () => {
      dispatch(adminCheck())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminAuth)
