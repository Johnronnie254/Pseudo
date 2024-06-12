import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Profile.css';

export default function Profile() {
    const [textMessage, setTextMessage] = useState('');
    const [bio, setBio] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newBio, setNewBio] = useState('');
    const [username, setUsername] = useState('john_doe'); // Replace with the logged-in user's username

    useEffect(() => {
        // Fetch bio on component mount
        fetch(`http://127.0.0.1:5000/bio/${username}`)
            .then(response => response.json())
            .then(data => {
                setBio(data.bio);
            })
            .catch(error => {
                console.error('Error fetching bio:', error);
            });
    }, [username]);

    const handleEditing = () => {
        setIsEditing(true);
        setNewBio(bio); // Set newBio to the current bio when editing starts
    };

    const handleSave = () => {
        fetch('http://127.0.0.1:5000/bio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                content: newBio
            })
        })
        .then(response => response.json())
        .then(data => {
            setBio(newBio);
            setIsEditing(false);
        })
        .catch(error => {
            console.error('Error updating bio:', error);
        });
    };

    const handleChange = (e) => {
        setNewBio(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:5000/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                content: textMessage
            })
        })
        .then(response => response.json())
        .then(data => {
            // Handle post submission success
            setTextMessage('');
        })
        .catch(error => {
            console.error('Error creating post:', error);
        });
    };

    const handleInput = (e) => {
        setTextMessage(e.target.value);
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">You are a Hero</h2>
            {isEditing ? (
                <div className="bio-container">
                    <textarea className="bio-textarea" value={newBio} onChange={handleChange} />
                    <button className="save-button" onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div className="bio-container">
                    <p className="bio-text">{bio}</p>
                    <button className="edit-button" onClick={handleEditing}>Edit Bio</button>
                </div>
            )}
            <h2 className="experience-title">Share Your Experience</h2>
            <Form className="post-form" onSubmit={handleSubmit}>
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
                <Button variant="primary" type="submit">
                    Post
                </Button>
            </Form>
        </div>
    );
}
