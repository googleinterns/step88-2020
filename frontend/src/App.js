import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchView from './SearchView.js';
import ExploreView from './ExploreView.js';
import RouteView from './RouteView.js';
import Navbar from './navbar/Navbar.js';

import testImg from './attraction/Attraction.png';

function App() {
  const [authState, setAuthState] = useState({ ready: false });

  useEffect(() => {
    fetch('/api/v1/auth')
      .then((response) => response.json())
      .then(({ loggedIn, loginUrl, logoutUrl }) =>
        setAuthState({ ...authState, ready: true, loggedIn, loginUrl, logoutUrl })
      );
    // eslint-disable-next-line
  }, [authState.loggedIn]);

  return (
    <Router>
      <Navbar authState={authState} />
      <Switch>
        <Route exact path="/">
          <SearchView loggedIn={authState.loggedIn} />
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
