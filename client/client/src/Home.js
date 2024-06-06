import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Home.css'; 

export default function Home() {
    const [textMessage, setTextMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
    }

    const handleInput = (e) => {
        setTextMessage(e.target.value); 
    }

    return (
        <div className="container-centered"> 
            <h2 className="mb-4">Share Your Experience</h2>

            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="makeAPost">
                    <Form.Label>Your Experience</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={5} 
                        value={textMessage} 
                        onChange={handleInput} 
                        placeholder="Share your experience..." 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Post</Button>

            </Form>
        </div>
    );
}
