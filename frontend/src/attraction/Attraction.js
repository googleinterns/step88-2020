import React from 'react';
import styles from './Attraction.module.css';

/**
 * Attraction contains the image of the attraction.
 * @param {string} imageUrl url of image
 */
function Attraction({ imageUrl }) {
  return (
    <img className={styles.attraction} src={imageUrl}/>
  );
}

export default Attraction;
