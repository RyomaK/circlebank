import React from 'react'
import {Col,Form,FormGroup,FormControl,Button} from "react-bootstrap"

const LoginForm = () => {
  return(
    <Form horizontal>
		<FormGroup>
			<Col sm={2}>
				Email
			</Col>
			<Col sm={10}>
				<FormControl type="email" placeholder="Email" />
			</Col>
		</FormGroup>

		<FormGroup>
			<Col sm={2}>
				Password
			</Col>
			<Col sm={10}>
				<FormControl type="password" placeholder="Password" />
			</Col>
		</FormGroup>
		<FormGroup>
			<Col smOffset={2} sm={10}>
				<Button type="submit">Sign in</Button>
			</Col>
		</FormGroup>
	</Form>
  )
}

export default LoginForm
