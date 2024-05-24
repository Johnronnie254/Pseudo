import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Cookies from 'js-cookie';

function LogIn() {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://aftab-xr9h.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((responseData) => {
      const access = responseData.tokens.access;
      Cookies.set("access", access);

      // Clear the form after successful login
      setData({
        username: '',
        password: '',
      });

      // Redirect to Home upon successful login
      navigate('/home'); // or navigate('/towingcompany');

      // Display an alert message (optional)
      alert("Login successful!");
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      // Handle login failure (e.g., show error message)
    });
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'white' }}>
      <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', background: 'white' }}>
        <Form onSubmit={handleSubmit}>
          <h1 style={{ color: '#ff0000', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>You are Loved, Welcome Back</h1>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={data.username} onChange={handleInputChange} placeholder="Username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={data.password} onChange={handleInputChange} placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">Log In</Button>
        </Form>
      </div>
    </Container>
  );
}

export default LogIn;