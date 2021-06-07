import React, { useEffect, useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'

import axios from '../../share/baseAxios'
import './EditJob.css'

export default function EditJob(props) {
  const [error, setError] = useState(null)
  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    companyName: '',
  })
  // console.log("🚀 ~ file: EditJob.js ~ line 6 ~ EditJob ~ props", props)
  useEffect(() => {
    const id = props.match.params.id

    axios
      .get(`/jobs/${id}`)
      .then(res => {
        setJob({
          ...res.data.job[0],
          companyName: res.data.job[0].company_name,
        })
      })
      .catch(error => {
        console.log(error.response)
        setError(error.response.data.message)
        console.log(
          '🚀 ~ file: EditJob.js ~ line 29 ~ useEffect ~ error.response.data.message',
          error.response.data.message
        )
      })
  }, [props.match.params.id])

  const onChange = e => {
    setJob(oldJob => {
      return { ...oldJob, [e.target.name]: e.target.value }
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    const id = props.match.params.id

    axios
      .put(`/jobs/${id}`, job)
      .then(res => {
        console.log(res)
        props.history.push(`/job/${id}`) //Redirect to job detail
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <h1>EditJob</h1>

      <Form className="edit-job" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={job.title}
            name="title"
            onChange={onChange}
            type="text"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            value={job.companyName}
            name="companyName"
            onChange={onChange}
            type="text"
            placeholder="Enter company name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Location</Form.Label>
          <Form.Control
            value={job.location}
            name="location"
            onChange={onChange}
            type="text"
            placeholder="Enter location"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={job.description}
            name="description"
            onChange={onChange}
            as="textarea"
            rows={5}
            placeholder="Enter description"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Modal show={Boolean(error)} onHide={() => setError(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Warning !!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
      </Modal>
    </div>
  )
}
