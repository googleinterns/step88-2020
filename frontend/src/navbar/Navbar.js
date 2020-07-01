import React from 'react';
import Nav from 'react-bootstrap/Nav';
import styles from './Navbar.module.css';

/**
 * Creates Navbar component with login button.
 */
function Navbar({ loggedIn, onLoginChange }) {
  return (
    <Nav className={styles.container}>
      <Nav.Item className={styles.a}>
        <Nav.Link href="/">
        Back
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => onLoginChange(!loggedIn)} href="" className={styles.b}>
          {loggedIn ? 'Sign Out' : 'Sign In'}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
