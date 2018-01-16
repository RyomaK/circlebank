import React, {Component} from 'react'
import { Col,Row } from 'react-bootstrap'
import Menu from './Menu'

class NotFound extends Component{
  render(){
    return(
      <div>
        <Row>
          <Menu/>
          <Col sm={9} className="paper">
            <h1>Not Found</h1>
          </Col>
        </Row>
      </div>
    )
  }
}

export default NotFound
