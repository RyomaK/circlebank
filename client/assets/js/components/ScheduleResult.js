import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from 'material-ui/Table';

import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'


const ScheduleResult = ({events}) => {
  return(
    <div>
    <Table>
      <TableBody displayRowCheckbox={false}>
        {events.map((eve)=>{
          return(
              <TableRow key={eve.id}>
                <TableRowColumn>{eve.name}</TableRowColumn>
                <TableRowColumn>{eve.circle_name}</TableRowColumn>
              </TableRow>
          )
        })}
        </TableBody>

    </Table>
    </div>

  )

}
export default ScheduleResult
