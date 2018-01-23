import React, {Component} from 'react'
import { Col,Row } from 'react-bootstrap'
import Menu from './Menu'

class NotFound extends Component{
  render(){
    return(
      <div>
          <Menu/>
          <Col xs={12} sm={8} className="paper">

            <h1>Not Found</h1>
          </Col>
      </div>

    )
  }
}


export default NotFound
