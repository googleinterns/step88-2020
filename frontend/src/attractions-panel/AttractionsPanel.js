import React from 'react';
import Attraction from '../attraction/Attraction';
import styles from './attractionsPanel.css';

/**
 * AttractionsPanel shows all attractions.
 * Updates browser url when an image selection is toggled
 * attractionUrls is an array of urls of type String
 */
function AttractionsPanel({attractionUrls}) {
  return (
    <div className={styles['attractions-panel']}>
    {attractionUrls.map(url => (
      <Attraction imageUrl={url} />
    ))}
    </div>
  );
}

export default AttractionsPanel;
