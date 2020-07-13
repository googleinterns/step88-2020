import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './SaveShareButtons.module.css';

/**
 * Render button to save trip. If trip is saved, rendered disabled button with "Saved" text.
 * @param {boolean|undefined} isSaved status of whether trip is saved.
 * @param {function} save called to set saved status of trip
 * @param {function} share called to trigger modal to copy link to share trip 
 */
function SaveShareButtons({ isSaved, save, share }) {
  return (
    <div className={styles.buttonsContainer}>
    <Button
        variant="secondary"
        onClick={share}
        disabled={isSaved}
        className={styles.button}
      >
        Share Trip
      </Button>
      <Button
        variant="primary"
        onClick={save}
        disabled={isSaved}
        className={styles.button}
      >
        {isSaved ? 'Saved' : 'Save Trip'}
      </Button>
    </div>
  );
}

export default SaveShareButtons;
