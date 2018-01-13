import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import { setEmail,setPassword,login} from '../actions/index'
import { connect } from 'react-redux'
import {Col,Form,FormGroup,FormControl,Button} from "react-bootstrap"
import { Link, withRouter} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';

class LoginForm extends Component {

  handleSubmit(e){
    e.preventDefault()

    this.props.login(this.props.info);
    this.props.history.push('/');

  }

  handleChange(e){

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
    const styles = {
      customWidth: {
        width: 150,
      },
      customColor:{
        color: "white",
      },
    };
    return(
      <div>
        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup>
    			<Col sm={10}>
            <TextField
            name = "mail"
            type = "mail"
            floatingLabelText="メールアドレス"
            floatingLabelFixed={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
    		<FormGroup>
    			<Col sm={10}>
            <TextField
            name = "password"
            type = "password"
            floatingLabelText="パスワード"
            floatingLabelFixed={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
    		<FormGroup>
          <Col sm={12}>
            <FlatButton label="Log In" fullWidth={true} backgroundColor="#8AA62F" hoverColor="#7CBD1E" style={styles.customColor} type="submit" />
    		   </Col>
          <Col sm={12}></Col>
          <Col sm={12}>
            <Link to="/signup"><FlatButton label="Sign Up" fullWidth={true} backgroundColor="#1160AA"  hoverColor="#3F52E3" style={styles.customColor}/></Link>
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
