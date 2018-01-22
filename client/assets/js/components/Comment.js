import React,{Component} from 'react'
import { comment, deleteComment } from '../actions/index'
import { FormControl, Button, Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

class Comment extends Component{

  constructor(props) {
    super(props);
    this.state = {input: ""};
  }

handleSubmit(event){
  event.preventDefault();
  const id = this.props.match.params.id;
  const name = this.props.match.params.name;
  this.props.deleteComment(name,id);
  this.props.comment(name,id,this.state.input);
  this.props.history.push('/user');
}

handleChange(e){
    e.preventDefault();
    this.setState({input:e.target.value})
}

  render(){
    return(
      <div>
      <h1>サークルメモ</h1>
      <form onSubmit = {this.handleSubmit.bind(this)}>
        <Col xs={7} xsOffset={1}>
        <FormControl
          type="text"
          placeholder="コメントを追加してください"
          onChange = {this.handleChange.bind(this)}
          className="search1"
          />
          </Col>
        <Button type="submit">追加</Button>
      </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    state
  }
}
const mapDispatchToProps = dispatch => {
  return{
    comment:(circleName,circle_id,text) => {
      dispatch(comment(circleName,circle_id,text))
    },
    deleteComment:(circleName,id) => {
      dispatch(deleteComment(circleName,id))
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment))
