import React,{Component} from 'react'

class Events extends Component{
  render(){
    return(
      <div>
      {this.props.events.map(eve=>{
        return(
          <div key={eve.id}>{eve.name}</div>
        )

      })}
      </div>
    )

  }
}

export default Events
