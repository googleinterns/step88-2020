import React, { useState, useEffect } from 'react';
import styles from './ExploreView.module.css';
import Button from 'react-bootstrap/Button';
import Map from './map/Map';
import { useLocation, useHistory, Link } from 'react-router-dom';

import { MOCK_DATA } from './route/mockData.js';

/**
 * Explore view with selectable attraction images and map
 */
function Explore() {
  const [coordinates, setCoordinates] = useState({});
  const [isOptimized, setIsOptimized] = useState(false);
  const [photosData, setPhotosData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [toggleSelect, setToggleSelect] = useState([]);
  const [tripId, setTripId] = useState('');
  const [tripName, setTripName] = useState('');
  const [routeUrl, setRouteUrl] = useState('/route');
  const urlParameters = useLocation();
  const query = getQueryParameters(urlParameters.search);
  let history = useHistory();

  const onMapReady = (google, map) => {
    const handleTextSearch = (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        const lat = getLat(results[0]);
        const lng = getLng(results[0]);
        const coordinates = new google.maps.LatLng(lat, lng);
        setCoordinates({lat: coordinates.lat(), lng: coordinates.lng()});
        placesService.nearbySearch(
          {
            location: coordinates,
            radius: 500,
          },
          handleNearbySearch
        );
      }
    };

    const handleNearbySearch = (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        const photosData = getPhotosData(results);
        setPhotosData(photosData);
      }
    };

    const placesService = new google.maps.places.PlacesService(map);
    placesService.textSearch(
      {
        query: query.search,
      },
      handleTextSearch
    );

    if ('trip' in query) {
      var decodedData = decodeURIComponent(query.trip);
      var tripObject = JSON.parse(decodedData);
      setTripData(tripObject);
    }
    if ('search' in query) {
      setSearchText(query.search);
    }
  };
  return (
    <div className={styles.exploreContainer}>
      <div className={styles.attractionsSection}>
        <div className={styles.attractionImages}>
          {photosData.map((photoData) => (
            <img
              onClick={() => toggleSelection(photoData, photosData)}
              className={`${styles.attraction} ${
                photoData.selected ? styles.selectedImage : ''
              }`}
              src={photoData.photoReference}
              alt=""
            />
          ))}
        </div>
        <Button
          className={styles.routeButton}
          onClick={() =>
            handleRouteRouting(photosData, searchText, tripId, tripName, history)
          }
        >
          Show Route
        </Button>
      </div>
      <Map
        className={styles.mapContainer}
        onReady={onMapReady}
        places={[]}
        destinations={''}
        mode={'pins'}
        centerLocation={{ lat: coordinates.lat, lng: coordinates.lng }}
      />
    </div>
  );

  /**
   * Creates route url and navigates to /route?trip=
   * @param {object} photosData photo data object to be found
   * @param {string} searchText search text
   * @param {string} tripId trip id
   * @param {string} tripName trip name
   * @param {object} history used to route dom with react
   */
  function handleRouteRouting(photosData, searchText, tripId, tripName, history) {
    let tripObject = {
      photosData: [],
      searchText: searchText,
      tripId: tripId,
      tripName: tripName,
    };
    for (const photoData of photosData) {
      if (photoData.selected) {
        tripObject.photosData.push(photoData);
      }
    }
    var routeUrl = '?trip=' + encodeURIComponent(JSON.stringify(tripObject));
    history.push(`/route${routeUrl}`);
  }

  /**
   * Set trip data
   * @param {object} tripObject trip object containing trip data
   */
  function setTripData(tripObject) {
    setTripId(tripObject.tripId);
    setTripName(tripObject.tripName);
    setIsOptimized(tripObject.isOptimized);
    setPhotosData(tripObject.photosData);
  }

  /**
   * Add/Remove coordinates from the map
   * Add/Remove border color and style
   * @param {object} targetPhoto photo data object to be found
   * @param {object[]} photosData array of photo objects
   */
  function toggleSelection(targetPhoto, photosData) {
    for (const photoIndex in photosData) {
      if (photosData[photoIndex].photoReference === targetPhoto.photoReference) {
        photosData[photoIndex].selected = !photosData[photoIndex].selected;
        setPhotosData(photosData);
        setToggleSelect([]); //this is a new pointer with dummy value to rerender view
      }
    }
  }

  /**
   * Extract the url parameters and convert to dictionary
   * @param {string} query url string
   * @return {object} key value pair of url parameters
   */
  function getQueryParameters(query) {
    const params = query.split('?')[1];
    return Object.fromEntries(new URLSearchParams(params));
  }

  /**
   * Get the photo url of each attraction object
   * @param {object} attractions attraction object
   * @return {object[]} array of photo objects
   */
  function getPhotosData(attractions) {
    let photosData = [];
    for (const attraction of attractions) {
      try {
        const attractionName = attraction.name;
        const photoReference = attraction.photos[0].getUrl();
        const lat = getLat(attraction);
        const lng = getLng(attraction);
        const photoData = createAttraction(attractionName, lat, lng, photoReference);
        photosData.push(photoData);
      } catch {
        continue;
      }
    }
    return photosData;
  }

  /**
   * Get the photo url of each attraction object
   * @param {string} attractionName attraction name
   * @param {number} lat latitude
   * @param {number} lng longitude
   * @param {string} photoReference photo reference
   * @return {object} object containing the attraction data
   */
  function createAttraction(attractionName, lat, lng, photoReference) {
    return {
      attractionName: attractionName,
      coordinates: {
        lat: lat,
        lng: lng,
      },
      photoReference: photoReference,
      routeIndex: 0,
      selected: false,
    };
  }

  /**
   * Get the photo url of each attraction object
   * @param {object} attraction attraction object
   * @return {number} latitude of attraction
   */
  function getLat(attraction) {
    return attraction['geometry']['location'].lat();
  }

  /**
   * Get the photo url of each attraction object
   * @param {object} attraction attraction object
   * @return {number} longitude of attraction
   */
  function getLng(attraction) {
    return attraction['geometry']['location'].lng();
  }
}

export default Explore;
