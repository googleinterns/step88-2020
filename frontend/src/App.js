import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchView from './SearchView.js';
import Navbar from './navbar/Navbar.js';

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <SearchView loggedIn={true} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
