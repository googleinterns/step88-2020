import React from 'react';
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
  return (
    <Container>
      <Row>
        <TripName />
      </Row>
      <Row>
        <Col>
          <Row className={styles.routeContainer}>
            <Route places={MOCK_DATA} />
          </Row>
          <Row>
            <OptimizeButton />
          </Row>
        </Col>
        <Col>
          <Row>
            <Map mode="directions" />
          </Row>
          <Row>
            <SaveButton />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default RouteView;
