import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import SearchView from './SearchView.js';
import ExploreView from './ExploreView.js';
import RouteView from './RouteView.js';
import Navbar from './navbar/Navbar.js';
import { fetchRequest } from './UserCRUD.js';

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
            <ExploreView />
          </Route>
          <Route path="/route">
            <RouteView loggedIn={authState.loggedIn} />
          </Route>
          <Route path="/createUser">{fetchRequest(`/api/v1/createUser?email=some@mail.com`)}</Route>
          <Route path="/readUser">{console.log(fetchRequest(`/api/v1/readUser?email=some@mail.com`))}</Route>
          <Route path="/updateUser">{fetchRequest(`/api/v1/updateUser?email=some@mail.com&tripIds=[{hello:bye}]`)}</Route>
          <Route path="/createTrip">{fetchRequest(`/api/v1/createTrip?email=some@mail.com&tripData=[{ciao:adio}]`)}</Route>
          <Route path="/readTrip">{console.log(fetchRequest(`/api/v1/readTrip?tripId=5985741301612544`))}</Route>
          <Route path="/updateTrip">{console.log(fetchRequest(`/api/v1/updateTrip?tripId=5985741301612544&tripData=[{ciao:adio,maperchenon:speriamo}]`))}</Route>
        </Switch>
      </Authenticator>
    </Router>
  );
}

function Authenticator({ children, onChange }) {
  const location = useLocation();
  const redirectUrl = encodeURIComponent(`${location.pathname}${location.search}`);

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
