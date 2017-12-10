import React, {Component} from "react"
import {Grid,Button} from "react-bootstrap"
import { connect } from 'react-redux'
import { login } from '../actions/index'





class TopPage extends Component {
  render(){
  return(
    <div className="top">
  <Grid>
        <p>トップページ</p>
        <p><Button bsStyle="success" bsSize="large">Sign Up</Button>
        <span></span>
        <Button bsStyle="info"bsSize="large" onClick={e =>{
          e.preventDefault()
          this.props.onLogin()
        }}>Log In</Button></p>
  </Grid>
  </div>
  )
}
}
const mapStateToProps = state => {
  return(
    state
  )
}

const mapDispatchToProps= dispatch => {
  return{
    onLogin: () => {
      console.log("a")
      dispatch(login())
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopPage)
