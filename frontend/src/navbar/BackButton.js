import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './BackButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

/**
 * The back button in the navbar.
 * @param {string} text text to display on the button
 * @param {function} onClick called when button is clicked
 */
function BackButton({ text, onClick }) {
  return (
    <Button variant="link" className={styles.btn} onClick={onClick}>
      <FontAwesomeIcon icon={faAngleLeft} className={styles.backCaret} />
      <div>{text}</div>
    </Button>
  );
}

export default BackButton;
