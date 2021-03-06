import React,{Component} from 'react'
import {Table} from 'react-bootstrap'

class Events extends Component{
  render(){
    return(
      <div className="madin">
      <Table className="whitePage">
      {this.props.events.map(eve=>{
        const date = eve.agenda.split("-")
        const month = date[1];
        const day = date[2].split("T")
        return(
          <tbody key={eve.id}>
            <tr>
              <td width="50%">イベント名</td>
              <td width="50%">{eve.name}</td>
            </tr>
            <tr>
              <td>日付</td>
              <td>{`${month}月${day[0]}日`}</td>
            </tr>
          </tbody>
        )
      })}
      </Table>
      </div>
    )
  }
}
export default Events
