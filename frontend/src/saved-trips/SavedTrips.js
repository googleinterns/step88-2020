import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './SavedTrips.module.css';
import SavedTrip from './SavedTrip.js';

/** 
 * Creates list of saved trips. For protyping purposes, only the name of the trip will be passed in.
 * @param {string[]} trips - a list of the names of the trips
 */
function SavedTrips({trips}) {
  const tripList = trips.map(trip => 
    <SavedTrip name={trip}/>
  );
  
  return (
    <div className={styles.container}>
      <h3>Saved Trips:</h3>
      <ListGroup>
        {tripList}
      </ListGroup>
    </div>
  );
}

export default SavedTrips;