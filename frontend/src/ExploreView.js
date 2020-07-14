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
  const [initialAttractions, setInitialAttractions] = useState([]);
  const [tripId] = useState('');
  const [tripName] = useState('');
  const urlParameters = useLocation();
  const query = getQueryParameters(urlParameters.search);
  const [searchText] = useState(query.search || '');
  const history = useHistory();

  const onMapReady = (google, map) => {
    const handleTextSearch = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const coordinates = results[0].geometry.location;
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
        query: query.search,
      },
      handleTextSearch
    );
  };

  const selectedAttractions = initialAttractions.filter(
    (attraction) => attraction.selected
  );

  return (
    <div className={styles.exploreContainer}>
      <div className={styles.attractionsSection}>
        <div className={styles.attractionImages}>
          {initialAttractions.map((attraction) => (
            <div className={styles.attractionContainer} key={attraction.id}>
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
        <Button
          className={styles.routeButton}
          onClick={() =>
            handleRouteRouting(
              initialAttractions,
              searchText,
              tripId,
              tripName,
              history
            )
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
   * @param {object[]} initialAttractions list of all attractions
   * @param {string} searchText search text
   * @param {string} tripId trip id
   * @param {string} tripName trip name
   * @param {object} history used to route dom with react
   */
  function handleRouteRouting(
    initialAttractions,
    searchText,
    tripId,
    tripName,
    history
  ) {
    const tripObject = {
      allAttractions: [],
      searchText,
      tripId,
      tripName,
    };

    tripObject.allAttractions = selectedAttractions;
    const routeUrl = '/route?trip=' + encodeURIComponent(JSON.stringify(tripObject));
    history.push(routeUrl);
  }

  /**
   * changes selection property of attraction which causes the following
   * Add/Remove coordinates from the map
   * Add/Remove border color and style
   * @param {object} targetAttraction attraction to be found
   */
  function toggleSelection(targetAttraction) {
    const newAttractions = initialAttractions.map((attraction) => {
      if (attraction.id === targetAttraction.id) {
        attraction.selected = !attraction.selected;
      }
      return attraction;
    });
    setInitialAttractions(newAttractions);
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
    const allAttractions = [];
    for (const attraction of attractions) {
      if ('photos' in attraction) {
        const attractionName = attraction.name;
        const photoUrl = attraction.photos[0].getUrl();
        const latLng = attraction.geometry.location;
        const id = attraction.id;
        const newAttraction = createAttraction(attractionName, id, latLng, photoUrl);
        allAttractions.push(newAttraction);
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
  function createAttraction(attractionName, id, latLng, photoUrl) {
    return {
      attractionName,
      coordinates: {
        lat: latLng.lat(),
        lng: latLng.lng(),
      },
      id,
      photoUrl,
      routeIndex: 0,
      selected: false,
    };
  }
}

export default Explore;
