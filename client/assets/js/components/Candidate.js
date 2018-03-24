import React, {Component} from "react"
import Search from 'material-ui/svg-icons/action/search';
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
    const iconStyles = {
            marginRight:10,
          };
    return(
      <div className="candidate">
      {this.props.item.map((circle)=>{
        return(
          <div key={circle.id} onClick={(event)=>this.handleClick(event,circle.url_name)}>
            <h4><Search style={iconStyles}/><span>{circle.name}</span></h4>
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
