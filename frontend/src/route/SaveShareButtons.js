import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './SaveShareButtons.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';

/**
 * Render button to save trip. If trip is saved, rendered disabled button with "Saved" text.
 * @param {boolean|undefined} isSaved status of whether trip is saved.
 * @param {function} save called to set saved status of trip
 * @param {function} share called to trigger modal to copy link to share trip
 */
function SaveShareButtons({ isSaved, save, share }) {
  return (
    <div className={styles.buttonsContainer}>
      <Button variant="secondary" onClick={share} className={styles.button}>
        <FontAwesomeIcon icon={faShare} className={styles.icon} />
        Share
      </Button>
      <Button
        variant="primary"
        onClick={save}
        disabled={isSaved}
        className={styles.button}
      >
        <FontAwesomeIcon icon={faSave} className={styles.icon} />
        {isSaved ? 'Saved' : 'Save'}
      </Button>
    </div>
  );
}

export default SaveShareButtons;
