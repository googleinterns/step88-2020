import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import styles from './SavedTrips.module.css';
import { getTrip } from '../tripUtils.js';

/**
 * Creates single saved trip.
 */
function SavedTrip({ tripId }) {
  const [tripObject, setTripObject] = useState({});
  useEffect(() => {
    getTrip(tripId).then((trip) => setTripObject(JSON.parse(trip.tripData)));
  }, [tripId]);

  return (
    <div className={styles.tripContainer}>
      <ListGroup.Item
        action
        href={`/route?trip=${encodeURIComponent(JSON.stringify(tripObject))}`}
        className={styles.listItem}
      >
        {tripObject.tripName &&
          tripObject.tripName.substring(1, tripObject.tripName.length - 1)}
      </ListGroup.Item>
      <div className={styles.iconContainer}>
        <a
          href={`/explore?trip=${encodeURIComponent(JSON.stringify(tripObject))}`}
          title="Edit"
          className={styles.icon}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </a>
        <a href="\" title="Share" className={styles.icon}>
          <FontAwesomeIcon icon={faShare} />
        </a>
      </div>
    </div>
  );
}

export default SavedTrip;
