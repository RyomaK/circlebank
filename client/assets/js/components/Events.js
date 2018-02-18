import React,{Component} from 'react'
import {Table} from 'react-bootstrap'
import EventButton from './EventButton'

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
              <td width="50%">{eve.name}<EventButton id={eve.id} /></td>
            </tr>
            <tr>
              <td>日付</td>
              <td>{`${month}月${day[0]}日`}</td>
            </tr>
            <tr>
              <td>場所</td>
              <td>{eve.place}</td>
            </tr>
            <tr>
              <td>詳細</td>
              <td>{eve.detail}</td>
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
