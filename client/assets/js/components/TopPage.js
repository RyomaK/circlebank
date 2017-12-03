import React from "react"
import { Grid, Col, Row, Button,ButtonToolbar } from 'react-bootstrap';

const style = {
  margin: 12,
};

const TopPage = () => {
  return(
  <Grid>
    <Row><Col md={6} mdOffset={3}>トップページ</Col></Row>
    <Row><Col md={6} mdOffset={3}>
      <ButtonToolbar>
        <Button bsStyle="success">Sign Up</Button>
        <Button bsStyle="info">Log In</Button>
      </ButtonToolbar>
    </Col></Row>
  </Grid>
)
}

export default TopPage;
