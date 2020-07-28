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
  const [tripData, setTripData] = useState({});
  useEffect(() => {
    getTrip(tripId).then((trip) => {
      console.log(JSON.parse(trip.tripData));
      setTripData(JSON.parse(trip.tripData));
    });
  }, [tripId]);

  return (
    <div className={styles.tripContainer}>
      <ListGroup.Item action href={`/route?id=${tripId}`} className={styles.listItem}>
        {tripData.tripName &&
          tripData.tripName.substring(1, tripData.tripName.length - 1)}
      </ListGroup.Item>
      <div className={styles.iconContainer}>
        <a href="/explore" title="Edit" className={styles.icon}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </a>
        <a href="/" title="Share" className={styles.icon}>
          <FontAwesomeIcon icon={faShare} />
        </a>
      </div>
    </div>
  );
}

export default SavedTrip;
