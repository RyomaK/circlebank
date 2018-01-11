import React ,{ Component }from 'react'
import { getUserInfo } from '../actions/index'
import {connect} from 'react-redux'

class UserBox extends Component{
  componentWillMount(){
    this.props.getUser()
  }
  render(){
  return(
    <div>
      <ul>
        <li>名前:</li>
        <li>学部:</li>
        <li>学科:</li>
      </ul>
    </div>
  )
}
}

const mapStateToProps = state => {
  return{
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return{
    getUser: () => {
      dispatch(getUserInfo())
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBox)
