import React from 'react';
import styles from './ExploreView.module.css';
import AttractionsPanel from './attractions-panel/AttractionsPanel';
import NavButton from './navigation/NavButton';
import Map from './map/Map';

/**
 * Explore view with attraction selection and map
 * @param {list} images list image urls
 */
function Explore({ images }) {
  return (
    <div className={styles.exploreContainer}>
      <div className={styles.attractionsSection}>
        <AttractionsPanel attractionUrls={images} />
        <NavButton link={'/route'} label={'Show Route'} />
      </div>
      <div className={styles.mapContainer}>
        <Map destinations={''} mode={'pins'} />
      </div>
    </div>
  );
}

export default Explore;
