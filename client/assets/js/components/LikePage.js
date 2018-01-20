import React, {Component} from "react"

import {Grid,Col,Button,Table} from "react-bootstrap"
import { connect } from 'react-redux'

class LikePage extends Component{

  render(){
    return(
      <div>
      <h1>お気に入りサークル一覧</h1>
      <div className="mypage fontChange">
      {this.props.like.map((like) => {

          return(
            <div key={like.id} className="favoPage">
            {like.name}<span className="floatright"><Button bsStyle="primary">編集</Button></span>
            </div>
          )
      })}
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    like: state.like.circle
  }
}
const mapDispatchToProps = dispatch => {
  return{
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikePage)
