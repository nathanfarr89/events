import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const UserForm = ({ action, formType }) => {
  const [values, setValues] = useState()

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.type]: e.target.value
    })
  }

  return (
    <Container className="p-4">
      {formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
      <Form
        onSubmit={event => {
          event.preventDefault()
          action({
            variables: {
              email: values.email,
              username: values.text,
              password: values.password
            }
          })
        }}
      >
        {formType === 'signup' &&
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" onChange={onChange} />
          </Form.Group>
        }
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={onChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={onChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default UserForm
