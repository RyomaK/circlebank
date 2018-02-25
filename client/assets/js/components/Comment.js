import React,{Component} from 'react'
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { comment, deleteComment } from '../actions/index'
import { FormControl,Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import Menu from './Menu'

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
        <Col sm={3} className="reset" xsHidden>
          <Menu/>
        </Col>
        <Col sm={9}>
          <Paper zDepth={1} className="padZero">
            <form onSubmit = {this.handleSubmit.bind(this)}>
              <div className="commentbox">
                <span className="fontChange2 posi">サークルメモ</span>
                <span className="floatright"><FlatButton type="submit" style={{color:'white'}}>追加</FlatButton></span>
              </div>
            <div className="favoPage" >
              <FormControl
                componentClass="textarea"
                placeholder="コメントを追加してください"
                onChange = {this.handleChange.bind(this)}
                className="search1"
                rows={5}
                />
            </div>
          </form>
          </Paper>
        </Col>
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
