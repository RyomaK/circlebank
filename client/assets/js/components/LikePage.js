import React, {Component} from "react"
import { comment,getComment} from '../actions/index'
import Paper from 'material-ui/Paper';
import {FormControl,Grid,Col,Button,Table} from "react-bootstrap"
import FlatButton from 'material-ui/FlatButton';
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
      <div className="fontChange">
      {this.props.like.map((like) => {
          return(
            <Paper zDepth={1}  key={like.circle.id} className="padZero">
              <div>
              <div className="commentbox">
              <span className="fontChange2 posi">{like.circle.name}</span><span className="floatright"><FlatButton style={{color:'white'}} onClick={(event)=>this.handleClick(event,like.circle.id,like.circle.url_name)}>編集</FlatButton></span>
              </div>
              <div className="favoPage" >
              <p>メモ枠</p>
              <div>
              {like.comment.text.String.split('\n').map((message,i)=>{

                return(

                  <p className="heightPosi" key={i}>{message}</p>
                )

              })}
              </div>
              </div>
            </div>
            </Paper>
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
