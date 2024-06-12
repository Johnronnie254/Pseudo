import React, { useState, useEffect } from 'react';
import './HomePage.css';

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        fetch('http://127.0.0.1:5000/homepage')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    };

    const handleCommentSubmit = (postId) => {
        fetch(`http://127.0.0.1:5000/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: newComment }),
        })
            .then(response => {
                if (response.ok) {
                    fetchPosts();
                    setNewComment('');
                } else {
                    console.error('Failed to add comment');
                }
            })
            .catch(error => console.error('Error adding comment:', error));
    };

    return (
        <div className="home-page">
            <h2 className="page-title">Recent Posts</h2>
            {posts.map(post => (
                <div key={post.id} className="post">
                    <p className="post-content">{post.content}</p>
                    <p className="post-info">Posted by: {post.username}</p>
                    <div className="comment-section">
                        <input
                            type="text"
                            className="comment-input"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button className="comment-button" onClick={() => handleCommentSubmit(post.id)}>Comment</button>
                    </div>
                    <div className="comments">
                        <h3 className="comments-title">Comments</h3>
                        {post.comments && post.comments.map(comment => (
                            <div key={comment.id} className="comment">
                                <p className="comment-content">{comment.content}</p>
                                <p className="comment-info">Posted by: {comment.username}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HomePage;
