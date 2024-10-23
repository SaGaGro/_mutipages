import React from 'react'
import './Login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { checkUsername } from '../data/username';
import { useRef } from 'react';

function Login({setToken}) {

const userRef = useRef()
const passRef = useRef()

  return (
    <div className='login-container'>
        <Form className='form-container'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>USER:</Form.Label>
        <Form.Control type="text" placeholder="user" style={{textAlign: "center"}} ref={userRef}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>PASS:</Form.Label>
        <Form.Control className='pass' type="password" placeholder="pass" ref={passRef}/>
      </Form.Group>
      <Button variant="success" type="button" onClick={() => {
        const user = userRef.current.value.trim()
        const pass = passRef.current.value.trim()
        const userInfo = checkUsername(user, pass)
        if (userInfo === null) {
          alert("Invalid username or password")
          userRef.current.value = ""
          passRef.current.value = ""
          userRef.current.focus();
        }else{
          alert("Login success")
          setToken(userInfo.token)
        }
      }}>
        Login
      </Button>
    </Form>
    </div>
  )
}

export default Login