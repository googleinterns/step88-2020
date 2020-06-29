import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';

/** 
 * Creates Navbar component with login button.
 */
function Navbar() {
  const [text, setText] = useState('Sign In');

  function handleLogin() {
    const display = text === 'Sign In' ? 'Sign Out': 'Sign In';
    setText(display);
  }

  return (
    <Nav className="justify-content-end">
      <Nav.Item>
        <Nav.Link onClick={handleLogin} href="">{text}</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
