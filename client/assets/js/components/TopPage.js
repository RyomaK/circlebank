import React from "react"
import { Grid, Col, Row, Button,ButtonToolbar,Jumbotron } from 'react-bootstrap';




const TopPage = () => {
  return(
    <div className="top">
  <Grid>
        <p>トップページ</p>
        <p><Button bsStyle="success" bsSize="large">Sign Up</Button>
        <span></span>
        <Button bsStyle="info"bsSize="large" >Log In</Button></p>
  </Grid>
  </div>
)
}

export default TopPage;
