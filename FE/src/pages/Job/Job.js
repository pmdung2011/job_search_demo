import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap'

import axios from '../../share/baseAxios'
import './Job.css'

export default function Job(props) {
  const [show, setShow] = useState(false)
  const [job, setJob] = useState({})
  const [isApplied, setIsApplied] = useState(false)
  const [form, setForm] = useState({
    email: '',
    description: '',
  })
  const [usersApplied, setUsersApplied] = useState([]) // { name:"Loc"} object [] array

  useEffect(() => {
    const id = props.match.params.id
    //falsy
    axios
      .get(`/jobs/${id}?checkIsApplied=true`)
      .then(res => {
        setJob(res.data.job[0])
        setIsApplied(res.data.isApplied)
      })
      .catch(console.log)

    if (props.user.role === 'ADMIN') {
      axios
        .get(`/jobs/user-applied-job/${id}`)
        .then(res => {
          setUsersApplied(res.data.users)
        })
        .catch(console.log)
    }
  }, [props.match.params.id, props.user.role])

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

      <Button variant="info" onClick={handleOpen} disabled={isApplied}>
        Apply Job
      </Button>

      {props.user.role === 'ADMIN' && <h2>{usersApplied.length} applied!</h2>}

      {props.user.role === 'ADMIN' &&
        usersApplied.map(user => {
          return <h3 key={user.id}>{user.username}</h3>
        })}

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
              <Form.Label>Description</Form.Label>
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
    </div>
  )
}
