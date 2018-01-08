import React from 'react'
import {Col,Form,FormGroup,FormControl,Button} from "react-bootstrap"

const SignupForm = () => {
  return(
    <Form horizontal>
		<FormGroup>
			<Col sm={2}>
				大学
			</Col>
			<Col sm={10}>
				<FormControl type="text" placeholder="同志社" />
			</Col>
		</FormGroup>

    <FormGroup>
			<Col sm={2}>
				名前
			</Col>
			<Col sm={10}>
				<FormControl type="text" placeholder="Name" />
			</Col>
		</FormGroup>

    <FormGroup>
			<Col sm={2}>
				Email
			</Col>
			<Col sm={10}>
				<FormControl type="mail" placeholder="Email" />
			</Col>
		</FormGroup>

    <FormGroup>
			<Col sm={2}>
				性別
			</Col>
			<Col sm={10}>
				<FormControl type="text" placeholder="sex" />
			</Col>
		</FormGroup>

    <FormGroup>
			<Col sm={2}>
				学部
			</Col>
			<Col sm={10}>
				<FormControl type="text" placeholder="department" />
			</Col>
		</FormGroup>

    <FormGroup>
			<Col sm={2}>
				学科
			</Col>
			<Col sm={10}>
				<FormControl type="text" placeholder="subject" />
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
				<Button type="submit">Sign Up</Button>
			</Col>
		</FormGroup>
	</Form>
  )
}

export default SignupForm
