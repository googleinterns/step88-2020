import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import styles from './SavedTrips.module.css';
import { getTrip } from '../tripUtils.js';

import ShareTripModal from '../share-trip/ShareTripModal.js';

/**
 * Creates single saved trip.
 */
function SavedTrip({ tripId }) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [tripObject, setTripObject] = useState({});

  useEffect(() => {
    getTrip(tripId).then((trip) => setTripObject(trip));
  }, [tripId]);

  return (
    <>
      <ShareTripModal
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        tripName={tripObject.tripName}
        url={`${window.location.href}/route?trip=${encodeURIComponent(
          JSON.stringify(tripObject)
        )}`}
      />
      <div className={styles.tripContainer}>
        <ListGroup.Item
          action
          href={`/route?trip=${encodeURIComponent(JSON.stringify(tripObject))}`}
          className={styles.listItem}
        >
          {tripObject.tripName}
        </ListGroup.Item>
        <div className={styles.iconContainer}>
          <a
            href={`/explore?trip=${encodeURIComponent(JSON.stringify(tripObject))}`}
            title="Edit"
            className={styles.icon}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </a>
          <div
            title="Share"
            className={styles.icon}
            onClick={() => setShowShareModal(true)}
          >
            <FontAwesomeIcon icon={faShare} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SavedTrip;
