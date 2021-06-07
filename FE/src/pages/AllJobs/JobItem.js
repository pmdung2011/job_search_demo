import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import axios from '../../share/baseAxios'

export default function JobItem(props) {
  const [show, setShow] = useState(false)
  // props.job props.name
  // params
  const deleteJob = () => {
    // call api
    axios
      .delete(`/jobs/${props.job.id}`)
      .then(res => {
        props.deleteJob(props.job.id)
      })
      .catch(console.log)
  }

  const handleClose = () => {
    setShow(false)
  }

  const handleOpen = () => {
    setShow(true)
  }

  // console.log(props);

  return (
    <React.Fragment>
      <div className="job-item">
        <Link to={`/job/${props.job.id}`}>
          <h3>Title: {props.job.title}</h3>
        </Link>

        <h3>Company: {props.job.company_name}</h3>
        <h3>Location: {props.job.location}</h3>
        <h3>Description: {props.job.description}</h3>

        {props.user.role === 'ADMIN' && (
          <React.Fragment>
            <Link to={`/job/edit/${props.job.id}`}>
              <Button variant="success">Edit</Button>
            </Link>
            <Button variant="danger" onClick={handleOpen}>
              Delete
            </Button>
          </React.Fragment>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deleting the job ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteJob}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}
