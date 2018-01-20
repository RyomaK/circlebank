import React ,{ Component }from 'react'
import {Grid,Col} from "react-bootstrap"
import Paper from 'material-ui/Paper';
import SignupForm from '../containers/SignupForm'

class SignupPage extends Component{
  render(){
    const style = {
      width: '100%',
      padding: 30,
      marginTop:100,

      position: 'absolute',
      display: 'inline-block',
    };
    return(
      <div className="log">
        <Grid>
        <Col smOffset={3} sm={6}>
          <Paper style = {style} className="login_up" zDepth={3}>
            <h4>アカウント作成</h4>
            <SignupForm/>
          </Paper>
        </Col>
        </Grid>
      </div>
    )
  }
}

export default SignupPage
