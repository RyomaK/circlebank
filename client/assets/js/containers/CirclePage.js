import React,{ Component } from 'react'
import Circle from '../components/Circle'
import Events from '../components/Events'
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'
import { Link, withRouter} from 'react-router-dom'

class CirclePage extends Component {


  render(){
    const style = {
      width: '100%',
      padding: 30,
      
      display: 'inline-block',
    };
    return(
      <div>
        <Paper style = {style} className="paper" zDepth={3}>
          <Circle circle={this.props.circle}/>
        </Paper>
        <Events events={this.props.events}/>
      </div>
    )
  }
}
const mapStateToProps = state => {
console.log(state)
  return{
    circle: state.circle.circle,
    events: state.circle.events
  }
}

const mapDispatchToProps = dispatch => {
  return{

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CirclePage))
