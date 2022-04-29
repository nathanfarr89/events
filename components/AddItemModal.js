import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useMutation } from '@apollo/client'

import { GET_EVENTS } from '../gql/query'
import { NEW_EVENT } from '../gql/mutation'

const AddItemModal = ({ setShow, show }) => {
  const [values, setValues] = useState({
    "text": null,
    "select-one": null,
    "date": null
  })
  console.log('values', values)
  const handleClose = () => setShow(false);
  const [addEvent, { loading, error }] = useMutation(NEW_EVENT, {
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
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={event => {
              event.preventDefault()
              addEvent({
                  variables: {
                    name: values['text'],
                    type: values['select-one'],
                    release: values['date']
                }
              })
            }}
          >
            <Form.Group className="mb-3" controlId="formEventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control type="text" placeholder="Enter event" onChange={onChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEventDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="event date" placeholder="Date of Event" onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Category</Form.Label>
              <Form.Select aria-label="event-select" onChange={onChange}>
                <option>Select Event Category</option>
                <option value="PS5">PS5</option>
                <option value="Switch">Switch</option>
                <option value="XBOX">XBOX</option>
                <option value="Movie">Movie</option>
                <option value="TV">TV</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={values['text'] === null || values['select-one'] === null || values['date'] === null} className="ml-4" variant="primary" type="submit">
            Add Event
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddItemModal
