import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {adminGetCircle,adminDeleteCircle} from '../../actions/index'

class Home extends Component{
  componentDidMount(){

    this.props.getCircle();
  }
  handleClick(event,id){
    event.preventDefault();
    this.props.history.push(`/admin/add/${id}/event`)

  }
  handleClick1(event,id){
    event.preventDefault();
    this.props.DeleteCircle(id)
    this.props.history.push(`/`)

  }
  render(){
    console.log(this.props)
    return(
        <div>
        {this.props.circles.map( circle => (
          <div key={circle.id}>
            <h3>{circle.name}</h3>
            <Button onClick={(event)=>this.handleClick(event,circle.id)}>イベント追加</Button>
            <Button onClick={(event)=>this.handleClick1(event,circle.id)}>削除</Button>

          </div>
        ))}

        <Link to="/admin/circle">サークルを追加する</Link>


        </div>
      )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return{
    circles: state.adminCircle.circle
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
