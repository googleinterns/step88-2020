import React, {useState} from 'react';
import styles from './ExploreView.module.css';
import AttractionsPanel from './attractions-panel/AttractionsPanel';
import NavButton from './navigation/NavButton';
import Map from './map/Map';

import { MOCK_DATA } from './route/mockData.js';

/**
 * Explore view with attraction selection and map
 * @param {list} images list image urls
 */
function Explore({ images }) {
  const [places, setPlaces] = useState(MOCK_DATA);

  return (
    <div className={styles.exploreContainer}>
      <div className={styles.attractionsSection}>
        <AttractionsPanel attractionUrls={images} />
        <NavButton href={'/route'} label={'Show Route'} />
      </div>
      <div className={styles.mapContainer}>
        <Map places={places} mode="pins" centerLocation={places[0]} />
      </div>
    </div>
  );
}

export default Explore;
