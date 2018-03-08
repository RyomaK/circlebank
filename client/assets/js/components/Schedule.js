import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import ScheduleResult from './ScheduleResult'
import Menu from './Menu'

import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
const month1 = [
  {tag:0,month:'04'}
]
const day1 = [
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

class Schedule extends Component{
  constructor(props) {
    super(props);
    this.state = {value1:0,value2:0,value3:'g'};
  }
  handleChange2(event, index, value){
    event.preventDefault();
    const value2=value
    this.setState({value2})
    this.setState({value3:`2018-04-${day1[value2].month}T00:00:00Z`})
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
    const item = this.props.events.filter((item) => {
      return item.agenda.includes(this.state.value3)
    })
    return(
      <div>
        <Col sm={3} xsHidden className="reset">
          <Menu/>
        </Col>

        <Col sm={9} className="whitePage">
          <div className="scheduleTitle whitePage">新歓スケジュール検索</div>
          <SelectField
            floatingLabelText="月"
            value={this.state.value1}
            style={styles.customWidth1}
            maxHeight={200}
            >
            {month1.map(month => (
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
            {day1.map(day => (
              <MenuItem key={day.tag} value={day.tag} primaryText={day.month}/>
            ))}
          </SelectField>
        </Col>
        <Col sm={9} className="whitePage" >
          <ScheduleResult events={item}/>
        </Col>

      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    events:state.events.events
  }
}
const mapDispatchToProps = dispatch => {

  return{

    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule)
