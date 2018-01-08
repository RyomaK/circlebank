import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { setUniversity,setName,setSex,setEmail,setDepartment,setSubject,setPassword,signup } from '../actions/index'
import { connect } from 'react-redux'
import {Col,Form,FormGroup,FormControl,Button,Checkbox} from "react-bootstrap"

class SignupForm extends Component{
  constructor(props) {
    super(props);
    this.state = {check: "true"};
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.props.info)
    this.props.signup(this.props.info)
  }

  handleChange(e){
    console.log(this.props.info)
    e.preventDefault();
    switch(e.target.name){
      case 'university':
        this.props.setUniversity(e.target.value)
      break;
      case 'name':
        this.props.setName(e.target.value)
      break;
      case 'sex':
        this.setState({check:!this.state.check})
        this.props.setSex(this.state.check)

      break;
      case 'mail':
        this.props.setEmail(e.target.value)
      break;
      case 'department':
        this.props.setDepartment(e.target.value)
      break;
      case 'subject':
        this.props.setSubject(e.target.value)
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
  				大学
  			</Col>
  			<Col sm={10}>
  				<FormControl name = "university" type="text" placeholder="同志社" onChange={this.handleChange.bind(this)}/>
  			</Col>
  		</FormGroup>

      <FormGroup>
  			<Col sm={2}>
  				名前
  			</Col>
  			<Col sm={10}>
  				<FormControl name = "name" type="text" placeholder="Name" onChange={this.handleChange.bind(this)}/>
  			</Col>
  		</FormGroup>

      <FormGroup validationState="success">
        <Col sm={2}>
          性別
        </Col>
        <Col sm={10}>
        <Checkbox inline name="sex" checked={this.state.check} onChange={this.handleChange.bind(this)}>男</Checkbox> <Checkbox inline  name ="sex" checked={!this.state.check} onChange={this.handleChange.bind(this)}>女</Checkbox>
      </Col>
  		</FormGroup>

      <FormGroup>
  			<Col sm={2}>
  				Email
  			</Col>
  			<Col sm={10}>
  				<FormControl name = "mail"type="mail" placeholder="Email" onChange={this.handleChange.bind(this)}/>
  			</Col>
  		</FormGroup>

      <FormGroup>
  			<Col sm={2}>
  				学部
  			</Col>
  			<Col sm={10}>
  				<FormControl name="department" type="text" placeholder="department" onChange={this.handleChange.bind(this)}/>
  			</Col>
  		</FormGroup>

      <FormGroup>
  			<Col sm={2}>
  				学科
  			</Col>
  			<Col sm={10}>
  				<FormControl name = "subject" type="text" placeholder="subject" onChange={this.handleChange.bind(this)}/>
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
  				<Button type="submit">Sign Up</Button>
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
      setUniversity: (uni) => {
        dispatch(setUniversity(uni))
      },
      setName: name => {
        dispatch(setName(name))
      },
      setSex: id => {
        dispatch(setSex(id))
      },
      setEmail: mail => {
        dispatch(setEmail(mail))
      },
      setDepartment: department => {
        dispatch(setDepartment(department))
      },
      setSubject: subject => {
        dispatch(setSubject(subject))
      },
      setPassword: password => {
        dispatch(setPassword(password))
      },
      signup: data => {
        dispatch(signup(data))
      }

    }
  }


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm)
