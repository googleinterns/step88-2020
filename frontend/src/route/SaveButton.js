import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

/**
 * Render button to save trip. If trip is saved, rendered disabled button with "Saved" text.
 * @param {boolean|undefined} saved status of whether trip is saved.
 * @param {boolean|undefined} isLoggedIn status of whether user is logged in to Google account. 
 */
function SaveButton({saved, isLoggedIn}) {
  const [isSaved, setIsSaved] = useState(saved);

  function handleSave() {
    setIsSaved(true);
  }

  return (
    <Button variant="primary" onClick={handleSave} disabled={isSaved}>
      {isSaved ? 'Saved' : 'Save Trip'}
    </Button>
  );
}

export default SaveButton;