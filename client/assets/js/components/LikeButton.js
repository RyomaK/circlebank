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

  componentWillMount(){
      this.props.like.map((like)=>{
        if(this.state.like.id == this.props.id){
          this.setState({like:true})
        }
      })
  }
  handleClick(e){
    e.preventDefault()
    if(this.state.like==false){

        this.setState({like:true})
        console.log(this.state)
        this.props.Delete(this.props.id)
        console.log("unfavo")
    }else{
      this.setState({like:false})
      console.log(this.state)
      this.props.Like(this.props.id)
      console.log("favo")

    }

  }
  render(){

    return(
      <div>
        <Button onClick={this.handleClick.bind(this)}>aa</Button>
      </div>
    )
  }
}

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
