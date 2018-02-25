import React, { Component } from 'react'
import { connect } from 'react-redux'
import {ImageUpload,setImage} from '../actions/index'

class ImageUp extends Component{
  handleSubmit(e){
    e.preventDefault();
    console.log(this.props.image)
    this.props.ImageUp(this.props.image);
  }
  handleChange(e){
    e.preventDefault();
    this.props.ImageSet(e.target.files[0])
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="file" onChange={this.handleChange.bind(this)}/>
          <button type="submit">aaaa</button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    image: state.image.image
  }
}
const mapDispatchToProps = dispatch => {
  return{
      ImageUp: image => {
        dispatch(ImageUpload(image))
      },
      ImageSet: image => {
        dispatch(setImage(image))
      }
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageUp)
