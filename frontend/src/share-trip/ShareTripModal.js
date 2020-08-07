import React, { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons';
import styles from './ShareTripModal.module.css';

/**
 * Modal with link to copy to share trip
 * @param {boolean} showShareModal whether to show modal
 * @param {function} setShowShareModal toggle showShareModal
 * @param {string} tripName the name of the trip to display in the modal
 * @param {string} url the link to the route view of the trip to share
 */
function ShareTripModal({ showShareModal, setShowShareModal, tripName, url }) {
  const handleShareClose = () => setShowShareModal(false);

  const textAreaRef = useRef(null);

  function copyToClipboard() {
    textAreaRef.current.select();
    document.execCommand('copy');
  }

  return (
    <Modal show={showShareModal} onHide={handleShareClose}>
      <Modal.Header closeButton>
        <Modal.Title className={styles.title}>
          <FontAwesomeIcon icon={faUmbrellaBeach} className={styles.titleIcon} />
          Share {tripName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className={styles.copyContainer}>
            <div className={styles.modalText}>
              Copy link to share trip{' '}
              <span className={styles.tripName}>{tripName}</span>.
            </div>
            <input ref={textAreaRef} value={url} className={styles.copyText} readOnly />
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
  );
}

export default ShareTripModal;
