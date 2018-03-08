import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Button,Col} from 'react-bootstrap'
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import AddButton from 'material-ui/svg-icons/content/add';
import {adminGetCircle,adminDeleteCircle} from '../../actions/index'

class Home extends Component{
  componentDidMount(){
    this.props.getCircle();
  }
  handleClick(event,name){
    event.preventDefault();
    this.props.history.push(`/admin/event/${name}`)
  }
  handleClick1(event,id,name){
    event.preventDefault();
    this.props.DeleteCircle(id)
    this.props.history.push(`/admin/delete/${name}`)
  }

  handleClick2(event,id,url){
    event.preventDefault();
    this.props.history.push(`/admin/image/${url}/${id}`)
  }
  handleClick3(e){
    e.preventDefault();
    this.props.history.push(`/admin/add/circle`)
  }
  render(){
    return(
        <div>
        <Col smOffset={1} sm={10}>
        <div className="adminHome">
        <span className="fontChange adminHome1">サークル一覧</span>
        <span className="addButton">
          <IconButton onClick={this.handleClick3.bind(this)} >
            <AddButton/>
          </IconButton>
        </span>
        </div>
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow >
                <TableHeaderColumn>名前</TableHeaderColumn>
                <TableHeaderColumn>種類</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            {this.props.circles.circle.map( circle => (
              <TableRow key={circle.id}>
                <TableRowColumn>{circle.name}</TableRowColumn>
                <TableRowColumn>{circle.introduction}</TableRowColumn>
                <TableRowColumn><FlatButton onClick={(event)=>this.handleClick2(event,circle.id,circle.url_name)} >画像・タグ追加</FlatButton></TableRowColumn>
                <TableRowColumn><FlatButton onClick={(event)=>this.handleClick1(event,circle.id,circle.url_name)} >削除</FlatButton></TableRowColumn>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </Col>
        </div>
      )
  }
}
const  mapStateToProps = state => {

  return{
    circles: state.adminCircle
  }
}
const mapDispatchToProps = dispatch => {
  return{
      getCircle:() => {
        dispatch(adminGetCircle())
      },
      DeleteCircle:(id)=>{
        dispatch(adminDeleteCircle(id))
      }
    }
  }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
