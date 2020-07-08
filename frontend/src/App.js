import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchView from './SearchView.js';
import ExploreView from './ExploreView.js';
import RouteView from './RouteView.js';
import Navbar from './navbar/Navbar.js';
import { getLoginStatus } from './authService.js';

import testImg from './attraction/Attraction.png';

function App() {
  const [loggedIn, setLoggedIn] = useState(getLoginStatus);

  return (
    <Router>
      <Navbar loggedIn={loggedIn} onLoginChange={setLoggedIn} />
      <Switch>
        <Route exact path="/">
          <SearchView loggedIn={loggedIn} />
        </Route>
        <Route path="/explore">
          <ExploreView images={[testImg, testImg, testImg]} />
        </Route>
        <Route path="/route">
          <RouteView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
