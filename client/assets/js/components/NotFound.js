import React, {Component} from 'react'
import { Col,Row } from 'react-bootstrap'
import Menu from './Menu'

class NotFound extends Component{
  render(){
    return(
      <div>
          <Menu/>
          <Col sm={9} className="notFound">
            <h1>Not Found</h1>
          </Col>
      </div>

    )
  }
}

export default NotFound
