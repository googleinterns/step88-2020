import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

/**
 * Render button to save trip. If trip is saved, rendered disabled button with "Saved" text.
 * @param {boolean|undefined} saved status of whether trip is saved.
 */
function SaveButton({saved}) {
  const [isSaved, setIsSaved] = useState(saved);

  if (isSaved) {
    return (
      <Button variant="primary" disabled>Saved</Button>
    );
  }

  return (
    <Button variant="primary" onClick={() => setIsSaved(true)}>Save Trip</Button>
  );
}

export default SaveButton;