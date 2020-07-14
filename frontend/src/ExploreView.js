import React, { useState } from 'react';
import styles from './ExploreView.module.css';
import Button from 'react-bootstrap/Button';
import Map from './map/Map';
import { useLocation, useHistory } from 'react-router-dom';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getQueryParameters } from './parameterUtils.js';

/**
 * Explore view with selectable attraction images and map
 */
function Explore() {
  const [loading, setLoading] = useState(true);
  const urlParameters = useLocation();
  const query = getQueryParameters(urlParameters.search);
  const searchText = query.search || '';
  const [tripObject, setTripObject] = useState(
    'trip' in query
      ? JSON.parse(decodeURIComponent(query.trip))
      : {
          centerLocation: {},
          selectedAttractions: [],
          searchText,
          tripId: '',
          tripName: 'Trip Name',
        }
  );
  const [selectedAttractions, setSelectedAttractions] = useState(
    tripObject.selectedAttractions
  );
  const [initialAttractions, setInitialAttractions] = useState([]);
  const history = useHistory();

  const onMapReady = (google, map) => {
    const handleTextSearch = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const coordinates = results[0].geometry.location;
        setTripObject({
          ...tripObject,
          centerLocation: {
            lat: coordinates.lat(),
            lng: coordinates.lng(),
          },
        });
        placesService.nearbySearch(
          {
            location: coordinates,
            radius: 8000,
          },
          handleNearbySearch
        );
      } else {
        setLoading(false);
      }
    };

    const handleNearbySearch = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const newAllAttractions =
          initialAttractions.length === 0
            ? getAllAttractions(results)
            : initialAttractions;
        setInitialAttractions(newAllAttractions);
      }
    };

    const placesService = new google.maps.places.PlacesService(map);
    placesService.textSearch(
      {
        query: tripObject.searchText,
      },
      handleTextSearch
    );
  };

  return (
    <div className={styles.exploreContainer}>
      <div className={styles.attractionsSection}>
        <div className={styles.attractionImagesContainer}>
          {initialAttractions.length === 0 ? (
            <div className={styles.fillerText}>
              {loading ? 'Loading . . .' : 'No Images Found'}
            </div>
          ) : (
            initialAttractions.map((attraction, index) => (
              <div className={styles.attractionContainer} onClick={() => toggleSelection(attraction)} key={index}>
                <img
                  
                  className={`${styles.attraction} ${
                    attraction.selected ? styles.selectedImage : ''
                  }`}
                  src={attraction.photoUrl}
                  alt=""
                />
                {attraction.selected && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={styles.check}
                  />
                )}
              </div>
            ))
          )}
        </div>

        <Button
          className={styles.routeButton}
          onClick={() => handleRouting(history)}
          variant="primary"
          disabled={selectedAttractions.length < 1}
        >
          Show Route
        </Button>
      </div>
      <Map
        className={styles.mapContainer}
        onReady={onMapReady}
        attractions={selectedAttractions}
        mode="pins"
        centerLocation={tripObject.centerLocation}
        key={selectedAttractions}
      />
    </div>
  );

  /**
   * Creates route url and navigates to /route?trip=
   * @param {object} history used to route dom with react
   */
  function handleRouting(history) {
    tripObject.selectedAttractions = selectedAttractions;
    const routeUrl = '?trip=' + encodeURIComponent(JSON.stringify(tripObject));
    history.push(`/route${routeUrl}`);
  }

  /**
   * changes selection property of attraction which causes the following
   * Add/Remove coordinates from the map
   * Add/Remove border color and style
   * @param {object} targetAttraction attraction to be found
   */
  function toggleSelection(targetAttraction) {
    const targetAttrIndexInSelected = selectedAttractions.findIndex(
      (attraction) => attraction.photoUrl === targetAttraction.photoUrl
    );

    targetAttraction.selected = !targetAttraction.selected;
    const selectedAttractionsCopy = Array.from(selectedAttractions);

    if (targetAttrIndexInSelected === -1) {
      /*not in selected*/ selectedAttractionsCopy.push(targetAttraction);
      setSelectedAttractions(selectedAttractionsCopy);
    } /*in selected*/ else {
      selectedAttractionsCopy.splice(targetAttrIndexInSelected, 1);
      setSelectedAttractions(selectedAttractionsCopy);
    }
  }

  /**
   * Get the photo url of each attraction object
   * @param {object[]} attractions array of objects from Places Request
   * @return {object[]} array of all attractions
   */
  function getAllAttractions(attractions) {
    const newAllAttractions = [];
    for (const attraction of attractions) {
      if ('photos' in attraction) {
        const name = attraction.name;
        const photoUrl = attraction.photos[0].getUrl();
        const latLng = attraction.geometry.location;
        const isSelected = selectedAttractions.some(
          (newAttraction) => newAttraction.photoUrl === attraction.photos[0].getUrl()
        );
        const newAttraction = createAttraction(name, latLng, photoUrl, isSelected);
        newAllAttractions.push(newAttraction);
      }
    }
    return newAllAttractions;
  }

  /**
   * Get the photo url of each attraction object
   * @param {string} name name of attraction
   * @param {object} latLng coordinates
   * @param {string} photoUrl url of image
   * @param {boolean} selected used for checking object selection
   * @return {object} object containing the attraction data
   */
  function createAttraction(name, latLng, photoUrl, selected) {
    return {
      name,
      description: 'Insert description here.',
      lat: latLng.lat(),
      lng: latLng.lng(),
      photoUrl,
      routeIndex: 0,
      selected,
    };
  }
}
export default Explore;
