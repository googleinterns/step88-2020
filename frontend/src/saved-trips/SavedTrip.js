import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import styles from './SavedTrips.module.css';

/**
 * Creates single saved trip.
 */
function SavedTrip({ name }) {
  return (
    <ListGroup.Item action className={styles.listItem}>
      {name}
      <div>
        <a href="/" title="Edit" className={styles.icon}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </a>
        <a href="/" title="Share" className={styles.icon}>
          <FontAwesomeIcon icon={faShare} />
        </a>
      </div>
    </ListGroup.Item>
  );
}

export default SavedTrip;
