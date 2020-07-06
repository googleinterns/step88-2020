import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './RouteView.module.css';
import loadGoogleMapsApi from 'load-google-maps-api';

import Map from './map/Map.js';
import Route from './route/Route.js';
import OptimizeButton from './route/OptimizeButton.js';
import SaveButton from './route/SaveButton.js';
import TripName from './trip-name/TripName.js';

import { MOCK_DATA } from './route/mockData.js';

const MAPS_API_KEY = 'AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg';

/**
 * Render the route page with list of locations in order and directions on a map between the locations.
 */
function RouteView() {
  const [isOptimized, setIsOptimized] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [places, setPlaces] = useState(MOCK_DATA);
  const [optimizedOrder, setOptimizedOrder] = useState(null);

  function optimize() {
    if (!optimizedOrder) {
      // call distance matrix API
      const attractions = [];
      for (const place of MOCK_DATA) {
        attractions.push(place.name);
      }
      loadGoogleMapsApi({ key: MAPS_API_KEY }).then((googleMaps) => {
        const service = new googleMaps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: attractions,
            destinations: attractions,
            travelMode: 'DRIVING',
          },
          callback
        );

        function callback(response, status) {
          if (status === 'OK') {
            // create dictionary mapping two places to distance between them
            const distanceDict = {};
            for (let i = 0; i < attractions.length; i++) {
              const results = response.rows[i].elements;
              for (let j = 0; j < results.length; j++) {
                if (i !== j) {
                  const from = attractions[i];
                  const to = attractions[j];
                  distanceDict[[from, to]] = results[j].distance.value;
                }
              }
            }

            // call TSP approximation algorithm
            fetch('/optimize')
              .then((response) => response.text())
              .then((json) => {
                // setOptimizedOrder(places);
                // setPlaces(optimizedOrder);
                setIsOptimized(true);
              });
          }
        }
      });
    }
  }

  function save() {
    setIsSaved(true);
    // save to back end
  }

  return (
    <Container>
      <Row>
        <TripName />
      </Row>
      <Row>
        <Col>
          <Row className={styles.routeListContainer}>
            <Route places={places} setPlaces={setPlaces} />
          </Row>
          <Row>
            <OptimizeButton isOptimized={isOptimized} optimize={optimize} />
          </Row>
        </Col>
        <Col>
          <Row>
            <Map mode="directions" places={places} centerLocation={places[0]} />
          </Row>
          <Row>
            <SaveButton isSaved={isSaved} save={save} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default RouteView;
