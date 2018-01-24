import React, {Component} from "react"
import { comment,getComment} from '../actions/index'
import {FormControl,Grid,Col,Button,Table} from "react-bootstrap"
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

class LikePage extends Component{

  handleClick(event,id,name){
    event.preventDefault();
    this.props.history.push(`/user/${id}/${name}/comment`);

  }

  render(){
    return(
      <div>
      <div className="centerPosition">
      <h3>お気に入りサークル一覧</h3>
      </div>
      <div className="fontChange">
      {this.props.like.map((like) => {
          return(
            <div key={like.circle.id} className="favoPage mypage " >
              <div>
              <div className="commentbox">
              {like.circle.name}<span className="floatright"><Button className="buttonsize" bsStyle="primary" onClick={(event)=>this.handleClick(event,like.circle.id,like.circle.url_name)}>編集</Button></span>
              </div>
              <div>
              {like.comment.text.String}
              </div>


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
