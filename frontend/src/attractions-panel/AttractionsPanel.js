import React from 'react';
import Attraction from '../attraction/Attraction';
import styles from './AttractionsPanel.module.css';

/**
 * AttractionsPanel shows all attractions.
 * Updates browser url when an image selection is toggled
 * attractionUrls is an array of urls of type String
 */
function AttractionsPanel({ attractionUrls }) {
  return (
    <div className={styles.attractionsPanel}>
      {attractionUrls.map((url) => (
        <Attraction imageUrl={url} key={url} />
      ))}
    </div>
  );
}

export default AttractionsPanel;
