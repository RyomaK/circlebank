import React, {Component} from "react"
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

class UserEventPage extends Component{
  handleClick(event,id,name){
    event.preventDefault();
    this.props.history.push(`/user/${id}/${name}/comment`);
  }
  render(){
    const events = this.props.events.sort((a,b)=>{
      return a.agenda > b.agenda
    })
    return(
      <div>
        <h3>イベント一覧</h3>
        <div>
          {events.map((eve)=>{
              const date = eve.agenda.split("-")
              const month = date[1];
              const day = date[2].split("T")
              return(
                <div key={eve.id}>{`${month}月${day[0]}日 ${eve.name}`}</div>
              )
          }
          )
        }</div>

      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    events:state.userEvent.events
  }
}
const mapDispatchToProps = dispatch => {
  return{

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserEventPage))
