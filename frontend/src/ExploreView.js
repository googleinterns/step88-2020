import React, { useState } from 'react';
import styles from './ExploreView.module.css';
import Button from 'react-bootstrap/Button';
import Map from './map/Map';
import { useLocation, useHistory } from 'react-router-dom';

/**
 * Explore view with selectable attraction images and map
 */
function Explore() {
  const urlParameters = useLocation();
  const query = getQueryParameters(urlParameters.search);
  const searchText = query.search || '';
  const [tripObject, setTripObject] = useState(
    Object.prototype.hasOwnProperty.call(query, 'trip')
      ? JSON.parse(decodeURIComponent(query.trip))
      : {
          centerLocation: {},
          selectedAttractions: [],
          searchText: searchText,
          tripId: '',
          tripName: 'Trip Name',
        }
  );

  const [selectedAttractions, setSelectedAttractions] = useState(
    tripObject.selectedAttractions
  );
  const [allAttractions, setAllAttractions] = useState([]);
  const history = useHistory();

  const onMapReady = (google, map) => {
    const handleTextSearch = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const latLng = results[0].geometry.location;
        const coordinates = new google.maps.LatLng(latLng.lat(), latLng.lng());
        const newTripObject = JSON.parse(JSON.stringify(tripObject));
        newTripObject.centerLocation = {
          lat: coordinates.lat(),
          lng: coordinates.lng(),
        };
        setTripObject(newTripObject);
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
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const newAllAttractions =
          allAttractions.length === 0 ? getAllAttractions(results) : allAttractions;
        setAllAttractions(newAllAttractions);
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
        <div className={styles.attractionImages}>
          {allAttractions.map((attraction, index) => (
            <div className={styles.attractionContainer} key={index}>
              <img
                onClick={() => toggleSelection(attraction)}
                className={`${styles.attraction} ${
                  attraction.selected ? styles.selectedImage : ''
                }`}
                src={attraction.photoUrl}
                alt=""
              />
            </div>
          ))}
        </div>
        <Button className={styles.routeButton} onClick={() => handleRouting(history)}>
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
   * @param {object[]} attractions array of objects from Places Request
   * @return {object[]} array of all attractions
   */
  function getAllAttractions(attractions) {
    const newAllAttractions = [];
    for (const attraction of attractions) {
      if (Object.prototype.hasOwnProperty.call(attraction.photos[0], 'getUrl')) {
        const attractionName = attraction.name;
        const photoUrl = attraction.photos[0].getUrl();
        const latLng = attraction.geometry.location;
        const isSelected = selectedAttractions.some(
          (newAttraction) => newAttraction.photoUrl === attraction.photos[0].getUrl()
        );
        const newAttraction = createAttraction(
          attractionName,
          latLng,
          photoUrl,
          isSelected
        );
        newAllAttractions.push(newAttraction);
      }
    }
    return newAllAttractions;
  }

  /**
   * Get the photo url of each attraction object
   * @param {string} attractionName attraction name
   * @param {number} lat latitude
   * @param {number} lng longitude
   * @param {string} photoUrl photo url
   * @return {object} object containing the attraction data
   */
  function createAttraction(attractionName, latLng, photoUrl, selected) {
    console.log("creating attraction " + attractionName)
    return {
      attractionName,
      coordinates: {
        lat: latLng.lat(),
        lng: latLng.lng(),
      },
      description: 'Insert description here.',
      photoUrl,
      routeIndex: 0,
      selected,
    };
  }
}

export default Explore;
