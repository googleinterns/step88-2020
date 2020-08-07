import React from 'react';
import SavedTrips from './saved-trips/SavedTrips.js';
import Search from './search/Search.js';
import styles from './SearchView.module.css';
import traveler from './traveler.svg';

/**
 * Creates Search View component, with saved trips rendered if user is logged in.
 * @param {boolean} loggedIn if the user is logged in.
 * @param {array} tripIds the datastore entity ids that point to each trip
 */
function SearchView({ loggedIn, tripIds }) {
  const savedTrips = loggedIn ? (
    tripIds.length > 0 ? (
      <SavedTrips tripIds={tripIds} />
    ) : (
      <div className={styles.noTrips}>No saved trips found.</div>
    )
  ) : (
    <div className={styles.noTrips}>Sign in to view saved trips.</div>
  );

  return (
    <div className={styles.container}>
      <Search />
      {savedTrips}
      <img src={traveler} className={styles.illustration} alt="traveler graphic" />
    </div>
  );
}

export default SearchView;
