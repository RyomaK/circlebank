import React ,{ Component }from 'react'
import {Row,Col} from "react-bootstrap"
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

        <Col xs={11} smOffset={3} sm={6}>

          <Paper style = {style} zDepth={3}>
            <h4>アカウント作成</h4>
            <SignupForm/>
          </Paper>

        </Col>

      </div>
    )
  }
}

export default SignupPage
