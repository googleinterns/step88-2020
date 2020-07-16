import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import styles from './Navbar.module.css';

/**
 * Creates Navbar component with login button.
 */
function Navbar({ authState }) {
  return (
    <Nav className={styles.navbar}>
      <Nav.Item>
        <Switch>
          <Route path="/explore">
            <Nav.Link href="/">Back to Search</Nav.Link>
          </Route>
        </Switch>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          disabled={!authState.ready}
          href={authState.loggedIn ? authState.logoutUrl : authState.loginUrl}
        >
          <Switch>
            <Route path="/route">
              {authState.loggedIn ? '' : 'Sign in to save trips'}
            </Route>
            <Route path="/">{authState.loggedIn ? 'Sign Out' : 'Sign In'}</Route>
          </Switch>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
