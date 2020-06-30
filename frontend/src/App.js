import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchView from './SearchView.js';
import Navbar from './navbar/Navbar.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Navbar loggedIn={loggedIn} onLoginChange={setLoggedIn} />
      <Router>
        <Switch>
          <Route exact path="/">
            <SearchView loggedIn={loggedIn} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
