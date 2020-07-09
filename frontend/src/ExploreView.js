import React, { useState } from 'react';
import styles from './ExploreView.module.css';
import Button from 'react-bootstrap/Button';
import Map from './map/Map';
import { useLocation, useHistory } from 'react-router-dom';

/**
 * Explore view with selectable attraction images and map
 */
function Explore() {
  const [centerLocation, setCenterLocation] = useState({});
  const [selectedAttractions, setselectedAttractions] = useState([]);
  const [allAttractions, setallAttractions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [tripId, setTripId] = useState('');
  const [tripName, setTripName] = useState('');
  const urlParameters = useLocation();
  const query = getQueryParameters(urlParameters.search);
  const history = useHistory();

  const onMapReady = (google, map) => {
    const handleTextSearch = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const latlng = results[0].geometry.location;
        const coordinates = new google.maps.LatLng(latlng.lat(), latlng.lng());
        setCenterLocation({ lat: coordinates.lat(), lng: coordinates.lng() });
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
        const newallAttractions =
          allAttractions.length === 0 ? getallAttractions(results) : allAttractions;
        setallAttractions(newallAttractions);
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
          {allAttractions.map((attraction) => (
            <div className={styles.attractionContainer} key={attraction.id}>
              <img
                onClick={() => toggleSelection(attraction, allAttractions)}
                className={`${styles.attraction} ${
                  attraction.selected ? styles.selectedImage : ''
                }`}
                src={attraction.photoUrl}
                alt=""
                key={attraction.id}
              />
            </div>
          ))}
        </div>
        <Button
          className={styles.routeButton}
          onClick={() =>
            handleRouteRouting(allAttractions, searchText, tripId, tripName, history)
          }
        >
          Show Route
        </Button>
      </div>
      <Map
        className={styles.mapContainer}
        onReady={onMapReady}
        attractions={selectedAttractions}
        mode={'pins'}
        centerLocation={centerLocation}
        key={selectedAttractions}
      />
    </div>
  );

  /**
   * Creates route url and navigates to /route?trip=
   * @param {object} allAttractions photo data object to be found
   * @param {string} searchText search text
   * @param {string} tripId trip id
   * @param {string} tripName trip name
   * @param {object} history used to route dom with react
   */
  function handleRouteRouting(allAttractions, searchText, tripId, tripName, history) {
    let tripObject = {
      allAttractions: [],
      searchText: searchText,
      tripId: tripId,
      tripName: tripName,
    };
    for (const attraction of allAttractions) {
      if (attraction.selected) {
        tripObject.allAttractions.push(attraction);
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
    setallAttractions(tripObject.allAttractions);
  }

  /**
   * Add/Remove coordinates from the map
   * Add/Remove border color and style
   * @param {object} targetPhoto photo data object to be found
   * @param {object[]} allAttractions array of photo objects
   */
  function toggleSelection(targetPhoto, allAttractions) {
    for (const photoIndex in allAttractions) {
      if (allAttractions[photoIndex].photoUrl === targetPhoto.photoUrl) {
        allAttractions[photoIndex].selected = !allAttractions[photoIndex].selected;
        setallAttractions(allAttractions);
        let selectedAttractionsCopy = Array.from(selectedAttractions);

        if (isPhotoInSelectedAttractions(targetPhoto, selectedAttractions)) {
          const attrIndex = selectedAttractions.findIndex(
            (attraction) => attraction.photoUrl === targetPhoto.photoUrl
          );
          selectedAttractionsCopy.splice(attrIndex, 1);
          setselectedAttractions(selectedAttractionsCopy);
        } else {
          selectedAttractionsCopy.push(targetPhoto);
          setselectedAttractions(selectedAttractionsCopy);
        }
      }
    }
  }

  /**
   * Extract the url parameters and convert to dictionary
   * @param {string} targetAttraction photo to find
   * @param {object[]} selectedAttractions array of attraction objects
   * @return {boolean} true if found, false if not
   */
  function isPhotoInSelectedAttractions(targetAttraction, selectedAttractions) {
    for (const attraction of selectedAttractions) {
      if (attraction.photoUrl === targetAttraction.photoUrl) {
        return true;
      }
    }
    return false;
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
  function getallAttractions(attractions) {
    const allAttractions = [];
    for (const attraction of attractions) {
      try {
        const attractionName = attraction.name;
        const photoUrl = attraction.photos[0].getUrl();
        const latlng = attraction.geometry.location;
        const id = attraction.id;
        const newAttraction = createAttraction(attractionName, id, latlng, photoUrl);
        allAttractions.push(newAttraction);
      } catch {
        continue;
      }
    }
    return allAttractions;
  }

  /**
   * Get the photo url of each attraction object
   * @param {string} attractionName attraction name
   * @param {number} lat latitude
   * @param {number} lng longitude
   * @param {string} photoUrl photo url
   * @return {object} object containing the attraction data
   */
  function createAttraction(attractionName, id, latlng, photoUrl) {
    return {
      attractionName,
      coordinates: {
        lat: latlng.lat(),
        lng: latlng.lng(),
      },
      id,
      photoUrl,
      routeIndex: 0,
      selected: false,
    };
  }
}

export default Explore;
