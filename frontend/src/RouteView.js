import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import styles from './RouteView.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import { getQueryParameters, handleRouting } from './routingUtils.js';

import Map from './map/Map.js';
import Route from './route/Route.js';
import OptimizeButton from './route/OptimizeButton.js';
import SaveShareButtons from './route/SaveShareButtons.js';
import TripName from './trip-name/TripName.js';
import BackButton from './navbar/BackButton.js';

/**
 * Render the route page with list of locations in order and directions on a map between the locations.
 */
function RouteView({ loggedIn }) {
  const [isOptimized, setIsOptimized] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [optimizedOrder, setOptimizedOrder] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const textAreaRef = useRef(null);
  const handleShareClose = () => setShowShareModal(false);
  const handleShareShow = () => setShowShareModal(true);

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
        body: JSON.stringify({ selectedAttractions: attractions }),
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

  function onManualPlaceChange(newAttractions) {
    setAttractions(newAttractions);
    setIsOptimized(false);
    setIsSaved(false);
    handleRouting(history, 'route', tripObject, newAttractions);
  }

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
  }

  return (
    <>
      <Modal show={showShareModal} onHide={handleShareClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className={styles.copyContainer}>
              <div className={styles.modalText}>Copy link to share trip.</div>
              <input
                ref={textAreaRef}
                value={window.location.href}
                className={styles.copyText}
              />
              <FontAwesomeIcon
                icon={faClone}
                onClick={copyToClipboard}
                className={styles.copyBtn}
              />
            </Row>
            <Row className={styles.modalBtnContainer}>
              <Button
                variant="primary"
                onClick={handleShareClose}
                className={styles.modalBtn}
              >
                Close
              </Button>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      <BackButton
        className={styles.editBtnContainer}
        onClick={() => handleRouting(history, 'explore', tripObject, attractions)}
        text="Edit Attractions"
      />
      {loggedIn && (
        <SaveShareButtons isSaved={isSaved} save={save} share={handleShareShow} />
      )}
      <div className={styles.container}>
        <Row className={styles.row}>
          <TripName />
        </Row>
        <Row className={styles.row}>
          <Col sm={6}>
            <Row className={styles.routeListContainer}>
              <Route places={attractions} onManualPlaceChange={onManualPlaceChange} />
            </Row>
            <Row>
              <Container>
                <Col>
                  <OptimizeButton
                    isOptimized={isOptimized}
                    optimize={optimize}
                    isDisabled={attractions.length <= 1}
                  />
                </Col>
              </Container>
            </Row>
          </Col>
          <Col sm={6}>
            <div className={styles.mapDiv}>
              <Map
                mode="directions"
                attractions={attractions}
                centerLocation={tripObject.centerLocation}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default RouteView;
