import React, { Component } from 'react'
import { setEmail,setPassword,login} from '../actions/index'
import { connect } from 'react-redux'
import {Col,Form,FormGroup,FormControl,Button} from "react-bootstrap"
import { Link, withRouter} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';

class LoginForm extends Component {

  handleSubmit(e){
    e.preventDefault();
    this.props.history.push('/')
    this.props.login(this.props.info)
  }

  handleChange(e){
    e.preventDefault()

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
    const style={
      color:"white"
    }

    return(
      <div>
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
          <Col sm={12}>
            <FlatButton label="Log In" fullWidth={true} backgroundColor="#8AA62F" hoverColor="#7CBD1E" style={style} type="submit" />
    		   </Col>
          <Col sm={12}></Col>
          <Col sm={12}>
            <Link to="/signup"><FlatButton label="Sign Up" fullWidth={true} backgroundColor="#1160AA"  hoverColor="#3F52E3" style={style}/></Link>
          </Col>
    		</FormGroup>
    	   </Form>
       </div>
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
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))
