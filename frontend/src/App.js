import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import SearchView from './SearchView.js';
import ExploreView from './ExploreView.js';
import RouteView from './RouteView.js';
import Navbar from './navbar/Navbar.js';

import testImg from './attraction/Attraction.png';

function App() {
  const [authState, setAuthState] = useState({ ready: false });

  return (
    <Router>
      <Authenticator authState={authState} onChange={setAuthState}>
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
      </Authenticator>
    </Router>
  );
}

function Authenticator({ children, onChange }) {
  const location = useLocation();
  const redirectUrl = `${location.pathname}${location.search}`;

  useEffect(
    () => {
      fetch(`/api/v1/auth?redirect=${redirectUrl}`)
        .then((response) => response.json())
        .then(({ loggedIn, loginUrl, logoutUrl }) =>
          onChange({ ready: true, loggedIn, loginUrl, logoutUrl })
        );
    },
    /* Don't refetch on rerender. */ [redirectUrl, onChange]
  );

  return <>{children}</>;
}

export default App;
