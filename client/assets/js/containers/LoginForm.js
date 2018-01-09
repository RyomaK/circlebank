import React, { Component } from 'react'
import { setEmail,setPassword,login} from '../actions/index'
import { connect } from 'react-redux'
import {Col,Form,FormGroup,FormControl,Button} from "react-bootstrap"

class LoginForm extends Component {

  handleSubmit(e){
    e.preventDefault();
    console.log(this.props.info)
    this.props.login(this.props.info)
  }

  handleChange(e){
    console.log(this.props.info)
    e.preventDefault();
    switch(e.target.name){
      case 'mail':
        this.props.setEmail(e.target.value)
      break;
      case 'password':
        this.props.setPassword(e.target.value)
      break;
      default:
      break;
    }
  }

  render(){
    return(
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
  		<FormGroup>
  			<Col sm={2}>
  				Email
  			</Col>
  			<Col sm={10}>
  				<FormControl name = "mail" type="email" placeholder="Email" onChange={this.handleChange.bind(this)}/>
  			</Col>
  		</FormGroup>

  		<FormGroup>
  			<Col sm={2}>
  				Password
  			</Col>
  			<Col sm={10}>
  				<FormControl name = "password" type="password" placeholder="Password" onChange={this.handleChange.bind(this)}/>
  			</Col>
  		</FormGroup>
  		<FormGroup>
  			<Col smOffset={2} sm={10}>
  				<Button type="submit">Sign in</Button>
  			</Col>
  		</FormGroup>
  	</Form>
    )
  }
}

const mapStateToProps = state => {
  return{
    info: state.setStatus
  }
}

const mapDispatchToProps = dispatch => {
  return{

      setEmail: mail => {
        dispatch(setEmail(mail))
      },
      setPassword: password => {
        dispatch(setPassword(password))
      },
      login: data => {
        dispatch(login(data))
      }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
