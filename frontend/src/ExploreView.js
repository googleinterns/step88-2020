import React, { useState, useEffect, useRef, useReducer, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getQueryParameters, handleRouting } from './routingUtils.js';
import RangeSlider from 'react-bootstrap-range-slider';

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
  const [radius, setRadius] = useState(8);

  function loadMoreReducer(state, action) {
    const newAllAttractions = Array.from(state.attractions);
    for (const attraction of action.attractions) {
      newAllAttractions.push(attraction);
    }
    return { attractions: newAllAttractions };
  }
  const [state, dispatch] = useReducer(loadMoreReducer, { attractions: [] });

  const [loadMore, setLoadMore] = useState(false);
  const getNextPage = useRef(null);
  const placesService = useRef(null);
  const nearbySearchResults = useRef(null);
  const textSearchResults = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (loadMore && getNextPage.current) {
      getNextPage.current();
    }
  }, [loadMore, getNextPage]);

  /**
   * Get the photo url of each attraction object
   * @param {object[]} attractions array of objects from Places Request
   * @return {object[]} array of all attractions
   */
  const getAllAttractions = useCallback(
    (attractions) => {
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
    },
    [selectedAttractions]
  );

  const handleNearbySearch = useCallback(
    (status, pagination) => {
      console.log('handle nearby search with radius ' + radius);
      console.log(nearbySearchResults.current);
      if (status === 'OK') {
        dispatch({ attractions: getAllAttractions(nearbySearchResults.current) });
        getNextPage.current = pagination.hasNextPage
          ? () => {
              pagination.nextPage();
            }
          : null;
      } else {
        setLoading(false);
      }
    },
    [getAllAttractions, radius]
  );

  const handleTextSearch = useCallback(
    (status) => {
      console.log('handle text search');
      console.log(textSearchResults.current);
      if (status === 'OK') {
        const coordinates = textSearchResults.current[0].geometry.location;
        setTripObject({
          ...tripObject,
          centerLocation: {
            lat: coordinates.lat(),
            lng: coordinates.lng(),
          },
        });
        placesService.current.nearbySearch(
          {
            location: coordinates,
            radius: radius * 1000,
            type: 'tourist_attraction',
          },
          (results, status, pagination) => {
            nearbySearchResults.current = results;
            handleNearbySearch(status, pagination);
          }
        );
      } else {
        setLoading(false);
      }
    },
    [radius, tripObject, handleNearbySearch]
  );

  useEffect(() => {
    console.log(radius);
    // if (textSearchResults.current) {
    //   handleTextSearch('OK')
    // }
  }, [radius]);

  function handleScroll(e) {
    const loadMore =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    setLoadMore(loadMore);
  }

  const onMapReady = (google, map) => {
    placesService.current = new google.maps.places.PlacesService(map);
    placesService.current.textSearch(
      {
        query: tripObject.searchText,
      },
      (results, status) => {
        textSearchResults.current = results;
        handleTextSearch(status);
      }
    );
  };

  return (
    <Container className={styles.exploreContainer}>
      <Row>
        <Col sm={6}>
          <Container className={styles.exploreViewHeader}>
            <Row>
              <Col md={5} className={styles.searchResultsTxt}>
                Results for: <span>{`${tripObject.searchText}`}</span>
              </Col>
              <Col md={2} className={styles.sliderLabel}>
                Search radius:
              </Col>
              <Col md={5} className={styles.sliderContainer}>
                <RangeSlider
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  tooltipPlacement="top"
                  tooltip="on"
                  min={1}
                  max={10}
                />
              </Col>
            </Row>
          </Container>
          {selectedAttractions.length < 8 || (
            <p className={styles.p}>You may select up to 8 attractions.</p>
          )}
          <div className={styles.attractionImagesContainer} onScroll={handleScroll}>
            {state.attractions.length === 0 ? (
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
              state.attractions.map((attraction, index) => (
                <Card
                  className={`${styles.attractionContainer} ${
                    attraction.selected
                      ? styles.selectedImage
                      : selectedAttractions.length < 8
                      ? ''
                      : styles.unselectable
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
