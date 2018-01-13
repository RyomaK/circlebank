import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { setUniversity,setName,setSex,setEmail,setDepartment,setSubject,settYear,setPassword,signup,selectUniversity } from '../actions/index'
import { connect } from 'react-redux'
import { Link, withRouter} from 'react-router-dom'
import {Col,Form,FormGroup,FormControl,Button,Checkbox,DropdownButton} from "react-bootstrap"
import FlatButton from 'material-ui/FlatButton';

const univerBox = [{tag:0,name:"同志社大学"},{tag:1,name:"同志社女子大学"}]
const departmentBox = [[{tag:0,name:"神学部"},{tag:1,name:"文学部"},{tag:2,name:"法学部"},
{tag:3,name:"社会学部"},{tag:4,name:"経済学部"},{tag:5,name:"商学部"},{tag:6,name:"政策学部"},
{tag:7,name:"文化情報学部"},{tag:8,name:"理工学部"},{tag:9,name:"生命医科学部"},{tag:10,name:"スポーツ健康科学部"},
{tag:11,name:"心理学部"},{tag:12,name:"グローバル・コミュニケーション学部"},{tag:13,name:"グローバル地域文化学部"}],
[{tag:0,name:"学芸学部"},{tag:1,name:"現代社会学部"},{tag:2,name:"薬学部"},{tag:3,name:"表象文化学部"},
{tag:4,name:"生活科学部"},{tag:5,name:"看護学部"}]]
const subjectBox = [[[{tag:0,name:"神学科"}],
[{tag:0,name:"英文学科"},{tag:1,name:"哲学科"},{tag:2,name:"美学芸術学科"},{tag:3,name:"文化史学科"},{tag:4,name:"国文学科"}],
[{tag:0,name:"社会学科"},{tag:1,name:"社会福祉学科"},{tag:2,name:"メディア学科"},{tag:3,name:"産業関係学科"},{tag:4,name:"教育文化学科"}],
[{tag:0,name:"法律学科"},{tag:1,name:"政治学科"}],
[{tag:0,name:"経済学科"}],
[{tag:0,name:"商学科"}],
[{tag:0,name:"政策学科"}],
[{tag:0,name:"文化情報学科"}],
[{tag:0,name:"インテリジェント情報工学科"},{tag:1,name:"情報システムデザイン学科"},{tag:2,name:"電気工学科"},{tag:3,name:"電子工学科"},{tag:4,name:"機械システム工学科"},
{tag:5,name:"エネルギー機械工学科"},{tag:6,name:"機能分子・生命科学科"},{tag:7,name:"科学システム創世工学科"},{tag:8,name:"環境システム学科"},{tag:9,name:"数理システム学科"}],
[{tag:0,name:"医工学科"},{tag:1,name:"医情報学科"},{tag:2,name:"医生命システム学科"}],
[{tag:0,name:"スポーツ健康科学科"}],
[{tag:0,name:"心理学科"}],
[{tag:0,name:"グローバル・コミュニケーション学科"}],
[{tag:0,name:"グローバル地域文化学科"}]],
[[{tag:0,name:"音楽学科"},{tag:1,name:"創造学科(情報メディア学科)"},{tag:2,name:"国際教養学科"}],
  [{tag:0,name:"社会システム学科"},{tag:1,name:"現代こども学科"}],
  [{tag:0,name:"医療薬学科"}],
  [{tag:0,name:"日本語日本文学科"},{tag:1,name:"英語英文学科"}],
  [{tag:0,name:"人間生活学科"}],
  [{tag:0,name:"植物栄養科学科"}],
  [{tag:0,name:"看護学科"}]]]
const year = [{tag:0,year:"2018"},{tag:1,year:"2017"},{tag:2,year:"2016"}]




class SignupForm extends Component{

  constructor(props) {
    super(props);
    this.state = {check: "true",value1:0,value2:0,value3:0,value4:0};
  }

  componentDidMount(){
    this.props.setUniversity(univerBox[this.state.value1].name);
    this.props.setDepartment(departmentBox[this.state.value1][this.state.value2].name);
    this.props.setSubject(subjectBox[this.state.value1][this.state.value2][this.state.value3].name);
    this.props.settYear(year[this.state.value4].year);
  }

  handleSubmit(e){
    e.preventDefault();

    this.props.signup(this.props.info)
    this.props.history.push('/');
  }

  handleChange1(event, index, value){
    event.preventDefault();
    this.setState({value1:index,value2:0,value3:0});
    this.props.setUniversity(univerBox[this.state.value1].name)
  }
  handleChange2(event, index, value){
    event.preventDefault();
    this.setState({value2:value,value3:0});
    this.props.setDepartment(departmentBox[this.state.value1][this.state.value2].name)
  }
  handleChange3(event, index, value){
    event.preventDefault();
    this.setState({value3:value});
    this.props.setSubject(subjectBox[this.state.value1][this.state.value2][this.state.value3].name)
  }
  handleChange4(event, index, value){
    event.preventDefault();
    this.setState({value4:value});
    this.props.settYear(year[this.state.value4].year)
  }


  handleChange(e){
    switch(e.target.name){

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
        width: 300,
      },
      customColor:{
        color: "white",
      },
    };
    return(

      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
  		<FormGroup>
  			<Col sm={10}>
        <SelectField
          floatingLabelText="大学"
          value={this.state.value1}
          onChange={this.handleChange1.bind(this)}
          style={styles.customWidth}
        >
        {univerBox.map(univer => (

          <MenuItem key={univer.tag} value={univer.tag} primaryText={univer.name}/>
        ))}

        </SelectField>
        </Col>
  		</FormGroup>

      <FormGroup>
  			<Col sm={10}>

        <SelectField
          floatingLabelText="学部"
          value={this.state.value2}
          onChange={this.handleChange2.bind(this)}
          style={styles.customWidth}
        >
        {departmentBox[this.state.value1].map(department => (

          <MenuItem key={department.tag} value={department.tag} primaryText={department.name}/>
        ))}

        </SelectField>
  			</Col>
  		</FormGroup>


      <FormGroup>
  			<Col sm={10}>
        <SelectField
          floatingLabelText="学科"
          value={this.state.value3}
          onChange={this.handleChange3.bind(this)}
          style={styles.customWidth}
        >
        {subjectBox[this.state.value1][this.state.value2].map(subject => (

          <MenuItem key={subject.tag} value={subject.tag} primaryText={subject.name}/>
        ))}

        </SelectField>
  			</Col>
  		</FormGroup>



      <FormGroup>
  			<Col sm={10}>
        <TextField
        name = "name"
        floatingLabelText="名前"
        floatingLabelFixed={true}
        onChange={this.handleChange.bind(this)}
        />
  			</Col>
  		</FormGroup>

      <FormGroup validationState="success">
        <Col sm={10}>
        <SelectField
          floatingLabelText="入学年"
          value={this.state.value4}
          onChange={this.handleChange4.bind(this)}
          style={styles.customWidth}
        >
        {year.map(year => (

          <MenuItem key={year.tag} value={year.tag} primaryText={year.year}/>
        ))}

        </SelectField>
      </Col>
  		</FormGroup>

      <FormGroup validationState="success">
      <Col sm={10}>
        <Checkbox inline name="sex" checked={this.state.check} onChange={this.handleChange.bind(this)}>男</Checkbox> <Checkbox inline  name ="sex" checked={!this.state.check} onChange={this.handleChange.bind(this)}>女</Checkbox>
      </Col>
      </FormGroup>

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
  			<Col sm={10}>
          <FlatButton label="Sign Up" fullWidth={true} backgroundColor="#1160AA"  hoverColor="#3F52E3" style={styles.customColor} type ="submit" />
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
      settYear: year => {
        dispatch(settYear(year))
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
      },
      selectUniver: () => {
        dispatch(selectUniversity())
      }

    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupForm))
