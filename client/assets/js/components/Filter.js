import React, {Component} from 'react'

import { connect } from 'react-redux'

class Filter extends Component {
  render(){
  if(this.props.isLogin == 'true'){
    return(
      <div>{this.props.children}</div>
    )
  }else{
    return(
      <div></div>
    )
  }
}

}

const mapStateToProps = state => {
    return{
    isLogin : state.loginCheck.isLogin
  }
}

export default connect(
  mapStateToProps
)(Filter)
