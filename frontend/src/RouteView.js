import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './RouteView.module.css';

import Map from './map/Map.js';
import Route from './route/Route.js';
import OptimizeButton from './route/OptimizeButton.js';
import SaveButton from './route/SaveButton.js';
import TripName from './trip-name/TripName.js';

import { MOCK_DATA } from './route/mockData.js';

/**
 * Render the route page with list of locations in order and directions on a map between the locations.
 */
function RouteView() {
  const [isOptimized, setIsOptimized] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [places, setPlaces] = useState(MOCK_DATA);

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
            <OptimizeButton isOptimized={isOptimized} optimize={setIsOptimized} />
          </Row>
        </Col>
        <Col>
          <Row>
            <Map mode="directions" places={places} centerLocation={places[0]} />
          </Row>
          <Row>
            <SaveButton isSaved={isSaved} setIsSaved={setIsSaved} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default RouteView;
