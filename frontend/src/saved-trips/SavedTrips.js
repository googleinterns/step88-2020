import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './SavedTrips.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons';

import SavedTrip from './SavedTrip.js';

/**
 * Creates list of saved trips. For protyping purposes, only the name of the trip will be passed in, and the index will be used as a key.
 * @param {string[]} tripIds - a list of tripIds
 */
function SavedTrips({ tripIds }) {
  const tripList = tripIds.map((tripId) => <SavedTrip key={tripId} tripId={tripId} />);

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        <FontAwesomeIcon icon={faUmbrellaBeach} className={styles.headerIcon} />
        Saved Trips
      </h3>
      <ListGroup>{tripList}</ListGroup>
    </div>
  );
}

export default SavedTrips;
