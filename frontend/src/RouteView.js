import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './RouteView.module.css';

import Map from './map/Map.js';
import Route from './route/Route.js';
import OptimizeButton from './route/OptimizeButton.js';
import SaveButton from './route/SaveButton.js';
import TripName from './trip-name/TripName.js';
import { getQueryParameters } from './parameterUtils.js';
/**
 * Render the route page with list of locations in order and directions on a map between the locations.
 */
function RouteView() {
  const [isOptimized, setIsOptimized] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [optimizedOrder, setOptimizedOrder] = useState(null);

  const urlParameters = useLocation();
  const query = getQueryParameters(urlParameters.search);
  const history = useHistory();
  const tripObject = JSON.parse(decodeURIComponent(query.trip));
  const [attractions, setAttractions] = useState(tripObject.selectedAttractions);

  useEffect(() => {
    if (isOptimized) {
      setAttractions(optimizedOrder);
    }
  }, [isOptimized, optimizedOrder]);

  async function optimize() {
    if (!optimizedOrder) {
      const response = await fetch('/api/v1/optimize', {
        method: 'POST',
        body: JSON.stringify({ attractions }),
      });
      const json = await response.json();
      setOptimizedOrder(json);
    }
    setIsOptimized(true);
  }

  function save() {
    setIsSaved(true);
    // save to back end database
  }

  function onManualPlaceChange() {
    setIsOptimized(false);
    setIsSaved(false);
  }

  /**
   * Creates url and navigates to /explore?trip=
   * @param {object} history used to route dom with react
   */
  function handleRouting(history) {
    tripObject.selectedAttractions = attractions;
    const url = '?trip=' + encodeURIComponent(JSON.stringify(tripObject));
    history.push(`/explore${url}`);
  }

  return (
    <Container>
      <Row>
        <TripName />
      </Row>
      <Row>
        <Col>
          <Row className={styles.routeListContainer}>
            <Route
              places={attractions}
              setPlaces={setAttractions}
              onManualPlaceChange={onManualPlaceChange}
            />
          </Row>
          <Row>
            <Container>
              <Col>
                <OptimizeButton isOptimized={isOptimized} optimize={optimize} />
              </Col>
              <Col>
                <Button onClick={() => handleRouting(history)}>Edit Attractions</Button>
              </Col>
            </Container>
          </Row>
        </Col>
        <Col>
          <Row>
            <Map
              mode="directions"
              attractions={attractions}
              centerLocation={tripObject.centerLocation}
            />
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
