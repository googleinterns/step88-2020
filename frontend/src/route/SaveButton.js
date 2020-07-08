import React from 'react';
import Button from 'react-bootstrap/Button';

/**
 * Render button to save trip. If trip is saved, rendered disabled button with "Saved" text.
 * @param {boolean|undefined} isSaved status of whether trip is saved.
 * @param {function} setIsSaved called to set saved status of trip
 * @param {boolean|undefined} isLoggedIn status of whether user is logged in to Google account.
 */
function SaveButton({ isSaved, save, isLoggedIn }) {
  return (
    <Button variant="primary" onClick={save} disabled={isSaved}>
      {isSaved ? 'Saved' : 'Save Trip'}
    </Button>
  );
}

export default SaveButton;
