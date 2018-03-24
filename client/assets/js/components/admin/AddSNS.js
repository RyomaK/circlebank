import React,{Component} from 'react'
import {circleSearch,sns,deletesns} from '../../actions/index'
import {withRouter} from 'react-router-dom'
import {Col,Form,FormGroup,FormControl} from "react-bootstrap"
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
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'
class AddSNS extends Component{

  constructor(props){
    super(props)
    this.state={value1:{
      id:'',
      sns:''
    }

      }
  }
  componentDidMount(){
    const url = this.props.match.params.name
    this.props.circleSearch(url)
  }
  handleSubmit(e){
    e.preventDefault();
    const id = this.props.match.params.id
    let data = []
    data = data.concat(this.state.value1)
    this.props.getsns(data,id)
    this.props.history.push('/admin')
  }
  handleClick(e){
    e.preventDefault()
    const id = this.props.match.params.id
    const box = [{circle_id:String(id),sns:this.props.snsname[0].sns}]
    this.props.deletesns(box,id)
    this.props.history.push('/admin')
  }
  handleChange(e){
    const id = this.props.match.params.id
    this.setState({value1:{id:String(id),sns:e.target.value}})
  }


  render(){
    return(
      <Col smOffset={1} sm={10} className="whitePage">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <Col sm={12}>
              <h3>SNS追加</h3>
              <TextField
              name = "text"
              type = "text"
              floatingLabelText="sns"
              floatingLabelFixed={true}
              fullWidth={true}
              onChange={this.handleChange.bind(this)}
              />
            </Col>
            <Col sm={12}>
            <br/>
              <FlatButton type="submit">登録</FlatButton>
            </Col>
            <br/>
          </form>
          <Col sm={12}>
          <h3>登録済み</h3>
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow >
                <TableHeaderColumn>SNS</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            {this.props.snsname.map( (sns,index)=> (
              <TableRow key={index}>
                <TableRowColumn>{sns.sns}</TableRowColumn>
                <TableRowColumn><FlatButton onClick={this.handleClick.bind(this) }>削除</FlatButton></TableRowColumn>
              </TableRow>
            ))}
            </TableBody>
          </Table>
          </Col>
      </Col>
    )
  }
}

const mapStateToProps = state => {
  return{
    snsname:state.circle.sns
  }
}
const mapDispatchToProps = dispatch => {
  return{
      circleSearch:(url) => {
        dispatch(circleSearch(url))
      },
      getsns:(data,id) => {
        dispatch(sns(data,id))
      },
      deletesns:(data,id) => {
        dispatch(deletesns(data,id))
      }
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSNS))
