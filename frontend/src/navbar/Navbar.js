import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import styles from './Navbar.module.css';

import BackButton from './BackButton.js';
import googleLogo from './google-logo.png';

/**
 * Creates Navbar component with login button.
 */
function Navbar({ authState }) {
  return (
    <Nav className={styles.navbar}>
      <Nav.Item>
        <Switch>
          <Route path="/explore">
            <Nav.Link href="/">
              <BackButton text={'Back to Search'} />
            </Nav.Link>
          </Route>
        </Switch>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          disabled={!authState.ready}
          href={authState.loggedIn ? authState.logoutUrl : authState.loginUrl}
          className={styles.authButton}
        >
          <img src={googleLogo} alt="google logo" className={styles.googleLogo} />
          <Switch>
            <Route path="/route">
              {authState.loggedIn ? '' : 'Sign in to save trip'}
            </Route>
            <Route path="/">{authState.loggedIn ? 'Sign Out' : 'Sign In'}</Route>
          </Switch>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
