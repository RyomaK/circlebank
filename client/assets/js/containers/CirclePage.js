import React,{ Component } from 'react'
import Circle from '../components/Circle'
import Menu from '../components/Menu'
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'
import { Link, withRouter} from 'react-router-dom'
import {circleSearch} from '../actions/index'
import {Col} from "react-bootstrap"

class CirclePage extends Component {
  componentDidMount(){
    const name = this.props.match.params.name;
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
          <Col sm={3} xsHidden className="reset">
            <Menu/>
          </Col>
          <Col sm={9} className="circlePage">
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
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CirclePage)
