import React, {Component} from 'react'
import { connect } from 'react-redux'
import { like deletelike } from '../actions/index'

class LikeButton extends Component{
  constructor(props){
    super(props)
    this.state = {like: false};
  }
  handleClick(){
    
  }

  render(){
    return(
      <div>
        <input type="button" onClick={this.handleClick.bind(this)}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    id: state.circle.circle.id
  }
}
const mapDispatchToProps = dispatch => {
  return{
    Like:(id)=>{
      dispatch(deletelike(id))
    },
    Delete:(id)=>{
      dispatch(deletelike(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps

)(LoginPage)
