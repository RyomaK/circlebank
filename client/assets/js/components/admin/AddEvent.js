import React, {Component} from 'react'
import { adminSetEvent,EventName,EventAgenda,EventPlace,EventDetail,EventFee,EventCapacity} from '../../actions/index';

import {Col,Form,FormGroup,FormControl,Button} from "react-bootstrap"
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'

class AddEvent extends Component{
  handleSubmit(e){
    e.preventDefault()
    const id = this.props.match.params.id
    this.props.adminSetEvent(id,this.props.events)

  }

  handleChange(e){
    switch(e.target.name){
      case 'name':
        this.props.EventName(e.target.value)
      break;
      case 'image':
      break;
      case 'fee':
        this.props.EventFee(e.target.value)
      break;
      case 'agenda':
        this.props.EventAgenda(e.target.value)
      break;
      case 'place':
        this.props.EventPlace(e.target.value)
      break;
      case 'detail':
        this.props.EventDetail(e.target.value)
      break;
      case 'capacity':

        this.props.EventCapacity(e.target.value)
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
            floatingLabelText="イベント名"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>

    		<FormGroup>
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
            name = "agenda"
            type = "text"
            floatingLabelText="日付"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "place"
            type = "text"
            floatingLabelText="場所"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup><FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "detail"
            type = "text"
            floatingLabelText="詳細"
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
            type = "number"
            floatingLabelText="費用"
            floatingLabelFixed={true}
            fullWidth={true}
            onChange={this.handleChange.bind(this)}
            />
    			</Col>
    		</FormGroup>
        <FormGroup>
    			<Col smOffset={2} sm={8}>
            <TextField
            name = "capacity"
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
    events: state.adminEventState
  }
}
const mapDispatchToProps = dispatch => {
  return{
      adminSetEvent: (id,data)=>{
        dispatch(adminSetEvent(id,data))
      },
      EventName:(name)=>{
        dispatch(EventName(name))
      },
      EventAgenda:(name)=>{
        dispatch(EventAgenda(name))
      },
      EventPlace:(name)=>{
        dispatch(EventPlace(name))
      },
      EventDetail:(name)=>{
        dispatch(EventDetail(name))
      },
      EventFee:(name)=>{
        dispatch(EventFee(name))
      },
      EventCapacity:(name)=>{
        dispatch(EventCapacity(name))
      }
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEvent)
