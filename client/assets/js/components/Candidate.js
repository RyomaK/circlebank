import React, {Component} from "react"
import {Col} from "react-bootstrap"
import {Link} from 'react-router-dom'
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'
const Candidate = (items) => {
  const item = items.item
  console.log(item)
  return(
    <div className="candidate">
    {item.map((circle)=>{
      return(
        <div key={circle.id}>
          <Link to={`circle/search/${circle.url_name}`}><h4>{circle.name}</h4></Link>
        </div>
      )
    })}
    </div>
  )
}
const mapStateToProps = state => {
  return{
    isLogin: state.loginCheck.isLogin
  }
}
export default connect(
  mapStateToProps
)(Candidate)
