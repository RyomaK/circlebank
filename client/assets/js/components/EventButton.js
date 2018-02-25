import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addEvent,deleteEvent } from '../actions/index'
import { Button } from 'react-bootstrap'

class EventButton extends Component{
  constructor(props){
    super(props)
    this.state = {
      go:false
    }
  }
  handleClick1(e){
    e.preventDefault()
    this.props.Delete(this.props.id);
  }
  handleClick2(e){
    e.preventDefault();
    this.props.Add(this.props.id);
  }
  render(){
    let count = 0;
    this.props.events.map((eve)=>{
      if(eve.id == this.props.id){
        count++;
      }else{
      }
    })
    if(count==0){
        return(
          <Button onClick={this.handleClick2.bind(this)} bsStyle="info">追加</Button>
        )
      }else{
        return(
          <Button onClick={this.handleClick1.bind(this)} bsStyle="danger">解除</Button>
        )
    }
}}
const mapStateToProps = state => {
  return{
    events:state.userEvent.events
  }
}
const mapDispatchToProps = dispatch => {
  return{
    Add:(id)=>{
      dispatch(addEvent(id))
    },
    Delete:(id)=>{
      dispatch(deleteEvent(id))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventButton)
