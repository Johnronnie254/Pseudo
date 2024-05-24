import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faVideo, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
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
            <Nav.Link href="home" style={{ color: 'white', marginRight: '10px' }}> <FontAwesomeIcon icon={faHome} /> </Nav.Link>
            <Nav.Link href="products" style={{ color: 'white', marginRight: '10px' }}> <FontAwesomeIcon icon={faUsers} /></Nav.Link>
            <Nav.Link href="aboutus" style={{ color: 'white', marginRight: '10px' }}> <FontAwesomeIcon icon={faVideo} /></Nav.Link>
            {/* Blog */}
            <Nav.Link href="contactus" style={{ color: 'white', marginRight: '10px' }}>Blog</Nav.Link>
            {/* Sign Up */}
            <Nav.Link href="signup" style={{ color: 'white', marginRight: '10px' }}> Sign Up</Nav.Link>
            {/* Angle Double Right */}
            <Nav.Link href="login" style={{ color: 'white', marginRight: '10px' }}> <FontAwesomeIcon icon={faAngleDoubleRight} /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
