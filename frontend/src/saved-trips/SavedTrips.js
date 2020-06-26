import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './SavedTrips.module.css';
import SavedTrip from './SavedTrip.js';

/** 
 * Creates list of saved trips.
 */
function SavedTrips({trips}) {
  return (
    <div className={styles.container}>
      <h3>Saved Trips:</h3>
      <ListGroup>
        {trips.map(trip => (
          <SavedTrip name={trip}/>
        ))}
      </ListGroup>
    </div>
  )
}

export default SavedTrips;