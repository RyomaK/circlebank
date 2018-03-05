import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { setEmail,setPassword,login,adminCheck} from '../actions/index'
import { connect } from 'react-redux'
import {Col,Form,FormGroup,FormControl,Button} from "react-bootstrap"
import { Link, withRouter} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';

class LoginForm extends Component {
  handleSubmit(e){
    e.preventDefault()
    this.props.login(this.props.info);
    this.props.history.push('/admin');
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
        width: '100%',
      },
      customColor:{
        color: "white",
        width: "100%",
      },
    };
    return(
      <div>
        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "mail"
            type = "mail"
            floatingLabelText="メールアドレス"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>

    		<FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "password"
            type = "password"
            floatingLabelText="パスワード"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
    		<FormGroup>
          <Col smOffset={2} sm={8}>
            <FlatButton label="Log In"  backgroundColor="#8AA62F" hoverColor="#7CBD1E" style={styles.customColor} type="submit" />
    		   </Col>
          <Col smOffset={2}sm={8}>
            <Link to="/signup"><p className="rightside">アカウント作成はコチラ</p></Link>
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
