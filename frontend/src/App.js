import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import SearchView from './SearchView.js';
import ExploreView from './ExploreView.js';
import RouteView from './RouteView.js';
import Navbar from './navbar/Navbar.js';


//<Route path="/updateUser">{console.log(fetchJson(`/api/v1/updateUser?email=some@mail.com&tripId=11111`))}</Route>
//<Route path="/createUser">{console.log(fetchJson(`/api/v1/createUser?email=some@mail.com`))}</Route>
//<Route path="/readUser">{console.log(fetchJson(`/api/v1/readUser?email=some@mail.com`))}</Route>
//<Route path="/createTrip">{console.log(fetchJson(`/api/v1/createTrip?email=some@mail.com&tripData=${JSON.stringify(tripData)}`))}</Route>
//<Route path="/readTrip">{console.log(fetchJson(`/api/v1/readTrip?tripId=4551978138992640`))}</Route>

const tripData = {
  isOptimized: true,
  searchText: 'Milano',
  tripName: 'My Milan Trip',
  attractions: [
    {
      attractionName: 'Milano Giuseppe',
      photoReference: '2234f23f23r133fqfqef',
      routeIndex: 0,
      coordinates: {
        lat: 1,
        lng: 1,
      },
    },
  ],
};

const tripData2 = {
  isOptimized: true,
  searchText: 'Milano',
  tripName: 'My Crazy Milan Trip',
  attractions: [
    {
      attractionName: 'Milano Giuseppe',
      photoReference: '2234f23f23r133fqfqef',
      routeIndex: 0,
      coordinates: {
        lat: 1,
        lng: 1,
      },
    },
  ],
};

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
          <Route path="/updateTrip">{console.log(fetchJson(`/api/v1/updateTrip?tripId=6698224836411392&tripData=${JSON.stringify(tripData2)}`))}</Route>
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

const fetchJson = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export default App;
