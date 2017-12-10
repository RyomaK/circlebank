import React, {Component} from "react"
import {Grid,Button} from "react-bootstrap"
import { connect } from 'react-redux'
import { login } from '../actions/index'
import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';





class TopPage extends Component {
  render(){
  return(
    <div className="top">
      <Grid>
        <p>ログインしてください</p>
        <Link to="/circle"><FlatButton label="Sing Up" /></Link>
        <a href="auth/login/google"><FlatButton label="Log In" /></a>
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


export default connect(
  mapStateToProps
)(TopPage)
