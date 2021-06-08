import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import axios from '../../share/baseAxios'
import './Job.css'

export default function Job(props) {
  const [show, setShow] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [job, setJob] = useState({})
  const [isApplied, setIsApplied] = useState(false)
  const [form, setForm] = useState({
    email: '',
    description: '',
  })
  const [usersApplied, setUsersApplied] = useState([])

  useEffect(() => {
    const id = props.match.params.id
    axios
      .get(`/jobs/${id}?checkIsApplied=true`) //check if the job is applied by user
      .then(res => {
        setJob(res.data.job[0])
        setIsApplied(res.data.isApplied)
      })
      .catch(console.log)

    fetchUserApplied(id)
  }, [props.match.params.id, props.user.role])
  // chỗ này nó chỉ warning là thiếu dependencies fetchUserApplied, anh đừng thêm vào nhé
  // có cách fix cái warning đó nhưng mà giờ thêm vào hơi khó hiểu đó

  const fetchUserApplied = id => {
    if (props.user.role === 'ADMIN') {
      axios
        .get(`/jobs/user-applied-job/${id}`)
        .then(res => {
          setUsersApplied(res.data.users)
        })
        .catch(console.log)
    }
  }

  const handleClose = () => {
    setShow(false)
  }

  const handleOpen = () => {
    setShow(true)
  }

  const submitForm = () => {
    const id = props.match.params.id
    axios
      .post(`/jobs/apply-job/${id}`)
      .then(res => {
        console.log('🚀 ~ file: Job.js ~ line 38 ~ .then ~ res', res)
        setIsApplied(true)
        setShowSuccess(true)
        fetchUserApplied(id)
      })
      .catch(console.log)
      .finally(() => {
        setShow(false)
      })
  }

  const onChangeForm = e => {
    setForm(oldForm => {
      return { ...oldForm, [e.target.name]: e.target.value }
    })
  }

  return (
    <div className="job-form">
      <h1>Job Detail</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Title</td>
            <td>{job.title}</td>
          </tr>
          <tr>
            <td>Company Name</td>
            <td>{job.company_name}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{job.location}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{job.description}</td>
          </tr>
        </tbody>
      </Table>

      <div>
        <Button
          variant={isApplied ? 'danger' : 'info'}
          onClick={handleOpen}
          disabled={isApplied}
        >
          {isApplied ? 'Applied' : 'Apply job'}
        </Button>{' '}
        {/* Check role of user before display edit button */}
        {props.user.role === 'ADMIN' && (
          <Link to={`/job/edit/${props.match.params.id}`}>
            <Button>Edit</Button>
          </Link>
        )}
      </div>
      {/* Show the total number of user applied for the job */}
      {props.user.role === 'ADMIN' && <h2>{usersApplied.length} applied!</h2>}

      {/* Show user applied for the job */}
      {props.user.role === 'ADMIN' && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {props.user.role === 'ADMIN' &&
              usersApplied.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      )}

      {/* Form to input info when applying for the job */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={form.email}
                onChange={onChangeForm}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                name="description"
                value={form.description}
                onChange={onChangeForm}
                as="textarea"
                rows={3}
                placeholder="Description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitForm}>
            Apply job
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal showing result after applied */}
      <Modal
        show={showSuccess}
        onHide={() => setShowSuccess(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Applied Successfully !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccess(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
