import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {adminGetEvent,adminDeleteEvent} from '../../actions/index'

class adminEventPage extends Component{
  componentDidMount(){
    const name = this.props.match.params.name
    this.props.getEvent(name);
  }
  handleClick1(event,circle_id,event_id,name,circle_name){
    event.preventDefault();
    this.props.adminDeleteEvent(circle_id,event_id,name)
    this.props.history.push(`/admin/delete/${circle_name}`)
  }
  handleClick(event,circle_id){
    event.preventDefault();
    this.props.history.push(`/admin/add/event/${circle_id}`)

  }
  render(){

    return(

        <div>
          <h3>{`${this.props.circle.name}のイベント`}</h3>
          <Button　onClick={(event)=>this.handleClick(event,this.props.circle.id)}>イベントを追加する</Button>
          {this.props.events.map( eve => (
            <div key={eve.id}>
              <Link to={`/`}><h3>{eve.name}</h3></Link>
              <Button onClick={(event)=>this.handleClick(event,eve)}>編集</Button>
              <Button onClick={(event)=>this.handleClick1(event,this.props.circle.id,eve.id,this.props.circle.url_name,this.props.circle.name)}>削除</Button>
              </div>
            ))}
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
      getEvent:name => {
        dispatch(adminGetEvent(name))
      },
      adminDeleteEvent:(circle_id,event_id,name) => {
        dispatch(adminDeleteEvent(circle_id,event_id,name))
      }
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(adminEventPage))
