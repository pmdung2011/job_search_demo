import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import './AddJob.css'
import axios from '../../share/baseAxios'
import { Redirect } from 'react-router'
import { routes } from '../../share/constant'

export default function AddJob() {
  const [form, setForm] = useState({
    title: '',
    companyName: '',
    location: '',
    description: '',
  })

  const [addedJob, setAddedJob] = useState(false)

  const onChange = event => {
    setForm(oldForm => {
      return { ...oldForm, [event.target.name]: event.target.value }
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    // console.log('🚀 ~ file: AddJob.js ~ line 9 ~ AddJob ~ form', form);

    axios.post('/jobs/new-job', form).then(setAddedJob(true)).catch(console.log)
  }
  if (addedJob) {
    return <Redirect to={routes.ALL_JOBS} />
  }

  return (
    <div>
      <Form className="add-jobs" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={form.title}
            name="title"
            onChange={onChange}
            type="text"
            placeholder="Enter Job Title"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            value={form.companyName}
            name="companyName"
            onChange={onChange}
            type="text"
            placeholder="Enter Company Name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Location</Form.Label>
          <Form.Control
            value={form.location}
            name="location"
            onChange={onChange}
            type="text"
            placeholder="Enter Location"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={form.description}
            name="description"
            onChange={onChange}
            as="textarea"
            placeholder="Enter Job's description"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
