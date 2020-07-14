import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './SaveButton.module.css';

/**
 * Render button to save trip. If trip is saved, rendered disabled button with "Saved" text.
 * @param {boolean|undefined} isSaved status of whether trip is saved.
 * @param {function} setIsSaved called to set saved status of trip
 * @param {boolean|undefined} isLoggedIn status of whether user is logged in to Google account.
 */
function SaveButton({ isSaved, save, isLoggedIn }) {
  return (
    <>
      {isLoggedIn && (
        <Button
          variant="primary"
          onClick={save}
          disabled={isSaved}
          className={styles.button}
        >
          {isSaved ? 'Saved' : 'Save Trip'}
        </Button>
      )}
    </>
  );
}

export default SaveButton;
