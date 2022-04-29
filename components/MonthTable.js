import React, { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge'
import CloseButton from 'react-bootstrap/CloseButton'
import AddItemModal from './AddItemModal'
import EditItemModal from './EditItemModal'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { Plus, Pencil, Trash  } from 'react-bootstrap-icons';

const MonthTable = ({ data}) => {
  if (data.events.length < 1) return null
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => setShowAdd(true);

  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const handleShowEdit = (id) => {
    setShowEdit(true);
    setEditId(id)
  }

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleShowDelete = (id) => {
    setShowDelete(true);
    setDeleteId(id)
  }

  const renderBadge = (category) => {
    switch(category) {
      case 'PS5':
        return <Badge bg="primary">PS5</Badge>
      case 'Switch':
        return <Badge pill bg="danger">Switch</Badge>
      case 'XBOX':
        return <Badge pill bg="success">XBOX</Badge>
      case 'Movie':
        return <Badge pill bg="warning">Movie</Badge>
      case 'TV':
        return <Badge pill bg="info">TV</Badge>
      default:
        return <Badge pill bg="secondary">Other</Badge>
    }
  }
  return (
    <Container>
      {/* <div className="flex justify-start gap-2.5">
        <Nav.Item>
          <Badge bg="primary">PS5 <CloseButton /></Badge>
        </Nav.Item>
        <Nav.Item>
          <Badge pill bg="danger">Switch <CloseButton /></Badge>
        </Nav.Item>
        <Nav.Item>
          <Badge pill bg="success">XBOX <CloseButton /></Badge>
        </Nav.Item>
        <Nav.Item>
          <Badge pill bg="warning">Movie <CloseButton /></Badge>
        </Nav.Item>
        <Nav.Item>
          <Badge pill bg="info">TV <CloseButton /></Badge>
        </Nav.Item>
        <Nav.Item>
          <Badge pill bg="secondary">Other <CloseButton /></Badge>
        </Nav.Item>
      </div> */}
      <div className="flex justify-end py-4">
        <Button onClick={handleShowAdd} variant="outline-primary"><Plus /></Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Release Date</th>
            <th>Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.events.map(entry => {
            return (
                <tr key={entry.name}>
                <Link href={`/event/${entry.id}`}>
                  <td>{entry.name}</td>
                </Link>
                <td>{format(entry.release, 'MMM Do YYYY')}</td>
                <td>{renderBadge(entry.type)}</td>
                <td onClick={() => handleShowEdit(entry.id)}><Pencil /></td>
                <td onClick={() => handleShowDelete(entry.id)}><Trash /></td>
                </tr>
            )
          })}
        </tbody>
      </Table>
      <AddItemModal show={showAdd} setShow={setShowAdd} />
      <EditItemModal show={showEdit} setShow={setShowEdit} eventId={editId}  />
      <ConfirmDeleteModal show={showDelete} setShow={setShowDelete} eventId={deleteId}  />    
    </Container>
  )
}

export default MonthTable
