import React from 'react';
import Attraction from '../attraction/Attraction';
import './AttractionsPanel.css';

/**
  * AttractionsPanel shows all attractions.
  * Updates browser url when an image selection is toggled
  */
function AttractionsPanel({attractionsUrls}) {
  return (
    <div className="attractions-panel">
      <Attraction imageUrl={attractionsUrls[0]} />
      <Attraction imageUrl={attractionsUrls[1]} />
      <Attraction imageUrl={attractionsUrls[2]} />
      <Attraction imageUrl={attractionsUrls[3]} />
      <Attraction imageUrl={attractionsUrls[4]} />
    </div>
  );
}

export default AttractionsPanel;
