import React, {Component} from "react"
import {Col} from "react-bootstrap"
import {Link,withRouter} from 'react-router-dom'
import {circleSearch,SearchReset} from '../actions/index'
import { connect } from 'react-redux'
class Candidate extends Component{
  handleClick(event,url){
    event.preventDefault()
    this.props.circleSearch(url)
    this.props.SearchReset()
    this.props.history.push(`/circle/search/${url}`)
  }
  render(){
    return(
      <div className="candidate">
      {this.props.item.map((circle)=>{
        return(
          <div key={circle.id} onClick={(event)=>this.handleClick(event,circle.url_name)}>
            <h4>{circle.name}</h4>
          </div>
        )
      })}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{

  }
}
const mapDispatchToProps= dispatch => {
  return{
    circleSearch: word => {
      dispatch(circleSearch(word))
    },
    SearchReset:()=>{
      dispatch(SearchReset())
    },
    SearchReset:()=>{
      dispatch(SearchReset())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Candidate))
