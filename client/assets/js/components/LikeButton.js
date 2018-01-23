import React, {Component} from 'react'
import { connect } from 'react-redux'
import { like, deletelike } from '../actions/index'
import {Button } from 'react-bootstrap'

class LikeButton extends Component{

  constructor(props){
    super(props)
    this.state = {
      like:false
    }
  }
  handleClick1(e){
    e.preventDefault()
    this.props.Delete(this.props.id);
  }

  handleClick2(e){
    e.preventDefault();
    this.props.Like(this.props.id);
  }
  render(){
    let count = 0;
    this.props.like.map((like)=>{
      console.log(like)
      if(like.circle.id == this.props.id){
        count++;
      }else{
      }
    })
    if(count == 0){
        return(
          <Button onClick={this.handleClick2.bind(this)} bsStyle="info">お気に入り登録</Button>
        )
      }else{
        return(
          <Button onClick={this.handleClick1.bind(this)} bsStyle="danger">お気に入り解除</Button>
        )
    }
}}

const mapStateToProps = state => {
  return{
    like: state.like.circle
  }
}
const mapDispatchToProps = dispatch => {
  return{
    Like:(id)=>{
      dispatch(like(id))
    },
    Delete:(id)=>{
      dispatch(deletelike(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps

)(LikeButton)
