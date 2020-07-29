import React, { useState, useEffect, useReducer } from 'react';
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
  function setTripObjectDispatch(state, action) {
    const parsedAttractions = [];
    const attractions = JSON.parse(action.attractions);
    attractions.forEach((attr) => {
      const parsedAttr = {
        name: JSON.parse(attr.name),
        photoUrl: JSON.parse(attr.photoUrl),
        lat: JSON.parse(attr.lat),
        lng: JSON.parse(attr.lng),
        routeIndex: attr.routeIndex,
      };
      parsedAttractions.push(parsedAttr);
    });
    return {
      tripId: state.tripId,
      attractions: parsedAttractions,
      centerLocation: JSON.parse(action.centerLocation),
      isOptimized: action.isOptimized,
      searchText: JSON.parse(action.searchText),
      tripName: JSON.parse(action.tripName),
    };
  }
  const [tripObject, setTripObject] = useReducer(setTripObjectDispatch, {
    tripId: tripId,
    attractions: [],
  });

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
        <a href="\" title="Share" className={styles.icon}>
          <FontAwesomeIcon icon={faShare} />
        </a>
      </div>
    </div>
  );
}

export default SavedTrip;
