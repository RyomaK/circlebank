import React, {Component} from 'react'
import {adminSetName,adminSetUrl,adminSetNumber,adminSetRaitio,
adminSetImage,adminSetIntro,adminSetMessage,adminSetDeleName,
adminSetContact,adminSetCampus,adminSetExcite,adminSetFee,
adminSetCircle} from '../../actions/index';

import {Col,Form,FormGroup,FormControl,Button} from "react-bootstrap"
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'

class CircleEdit extends Component{
  handleSubmit(e){
    e.preventDefault()
    this.props.adminSetCircle(this.props.circle);

  }

  handleChange(e){
    switch(e.target.name){
      case 'name':
        this.props.adminSetName(e.target.value)
      break;
      case 'url_name':
        this.props.adminSetUrl(e.target.value)
      break;
      case 'number':
        this.props.adminSetNumber(e.target.value)
      break;
      case 'gender_raitio':
        this.props.adminSetRaitio(e.target.value)
      break;
      case 'image':
        this.props.adminSetImage(e.target.value)
      break;
      case 'introduction':
        this.props.adminSetIntro(e.target.value)
      break;
      case 'message_for_fresh':
        this.props.adminSetMessage(e.target.value)
      break;
      case 'delegete_name':
        this.props.adminSetDeleName(e.target.value)
      break;
      case 'delegete_contact':
        this.props.adminSetContact(e.target.value)
      break;
      case 'campus':
        this.props.adminSetCampus(e.target.value)
      break;
      case 'fee':
        this.props.adminSetFee(e.target.value)
      break;
      case 'excite':
        this.props.adminSetExcite(e.target.value)
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
            name = "name"
            type = "text"
            floatingLabelText="サークル名"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>

    		<FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "url_name"
            type = "text"
            floatingLabelText="URL名"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "number"
            type = "text"
            floatingLabelText="メンバー数"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "gender_raitio"
            type = "text"
            floatingLabelText="男女比"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup><FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "image"
            type = "text"
            floatingLabelText="画像"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "introduction"
            type = "text"
            floatingLabelText="サークルの種類"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "message_for_fresh"
            type = "text"
            floatingLabelText="サークル紹介文"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "delegete_name"
            type = "text"
            floatingLabelText="代表者"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "delegete_contact"
            type = "text"
            floatingLabelText="連絡先"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "campus"
            type = "text"
            floatingLabelText="活動場所"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "fee"
            type = "text"
            floatingLabelText="年会費"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "excite"
            type = "text"
            floatingLabelText="活動頻度"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
    		<FormGroup>
          <Col smOffset={2} sm={8}>
            <FlatButton label="登録"  backgroundColor="#8AA62F" hoverColor="#7CBD1E" style={styles.customColor} type="submit" />
    		   </Col>

          <Col smOffset={2}sm={8}>
          <p className="rightside">アカウント作成はコチラ</p>
          </Col>
    		</FormGroup>
    	   </Form>
       </div>
    )
  }
}



const mapStateToProps = state => {
  return{
    circle: state.adminSetState
  }
}
const mapDispatchToProps = dispatch => {
  return{
      adminSetCircle: (data)=>{
        dispatch(adminSetCircle(data))
      },
      adminSetName:(name)=>{
        dispatch(adminSetName(name))
      },
      adminSetUrl:(name)=>{
        dispatch(adminSetUrl(name))
      },
      adminSetNumber:(name)=>{
        dispatch(adminSetNumber(name))
      },
      adminSetRaitio:(name)=>{
        dispatch(adminSetRaitio(name))
      },
      adminSetImage:(name)=>{
        dispatch(adminSetImage(name))
      },
      adminSetIntro:(name)=>{
        dispatch(adminSetIntro(name))
      },
      adminSetDeleName:(name)=>{
        dispatch(adminSetDeleName(name))
      },
      adminSetContact:(name)=>{
        dispatch(adminSetContact(name))
      },
      adminSetCampus:(name)=>{
        dispatch(adminSetCampus(name))
      },
      adminSetFee:(name)=>{
        dispatch(adminSetFee(name))
      },
      adminSetExcite:(name)=>{
        dispatch(adminSetExcite(name))
      },
      adminSetMessage:(name)=>{
        dispatch(adminSetMessage(name))
      }
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CircleEdit)
