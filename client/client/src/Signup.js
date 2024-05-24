import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNewSignUp(formData);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNewSignUp = (formData) => {
    fetch("https://aftab-xr9h.onrender.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Log response data to check
      alert("You have successfully Signed Up!");
      setFormData({
        username: '',
        password: ''
      });
      // Redirect to login page after successful sign-up
      navigate("/login");
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      alert("There was an error while signing up. Please try again later.");
    });
  };

  return (
    <Container style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', color: 'black' }}>
      <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', background: 'white' }}>
        <Form onSubmit={handleSubmit}>
          <h1 style={{ color: '#ff0000', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Use Pseudo Details for Signing Up</h1>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={formData.username} placeholder="Username" onChange={handleInput} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} placeholder="Password" onChange={handleInput} />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
          
        </Form>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </Container>
  );
}

export default SignUp;