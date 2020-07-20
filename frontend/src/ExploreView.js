import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getQueryParameters, handleRouting } from './routingUtils.js';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from './ExploreView.module.css';
import Spinner from 'react-bootstrap/Spinner';

import Map from './map/Map';

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
            type: 'tourist_attraction',
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
      } else {
        setLoading(false);
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
    <Container className={styles.exploreContainer}>
      <Row>
        <Col sm={6}>
          <div className={styles.attractionImagesContainer}>
            {initialAttractions.length === 0 ? (
              <div className={styles.fillerText}>
                {loading ? (
                  <Spinner animation="border" role="status" variant="primary">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : (
                  'No Images Found'
                )}
              </div>
            ) : (
              initialAttractions.map((attraction, index) => (
                <Card
                  className={`${styles.attractionContainer} ${
                    attraction.selected ? styles.selectedImage : ''
                  }`}
                  onClick={() => toggleSelection(attraction)}
                  key={index}
                >
                  <Card.Img
                    src={attraction.photoUrl}
                    className={styles.attraction}
                    alt={`${attraction.name} image`}
                  />
                  <Card.ImgOverlay className={styles.overlay}></Card.ImgOverlay>
                  <Card.ImgOverlay className={styles.centerCheck}>
                    {attraction.selected && (
                      <FontAwesomeIcon icon={faCheck} className={styles.check} />
                    )}
                  </Card.ImgOverlay>
                  <Card.ImgOverlay className={styles.attractionNameOverlay}>
                    {attraction.name}
                  </Card.ImgOverlay>
                </Card>
              ))
            )}
          </div>
          <Button
            className={styles.routeButton}
            onClick={() =>
              handleRouting(history, 'route', tripObject, selectedAttractions)
            }
            variant="primary"
            disabled={selectedAttractions.length < 1}
          >
            Show Route
          </Button>
        </Col>
        <Col sm={6}>
          <div className={styles.mapContainer}>
            <Map
              onReady={onMapReady}
              attractions={selectedAttractions}
              mode="pins"
              centerLocation={tripObject.centerLocation}
              key={selectedAttractions}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );

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
