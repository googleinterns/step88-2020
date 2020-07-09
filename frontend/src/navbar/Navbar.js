import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import styles from './Navbar.module.css';

/**
 * Creates Navbar component with login button.
 */
function Navbar({ authState, setAuthState }) {
  return (
    <Nav className={styles.container}>
      <Nav.Item className={styles.leftLink}>
        <Switch>
          <Route path="/explore">
            <Nav.Link href="/">Back to Search</Nav.Link>
          </Route>
          <Route path="/route">
            <Nav.Link href="/explore">Back to Edit</Nav.Link>
          </Route>
<<<<<<< HEAD
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            disabled={!authState.ready}
            href={authState.loggedIn ? authState.logoutUrl : authState.loginUrl}
            className={styles.rightLink}
          >
            {authState.loggedIn ? 'Sign Out' : 'Sign In'}
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Switch>
=======
        </Switch>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => onLoginChange(!loggedIn)}
          href=""
          className={styles.rightLink}
        >
          {loggedIn ? 'Sign Out' : 'Sign In'}
        </Nav.Link>
      </Nav.Item>
    </Nav>
>>>>>>> master
  );
}

export default Navbar;
