import React,{Component} from 'react'
import {circleImage} from '../../actions/index'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
class CircleImage extends Component{

  constructor(props){
    super(props)
    this.state={image:""}
  }

  handleSubmit(e){
    e.preventDefault();
    const id = this.props.match.params.id
    this.props.CircleImage(this.state.image,id)
    this.props.history.push('/')

  }

  handleChange(e){
    e.preventDefault();
    console.log(e.target.files[0])
    this.setState({image:e.target.files[0]})
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="file" onChange={this.handleChange.bind(this)}/>
        <button type="submit">送信</button>
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
      CircleImage:(image,id)=>{
        dispatch(circleImage(image,id))
      }
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CircleImage))
