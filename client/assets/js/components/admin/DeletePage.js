import React,{Component} from 'react'
import {Link} from 'react-router-dom'
class DeletePage extends Component{
  render(){
    return(
      <div>
        <h1>{`${this.props.match.params.name}を削除しました`}</h1>
        <Link to={'/admin'}><h3>トップページに戻る</h3></Link>
      </div>
    )
  }
}
export default DeletePage
