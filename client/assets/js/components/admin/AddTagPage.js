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
import AddTag from './AddTag'
import {Button,Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {tagSearchStart,deleteTag} from '../../actions/index'

class AddTagPage extends Component{
  componentDidMount(){
    this.props.getTag()
  }
  handleClick(event,tag_id,tag_name){
    event.preventDefault()
    const data = [{id:tag_id,
    name:tag_name}]
    this.props.deleteTag(data)
    this.props.history.push(`/admin`)
  }

  render(){
    return(
        <div>
          <Col smOffset={1} sm={9} className="whitePage">
            <AddTag/>
          </Col>
          <Col smOffset={1} sm={9} className="whitePage">
            <h3>登録済みのタグ</h3>
            <Table>
              <TableHeader displaySelectAll={false}>
                <TableRow >
                  <TableHeaderColumn>運動</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.props.tags[0].tags.map( tag => (
                  <TableRow key={tag.id}>
                    <TableRowColumn>{tag.name}</TableRowColumn>
                    <TableRowColumn><FlatButton onClick={(event)=>this.handleClick(event,tag.id,tag.name)}>削除</FlatButton></TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Table>
              <TableHeader displaySelectAll={false}>
                <TableRow >
                  <TableHeaderColumn>文化</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.props.tags[1].tags.map( tag => (
                  <TableRow key={tag.id}>
                    <TableRowColumn>{tag.name}</TableRowColumn>
                    <TableRowColumn><FlatButton onClick={(event)=>this.handleClick(event,tag.id,tag.name)}>削除</FlatButton></TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Table>
              <TableHeader displaySelectAll={false}>
                <TableRow >
                  <TableHeaderColumn>その他</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.props.tags[2].tags.map( tag => (
                  <TableRow key={tag.id}>
                    <TableRowColumn>{tag.name}</TableRowColumn>
                    <TableRowColumn><FlatButton onClick={(event)=>this.handleClick(event,tag.id,tag.name)}>削除</FlatButton></TableRowColumn>
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

  return{
    circle: state.circle.circle,
    events: state.circle.events,
    tags: state.allTagSearch.tags
  }
}
const mapDispatchToProps = dispatch => {
  return{
      getTag:()=>{
        dispatch(tagSearchStart())
      },
      deleteTag:(data)=>{
        dispatch(deleteTag(data))
      }

    }
  }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTagPage))
