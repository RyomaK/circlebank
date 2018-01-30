import React ,{ Component }from 'react'
import {Row,Col} from "react-bootstrap"
import Paper from 'material-ui/Paper';
import SignupForm from '../containers/SignupForm'

class SignupPage extends Component{
  render(){
    const style = {
      width: '100%',
      padding: 30,


      position: 'absolute',
      display: 'inline-block',
    };
    return(
      <div >

        <Col xs={11} smOffset={3} sm={6}>
          <div className="topmargin">
          <Paper style = {style} zDepth={3}>
            <h4>アカウント作成</h4>
            <SignupForm/>
          </Paper>
          </div>
        </Col>

      </div>
    )
  }
}

export default SignupPage
