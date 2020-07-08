import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import styles from './Navbar.module.css';

/**
 * Creates Navbar component with login button.
 */
function Navbar({ authState, setAuthState }) {
  return (
    <Switch>
      <Nav className={styles.container}>
        <Nav.Item className={styles.leftLink}>
          <Route path="/explore">
            <Nav.Link href="/">Back to Search</Nav.Link>
          </Route>
          <Route path="/route">
            <Nav.Link href="/explore">Back to Edit</Nav.Link>
          </Route>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            disabled={!authState.ready}
            //onClick={() => onLoginChange(authState.loggedIn)}
            href={authState.loggedIn ? authState.logoutUrl : authState.loginUrl}
            className={styles.rightLink}
          >
            {authState.loggedIn ? 'Sign Out' : 'Sign In'}
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Switch>
  );
}

export default Navbar;
