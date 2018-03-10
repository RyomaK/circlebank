import React, {Component} from 'react'
import {adminSetName,adminSetUrl,adminSetNumber,adminSetIntro,
  adminSetDeleName,adminSetContact,adminSetCampus,adminSetEntrance,
  adminSetAnnual,adminSetWeek,adminSetTime,adminSetAdmission,
  adminSetBox,adminSetBooth,adminSetCircle} from '../../actions/index';
import {withRouter} from 'react-router-dom'

import {Col,Form,FormGroup,FormControl} from "react-bootstrap"
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'

class AdminCirclePage extends Component{
  handleSubmit(e){
    e.preventDefault()
    this.props.adminSetCircle(this.props.circle);
    this.props.history.push('/admin');
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
      case 'introduction':
        this.props.adminSetIntro(e.target.value)
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
      case 'entrance_fee':
        this.props.adminSetEntrance(e.target.value)
      break;
      case 'annual_fee':
        this.props.adminSetAnnual(e.target.value)
      break;
      case 'activity_week':
        this.props.adminSetWeek(e.target.value)
      break;
      case 'activity_time':
        this.props.adminSetTime(e.target.value)
      break;
      case 'admission_deadline':
        this.props.adminSetAdmission(e.target.value)
      break;
      case 'box_number':
        this.props.adminSetBox(e.target.value)
      break;
      case 'booth_number':
        this.props.adminSetBooth(e.target.value)
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
        <Form horizontal onSubmit={this.handleSubmit.bind(this)} className="whitePage">
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
            type = "number"
            floatingLabelText="人数"
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
            floatingLabelText="紹介文"
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
            name = "entrance_fee"
            type = "text"
            floatingLabelText="入会費"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "annual_fee"
            type = "text"
            floatingLabelText="年会費"
            floatingLabelFixed={true}
            fullWidth={true}
            multiLine={true}
            rows={2}
            rowsMax={4}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "activity_week"
            type = "text"
            floatingLabelText="活動日"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "activity_time"
            type = "text"
            floatingLabelText="活動時間"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "admission_deadline"
            type = "text"
            floatingLabelText="締め切り"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "box_number"
            type = "number"
            floatingLabelText="BOX番号"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "booth_number"
            type = "number"
            floatingLabelText="ブース番号"
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
    		</FormGroup>
    	   </Form>
       </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    circle: state.adminSetState,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminCirclePage))
