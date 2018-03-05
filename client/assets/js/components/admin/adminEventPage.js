import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {Button,Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {adminGetEvent,adminDeleteEvent} from '../../actions/index'

class adminEventPage extends Component{
  componentDidMount(){
    const name = this.props.match.params.name
    this.props.getEvent(name);
  }
  handleClick1(event,circle_id,event_id,name,circle_name){
    event.preventDefault();
    this.props.adminDeleteEvent(circle_id,event_id,name)
    this.props.history.push(`/admin/delete/${circle_name}`)
  }
  handleClick(event,circle_id){
    event.preventDefault();
    this.props.history.push(`/admin/add/event/${circle_id}`)
  }
  render(){
    return(
        <div>
          <Col smOffset={1} sm={9}>
          <span>{`${this.props.circle.name}のイベント`}</span><FlatButton　onClick={(event)=>this.handleClick(event,this.props.circle.id)}>イベントを追加する</FlatButton>
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow >
                <TableHeaderColumn>イベント名</TableHeaderColumn>
                <TableHeaderColumn>日程</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.events.map( eve => (
                <TableRow key={eve.id}>
                  <TableRowColumn>{eve.name}</TableRowColumn>
                  <TableRowColumn>{eve.agenda}</TableRowColumn>
                  <TableRowColumn><FlatButton onClick={(event)=>this.handleClick1(event,this.props.circle.id,eve.id,this.props.circle.url_name,this.props.circle.name)}>削除</FlatButton></TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
            </Col>
        </div>
      )
  }
}
const mapStateToProps = state => {
  console.log(state)
  return{
    circle: state.circle.circle,
    events: state.circle.events
  }
}
const mapDispatchToProps = dispatch => {
  return{
      getEvent:name => {
        dispatch(adminGetEvent(name))
      },
      adminDeleteEvent:(circle_id,event_id,name) => {
        dispatch(adminDeleteEvent(circle_id,event_id,name))
      }
    }
  }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(adminEventPage))
