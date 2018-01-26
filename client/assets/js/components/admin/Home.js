import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {adminGetCircle,adminDeleteCircle} from '../../actions/index'

class Home extends Component{
  componentDidMount(){

    this.props.getCircle();
  }
  handleClick(event,name){
    event.preventDefault();
    this.props.history.push(`/admin/event/${name}`)

  }
  handleClick1(event,id,name){
    event.preventDefault();
    this.props.DeleteCircle(id)
    this.props.history.push(`/admin/delete/${name}`)

  }
  render(){

    return(
        <div>
        {this.props.circles.circle.map( circle => (
          <div key={circle.id}>
            <Link to={`/admin/circle/${circle.url_name}`}><h3>{circle.name}</h3></Link>
            <Button onClick={(event)=>this.handleClick(event,circle.url_name)}>イベント編集</Button>
            <Button onClick={(event)=>this.handleClick1(event,circle.id,circle.url_name)}>削除</Button>

          </div>
        ))}

        <Link to="/admin/add/circle">サークルを追加する</Link>


        </div>
      )
  }
}

const mapStateToProps = state => {
  return{
    circles: state.adminCircle
  }
}
const mapDispatchToProps = dispatch => {
  return{
      getCircle:() => {
        dispatch(adminGetCircle())
      },
      DeleteCircle:(id)=>{
        dispatch(adminDeleteCircle(id))
      }
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
