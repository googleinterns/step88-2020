import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './BackButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

/**
 * The back button in the navbar.
 * @param {string} text text to display on the button
 * @param {function|undefined} onClick called when button is clicked
 * @param {string|undefined} className styles
 */
function BackButton({ text, onClick, className }) {
  return (
    <Button variant="link" className={`${styles.btn} ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faAngleLeft} className={styles.backCaret} />
      <div>{text}</div>
    </Button>
  );
}

export default BackButton;
