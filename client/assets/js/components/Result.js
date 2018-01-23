import React,{ Component }from 'react'
import { circleSearchAll } from '../actions/index'
import { connect } from 'react-redux'
import ResultPage from './ResultPage'


class Result extends Component{
  componentDidMount(){
    this.props.onCircleSearch()
  }

  render(){
    return(
      <div>
        {this.props.circles.map(circle => (<ResultPage key={circle.id} circle={circle}/>))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    circles: state.search.circles,
  }
}

const mapDispatchToProps= dispatch => {
  return{
    onCircleSearch: () => {
      dispatch(circleSearchAll())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result)
