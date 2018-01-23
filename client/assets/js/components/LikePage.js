import React, {Component} from "react"
import { comment,getComment} from '../actions/index'
import {FormControl,Grid,Col,Button,Table} from "react-bootstrap"
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

class LikePage extends Component{

  handleClick(event,id,name){

    console.log(this.props)
    event.preventDefault();
    this.props.history.push(`/user/${id}/${name}/comment`);

  }

  render(){
    return(
      <div>
      <div className="centerPosition">
      <h1>お気に入りサークル一覧</h1>
      </div>
      <div className="mypage fontChange">
      {this.props.like.map((like) => {
          return(
            <div key={like.circle.id} className="favoPage" >
              <div>
              {like.circle.name}
              <span className="floatright"><Button bsStyle="primary" onClick={(event)=>this.handleClick(event,like.circleId.id,like.circle.url_name)}>コメントを書く</Button></span>

              </div>
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
    like: state.like.circle,
    comment: state.comment.comment
  }
}
const mapDispatchToProps = dispatch => {
  return{
    comment:(circleName,circle_id,text) => {
      dispatch(comment(circleName,circle_id,text))
    },
    getComment:(name)=>{
      dispatch(getComment(name))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LikePage))
