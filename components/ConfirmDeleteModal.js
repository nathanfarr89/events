import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useMutation } from '@apollo/client'

import { GET_EVENTS } from '../gql/query'
import { DELETE_EVENT } from '../gql/mutation'

const ConfirmDeleteModal = ({ setShow, show, eventId }) => {
  const [values, setValues] = useState({})
  const handleClose = () => setShow(false);
  const [deleteEvent, { data, loading, error }] = useMutation(DELETE_EVENT, {
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
          <Modal.Title>Are you sure you want to delete event?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={event => {
              event.preventDefault()
              deleteEvent({
                  variables: {
                    id: eventId,
                }
              })
            }}
          >
            <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="ml-4" variant="danger" type="submit">
            Delete
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConfirmDeleteModal
