import React from 'react';
import SavedTrips from './saved-trips/SavedTrips.js';
import Search from './search/Search.js';
import styles from './SearchView.module.css';

/** 
 * Creates Search View component, with saved trips rendered if user is logged in.
 * @param {boolean} loggedIn - if the user is logged in.
 */
function SearchView({loggedIn}) {
  const trips = ["London", "Paris"];
  
  let savedTrips;
  if (loggedIn) {
    savedTrips = <SavedTrips trips={trips}/>;
  }

  return (
    <div className={styles.container}>
      <Search/>
      {savedTrips}
    </div>
  );
}

export default SearchView;
