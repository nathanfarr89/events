import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useMutation } from '@apollo/client'

import { GET_EVENTS } from '../gql/query'
import { EDIT_EVENT } from '../gql/mutation'

const EditItemModal = ({ setShow, show, eventId }) => {
  const [values, setValues] = useState({ date: null })
  const handleClose = () => setShow(false);
  const [editEvent, { loading, error }] = useMutation(EDIT_EVENT, {
    refetchQueries: [{ query: GET_EVENTS}],
    onCompleted: () => handleClose() 
  })
  

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.type]: e.target.value
    })
  }

  if (loading) return null
  if (error) return <p>Error!</p>

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={event => {
              event.preventDefault()
              editEvent({
                  variables: {
                    id: eventId,
                    release: values['date']
                }
              })
            }}
          >
            <Form.Group className="mb-3" controlId="formEventDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="event date" placeholder="Date of Event" onChange={onChange} />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={values.date === null} className="ml-4" variant="primary" type="submit">
            Edit
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditItemModal
