import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router'

import './Login.css'
import { routes } from '../../share/constant'
import axios from '../../share/baseAxios'

export default function Login(props) {
  const [form, setForm] = useState({ username: '', password: '' })

  const submitForm = e => {
    e.preventDefault()

    axios
      .post('/auth/login', form)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data.user)) //convert from JSON to string to store in local storage
        localStorage.setItem('token', response.data.token) //Store received token in local storage
        props.setUser(response.data.user)
      })
      .catch(console.log)
  }

  const changeValue = e => {
    setForm(oldForm => {
      return { ...oldForm, [e.target.name]: e.target.value }
    })
  }

  //If user is logged in, redirect to all-jobs page
  if (props.user) {
    return <Redirect to={routes.ALL_JOBS} />
  }

  return (
    <Form className="login" onSubmit={submitForm}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          type="text"
          placeholder="Enter username"
          value={form.username}
          onChange={changeValue}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={changeValue}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  )
}
