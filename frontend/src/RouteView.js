import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import styles from './RouteView.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone } from '@fortawesome/free-solid-svg-icons';

import Map from './map/Map.js';
import Route from './route/Route.js';
import OptimizeButton from './route/OptimizeButton.js';
import SaveShareButtons from './route/SaveShareButtons.js';
import TripName from './trip-name/TripName.js';

import { MOCK_DATA } from './route/mockData.js';

/**
 * Render the route page with list of locations in order and directions on a map between the locations.
 */
function RouteView({ loggedIn }) {
  const [isOptimized, setIsOptimized] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [places, setPlaces] = useState(MOCK_DATA);
  const [optimizedOrder, setOptimizedOrder] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const textAreaRef = useRef(null);
  const handleShareClose = () => setShowShareModal(false);
  const handleShareShow = () => setShowShareModal(true);

  useEffect(() => {
    if (isOptimized) {
      setPlaces(optimizedOrder);
    }
  }, [isOptimized, optimizedOrder]);

  async function optimize() {
    if (!optimizedOrder) {
      const response = await fetch('/api/v1/optimize', {
        method: 'POST',
        body: JSON.stringify({ attractions: places }),
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

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
  };

  return (
    <>
      <Modal show={showShareModal} onHide={handleShareClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>Copy link to share trip.</Modal.Body>
        <Container>
          <textarea
            ref={textAreaRef}
            value="Example copy for the textarea."
            className={styles.copyText}
          />
          <FontAwesomeIcon icon={faClone} onClick={copyToClipboard} className={styles.copyBtn}/>
        </Container>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShareClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {!loggedIn ? <SaveShareButtons isSaved={isSaved} save={save} share={handleShareShow} /> : <></>}
      <Container>
        <Row>
          <TripName />
        </Row>
        <Row>
          <Col>
            <Row className={styles.routeListContainer}>
              <Route
                places={places}
                setPlaces={setPlaces}
                onManualPlaceChange={onManualPlaceChange}
              />
            </Row>
            <Row>
              <OptimizeButton isOptimized={isOptimized} optimize={optimize} />
            </Row>
          </Col>
          <Col>
            <Row>
              <Map mode="directions" places={places} centerLocation={places[0]} />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RouteView;
