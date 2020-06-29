import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './SavedTrips.module.css';
import SavedTrip from './SavedTrip.js';

/** 
 * Creates list of saved trips. For protyping purposes, only the name of the trip will be passed in.
 * @param {string[]} trips - a list of the names of the trips
 */
function SavedTrips({trips}) {
  return (
    <div className={styles.container}>
      <h3>Saved Trips:</h3>
    {iterateTrips({trips})}
    </div>
  )
}

/**
 * Helper method to create SavedTrip for each trip.
 * @param {string[]} trips - a list of the names of the trips
 */
function iterateTrips({trips}) {
  return (
    <ListGroup>
      {trips.map(trip => (
        <SavedTrip name={trip}/>
      ))}
    </ListGroup>
  );
}

export default SavedTrips;