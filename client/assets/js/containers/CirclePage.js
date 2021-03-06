import React,{ Component } from 'react'
import Circle from '../components/Circle'
import Menu from '../components/Menu'
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'
import { Link, withRouter} from 'react-router-dom'
import {circleSearch,SearchReset} from '../actions/index'
import {Col} from "react-bootstrap"

class CirclePage extends Component {
  componentWillMount(){
    const name = this.props.match.params.name;
    this.props.SearchReset()
    this.props.circleSearch(name)
  }
  render(){
    const style = {
      width: '100%',
      paddingBottom: '20px',
      textAlign: 'center',
      display: 'inline-block',
    }
    return(
      <div>
          <Col smOffset = {2} sm={8} className="circlePage">
            <Circle circle={this.props.circle}/>
          </Col>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    circle: state.circle.circle,
    events: state.circle.events
  }
}
const mapDispatchToProps= dispatch => {
  return{
    circleSearch: word => {
      dispatch(circleSearch(word))
    },
    SearchReset:()=>{
      dispatch(SearchReset())
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CirclePage)
