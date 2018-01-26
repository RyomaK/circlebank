import React, {Component} from 'react'
import { adminSetEvent,EventName,EventAgenda,EventPlace,EventDetail,EventFee,EventCapacity} from '../../actions/index';
import {withRouter} from 'react-router-dom'
import {Col,Form,FormGroup,FormControl,Button} from "react-bootstrap"
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'



const months = [
  {tag:0,month:'01'},
  {tag:1,month:'02'},
  {tag:2,month:'03'},
  {tag:3,month:'04'},
  {tag:4,month:'05'},
  {tag:5,month:'06'},
  {tag:6,month:'07'},
  {tag:7,month:'08'},
  {tag:8,month:'09'},
  {tag:9,month:'10'},
  {tag:10,month:'11'},
  {tag:11,month:'12'}
]
const days = [
  {tag:0,month:'01'},
  {tag:1,month:'02'},
  {tag:2,month:'03'},
  {tag:3,month:'04'},
  {tag:4,month:'05'},
  {tag:5,month:'06'},
  {tag:6,month:'07'},
  {tag:7,month:'08'},
  {tag:8,month:'09'},
  {tag:9,month:'10'},
  {tag:10,month:'11'},
  {tag:11,month:'12'},
  {tag:12,month:'13'},
  {tag:13,month:'14'},
  {tag:14,month:'15'},
  {tag:15,month:'16'},
  {tag:16,month:'17'},
  {tag:17,month:'18'},
  {tag:18,month:'19'},
  {tag:19,month:'20'},
  {tag:20,month:'21'},
  {tag:21,month:'22'},
  {tag:22,month:'23'},
  {tag:23,month:'24'},
  {tag:24,month:'25'},
  {tag:25,month:'26'},
  {tag:26,month:'27'},
  {tag:27,month:'28'},
  {tag:28,month:'29'},
  {tag:29,month:'30'},
  {tag:30,month:'31'},
]

class AddEvent extends Component{
  constructor(props) {
    super(props);
    this.state = {value1:0,value2:0};
  }
  handleSubmit(e){
    e.preventDefault()
    const id = this.props.match.params.id
    this.props.adminSetEvent(id,this.props.events)
    this.props.history.push('/')

  }
  handleChange1(event, index, value){

    event.preventDefault();
    const value1=value
    this.setState({value1})
    this.props.EventAgenda(`2018-${months[value1].month}-${days[this.state.value2].month}T00:00:00Z`)
    console.log(this.props.events)

  }
  handleChange2(event, index, value){
    event.preventDefault();
    const value2=value
    this.setState({value2})
    this.props.EventAgenda(`2018-${months[this.state.value1].month}-${days[value2].month}T00:00:00Z`)
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
      customWidth1: {
        width: 100,
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
          <SelectField
            floatingLabelText="月"
            value={this.state.value1}
            onChange={this.handleChange1.bind(this)}
            style={styles.customWidth1}
            maxHeight={200}
            >
            {months.map(month => (

              <MenuItem key={month.tag} value={month.tag} primaryText={month.month}/>
            ))}
          </SelectField>
          <SelectField
            floatingLabelText="日"
            value={this.state.value2}
            onChange={this.handleChange2.bind(this)}
            style={styles.customWidth1}
            maxHeight={200}
            >
            {days.map(day => (

              <MenuItem key={day.tag} value={day.tag} primaryText={day.month}/>
            ))}
            </SelectField>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEvent))
