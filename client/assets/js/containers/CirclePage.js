import React,{ Component } from 'react'
import Circle from '../components/Circle'
import Events from '../components/Events'
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'
import { Link, withRouter} from 'react-router-dom'
import {Grid,Col} from "react-bootstrap"

class CirclePage extends Component {


  render(){
    const style = {
      width: '100%',
      paddingBottom: '20px',
      textAlign: 'center',
      display: 'inline-block',
    }
    return(
      <div>
        <div className="leftside">
          <Paper style = {style} zDepth={3}>
            <Circle circle={this.props.circle}/>
          </Paper>
          <Events events={this.props.events}/>
        </div>
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


export default withRouter(connect(mapStateToProps)(CirclePage))
