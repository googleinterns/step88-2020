import React from 'react';
import styles from './Attraction.module.css';

/**
 * Attraction contains the image of the attraction.
 * imageUrl contains source of image.
 */
function Attraction({imageUrl}) {
  return (
    <div className={styles['attractionContainer']}>
      <img src={imageUrl}/>
    </div>
  );
}

export default Attraction;
