import React from 'react';
import styles from './Explore.module.css';
import AttractionsPanel from '../attractions-panel/AttractionsPanel';
import NavButton from '../navigation/NavButton';
import Map from '../map/Map';

/**
 * Explore view with attraction selection and map
 * images is array of urls for an image
 */

function Explore({images}) {
  return (
    <div className={styles['exploreContainer']}>
      <div className={styles['attractionsSection']}>
        <AttractionsPanel attractionUrls={images}/>
        <NavButton className={styles['routeButton']} link={'/route'} label={'Show Route'}/>
      </div>
      <div className={styles['mapContainer']}>
        <Map destinations={''}/>
      </div>
    </div>
  );
}

export default Explore;
