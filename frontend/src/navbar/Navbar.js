import React from 'react';
import Nav from 'react-bootstrap/Nav';

/**
 * Creates Navbar component with login button.
 */
function Navbar({ loggedIn, onLoginChange }) {
  return (
    <Nav className="justify-content-end">
      <Nav.Item>
        <Nav.Link onClick={() => onLoginChange(!loggedIn)} href="">
          {loggedIn ? 'Sign Out' : 'Sign In'}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
