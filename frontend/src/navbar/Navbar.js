import React from 'react';
import Nav from 'react-bootstrap/Nav';

/** 
 * Creates Navbar component with login button.
 */
function Navbar() {
  return (
    <Nav className="justify-content-end">
      <Nav.Item>
        <Nav.Link href="">Sign In</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default Navbar;
