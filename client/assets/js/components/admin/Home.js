import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Button,Col,Pager} from 'react-bootstrap'
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
import {adminGetCircle,adminDeleteCircle,adminCircleSearch} from '../../actions/index'

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {value:1};
  }
  componentDidMount(){
    this.props.getCircle(this.state.value);
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
  handleClick3(event,id,name){
    event.preventDefault();
    this.props.history.push(`/admin/sns/${name}/${id}`)
  }
  handleClick4(event,url){
    event.preventDefault()
    this.props.history.push(`admin/circle/search/${url}`)
  }
  handleClick5(e){
    event.preventDefault()
    this.props.history.push(`admin/add/circle`)
  }
  handleClick6(event,id,url){
    event.preventDefault()
    this.props.adminCircleSearch(url)
    this.props.history.push(`admin/edit/circle/${id}`)
  }
  handlePreClick(e){
    e.preventDefault()
    if(this.state.value != 1){
      this.props.getCircle(this.state.value-1)
      this.setState({value:this.state.value-1})
    }
  }
  handleNexClick(e){
    e.preventDefault()
      this.props.getCircle(this.state.value+1)
      this.setState({value:this.state.value+1})
  }
  render(){
    return(
        <div>
        <Col smOffset={1} sm={10}>
        <div className="adminHome">
        <span className="fontChange adminHome1">サークル一覧</span>
        <span className="addButton">
          <IconButton onClick={this.handleClick5.bind(this)} >
            <AddButton/>
          </IconButton>
        </span>
        </div>
          <h4>{`${this.state.value}`}ページ目</h4>
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow >
                <TableHeaderColumn>名前</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            {this.props.circles.circle.map( circle => (
              <TableRow key={circle.id}>
                <TableRowColumn><span onClick={(event)=>this.handleClick4(event,circle.url_name)}>{circle.name}</span></TableRowColumn>
                <TableRowColumn><FlatButton onClick={(event)=>this.handleClick6(event,circle.id,circle.url_name)} >編集</FlatButton></TableRowColumn>
                <TableRowColumn><FlatButton onClick={(event)=>this.handleClick3(event,circle.id,circle.url_name)} >SNS追加</FlatButton></TableRowColumn>
                <TableRowColumn><FlatButton onClick={(event)=>this.handleClick(event,circle.url_name)} >イベント追加</FlatButton></TableRowColumn>
                <TableRowColumn><FlatButton onClick={(event)=>this.handleClick2(event,circle.id,circle.url_name)} >画像・タグ追加</FlatButton></TableRowColumn>
                <TableRowColumn><FlatButton onClick={(event)=>this.handleClick1(event,circle.id,circle.url_name)} >削除</FlatButton></TableRowColumn>
              </TableRow>
            ))}
            </TableBody>
          </Table>
          <div>
          <Pager>
            <Pager.Item onClick={this.handlePreClick.bind(this)}>Previous</Pager.Item>{' '}
            <Pager.Item onClick={this.handleNexClick.bind(this)}>Next</Pager.Item>
          </Pager>
          </div>
          <Link to="/admin/newtag">新規タグ追加</Link>
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
      getCircle:(page) => {
        dispatch(adminGetCircle(page))
      },
      DeleteCircle:(id)=>{
        dispatch(adminDeleteCircle(id))
      },
      adminCircleSearch:(url)=>{
        dispatch(adminCircleSearch(url))
      }
    }
  }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
