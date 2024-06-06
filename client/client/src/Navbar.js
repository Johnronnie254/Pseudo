import React from 'react';
import Container from 'react-bootstrap/Container';
import {  useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faVideo, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

export default function NavBar() {
  const token = Cookies.get('access');
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('access');
    navigate('/login');
  };

  return (
    <Navbar style={{ background: 'black', color: 'white' }} expand="lg">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="#home" style={{ color: 'white', fontSize: '40px' }}>Pseudo</Navbar.Brand>
        {/* Collapse button for mobile */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {/* Navbar items */}
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
           
            {/* Show different links based on login status */}
            {token ? (
              <>
                <Nav.Link href="home" style={{ color: 'white', marginRight: '10px' }}> <FontAwesomeIcon icon={faHome} /> </Nav.Link>
                <Nav.Link href="friends" style={{ color: 'white', marginRight: '10px' }}> <FontAwesomeIcon icon={faUsers} /></Nav.Link>
                <Nav.Link href="videos" style={{ color: 'white', marginRight: '10px' }}> <FontAwesomeIcon icon={faVideo} /></Nav.Link>
                <Nav.Link href="#" onClick={handleLogout} style={{ color: 'white', marginRight: '10px' }}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="signup" style={{ color: 'white', marginRight: '10px' }}> Sign Up</Nav.Link>
                <Nav.Link href="login" style={{ color: 'white', marginRight: '10px' }}> <FontAwesomeIcon icon={faAngleDoubleRight} /></Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
