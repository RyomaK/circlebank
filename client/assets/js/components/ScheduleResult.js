import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import {Link,withRouter} from 'react-router-dom'


class ScheduleResult extends Component {
  handleClick(event,url){
    event.preventDefault()
    this.props.history.push(`circle/search/${url}`)
  }
  render(){
    return(
      <div>
      <Table>
        <TableBody displayRowCheckbox={false}>
          {this.props.events.map((eve)=>{
            return(
                <TableRow key={eve.id}>
                  <TableRowColumn>{eve.name}</TableRowColumn>
                  <TableRowColumn><span onClick={(event)=>this.handleClick(event,eve.circle_url_name)}>{eve.circle_name}</span></TableRowColumn>
                </TableRow>
              )
          })}
          </TableBody>
      </Table>
      </div>
    )
  }

}
export default withRouter(connect()(ScheduleResult))
