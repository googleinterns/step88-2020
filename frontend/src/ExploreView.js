import React, {useState, useEffect} from 'react';
import styles from './ExploreView.module.css';
import AttractionsPanel from './attractions-panel/AttractionsPanel';
import NavButton from './navigation/NavButton';
import Map from './map/Map';
import {useLocation} from "react-router-dom";
import Places from "google-places-web";

/**
 * Explore view with attraction selection and map
 * @param {list} images list image urls
 */
function Explore({ images }) {
  Places.apiKey = "AIzaSyBv8VhzMfxTUOGRmdEFWkXrGinbH_b4QsU";

  const urlParameters = useLocation();
  const queryParameters = getQueryParameters(urlParameters.search);

  useEffect(() => {
   //requestPlaceData();
   //copy paste this link to get the results of the request
   //https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyBv8VhzMfxTUOGRmdEFWkXrGinbH_b4QsU&query=Paris
 });

 async function requestPlaceData() {
   try {
   const response = await Places.textsearch({
     query: "Paris"
   });
    console.log(response);
   const { status, results } = response;

 } catch (error) {
     console.log(error);
   }
 }

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
