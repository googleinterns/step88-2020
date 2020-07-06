import React from 'react';
import styles from './ExploreView.module.css';
import AttractionsPanel from './attractions-panel/AttractionsPanel';
import NavButton from './navigation/NavButton';
import Map from './map/Map';
import { useLocation} from "react-router-dom";


/**
 * Explore view with attraction selection and map
 * @param {list} images list image urls
 */
function Explore({ images }) {
  const location = useLocation();
  const queryParameters = getQueryParameters(location.search);
  
  return (
    <div className={styles.exploreContainer}>
      <div className={styles.attractionsSection}>
        <AttractionsPanel attractionUrls={images} />
        <NavButton href={'/route'} label={'Show Route'} />
      </div>
      <div className={styles.mapContainer}>
        <Map destinations={''} mode={'pins'} />
      </div>
    </div>
  );

  /**
   * Extract the url parameters and convert to dictionary
   * @param {string} query string of url parameters
   * @return {object} key value pair of url parameters
   */
  function getQueryParameters(query) {
    const params = query.split('?')[1];
    return Object.fromEntries(new URLSearchParams(params));
  }
}

export default Explore;
