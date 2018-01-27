import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {Button,Col} from 'react-bootstrap'
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
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

  handleClick2(event,id){
    event.preventDefault();
    this.props.history.push(`/admin/image/circle/${id}`)
  }
  render(){
    return(
        <div>
        <Col smOffset={2} sm={8}>
        <h1>サークル一覧</h1>

        {this.props.circles.circle.map( circle => (
          <Paper zDepth={1} key={circle.id} className="padZero">
            <div className="commentbox">
            <Link to={`/admin/circle/${circle.url_name}`}　 style={{ textDecoration: 'none' ,color:'white'}}><span className="fontSizeChange">{circle.name}</span></Link>
              <span className="floatright">
              <FlatButton onClick={(event)=>this.handleClick2(event,circle.id)} >サークル画像追加</FlatButton>

              <FlatButton onClick={(event)=>this.handleClick(event,circle.url_name)} >イベント編集</FlatButton>
              <FlatButton onClick={(event)=>this.handleClick1(event,circle.id,circle.url_name)} >削除</FlatButton>
              </span>
            </div>
            <div className="eventbox">
              <p>サークル種類</p>
              <p>{circle.introduction}</p>
            </div>
          </Paper>
        ))}
        <Link to="/admin/add/circle">サークルを追加する</Link>
        </Col>
        </div>
      )
  }
}

const  mapStateToProps = state => {

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
