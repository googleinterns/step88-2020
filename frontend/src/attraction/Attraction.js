import React from 'react';
import styles from './attraction.css';

/**
 * Attraction contains the image of the attraction.
 * props.imageUrl contains source of image.
 */
function Attraction({imageUrl}) {
  return (
    <div className={styles['attraction-container']}>
      <img src={imageUrl}/>
    </div>
  );
}

export default Attraction;
