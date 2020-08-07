import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './RouteView.module.css';
import { getQueryParameters, handleRouting } from './routingUtils.js';
import { createTrip, updateTrip } from './tripUtils.js';

import Map from './map/Map.js';
import Route from './route/Route.js';
import OptimizeButton from './route/OptimizeButton.js';
import SaveShareButtons from './route/SaveShareButtons.js';
import TripName from './trip-name/TripName.js';
import BackButton from './navbar/BackButton.js';
import ShareTripModal from './share-trip/ShareTripModal.js';

/**
 * Render the route page with list of locations in order and directions on a map between the locations.
 */
function RouteView({ loggedIn, userEmail }) {
  const [isOptimized, setIsOptimized] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [optimizedOrder, setOptimizedOrder] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const urlParameters = useLocation();
  const query = getQueryParameters(urlParameters.search);
  const history = useHistory();
  const [tripObject, setTripObject] = useState(
    JSON.parse(decodeURIComponent(query.trip))
  );
  const [attractions, setAttractions] = useState(tripObject.attractions);

  useEffect(() => {
    if (isOptimized) {
      setAttractions(optimizedOrder);
    }
  }, [isOptimized, optimizedOrder]);

  async function optimize() {
    setIsOptimizing(true);
    if (!optimizedOrder) {
      const response = await fetch('/api/v1/optimize', {
        method: 'POST',
        body: JSON.stringify({ selectedAttractions: attractions }),
      });
      const json = await response.json();
      setOptimizedOrder(json);
    }
    setIsOptimized(true);
    setIsOptimizing(false);
    setIsSaved(false);
  }

  function save() {
    tripObject.isOptimized = isOptimized;
    if (!tripObject.tripId) {
      createTrip(userEmail, tripObject)
        .then((res) => res.json())
        .then((json) => setTripObject({ ...tripObject, tripId: json.tripId }));
    } else {
      updateTrip(tripObject.tripId, tripObject);
    }
    setIsSaved(true);
  }

  function onManualPlaceChange(newAttractions) {
    setAttractions(newAttractions);
    setIsOptimized(false);
    setIsSaved(false);
    handleRouting(history, 'route', tripObject, newAttractions);
  }

  return (
    <>
      <ShareTripModal
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        tripName={tripObject.tripName}
        url={window.location.href}
      />
      <BackButton
        className={styles.editBtnContainer}
        onClick={() => handleRouting(history, 'explore', tripObject, attractions)}
        text="Edit Attractions"
      />
      {loggedIn && (
        <SaveShareButtons
          isSaved={isSaved}
          save={save}
          share={() => setShowShareModal(true)}
        />
      )}
      <div className={styles.container}>
        <Row className={styles.row}>
          <Col sm={4}>
            <Row className={styles.row}>
              <TripName tripObject={tripObject} setTripObject={setTripObject} />
            </Row>
            <Row className={styles.routeListContainer}>
              <Route places={attractions} onManualPlaceChange={onManualPlaceChange} />
            </Row>
            <Row>
              <Container>
                <Col>
                  <OptimizeButton
                    isOptimized={isOptimized}
                    optimize={optimize}
                    isDisabled={attractions.length <= 1 || isOptimizing}
                    isOptimizing={isOptimizing}
                  />
                </Col>
              </Container>
            </Row>
          </Col>
          <Col sm={8}>
            <div className={styles.mapDiv}>
              <Map
                mode="directions"
                attractions={attractions}
                centerLocation={{
                  lat: tripObject.centerLat,
                  lng: tripObject.centerLng,
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default RouteView;
