import React from 'react';
import Attraction from '../attraction/Attraction';
import './AttractionsPanel.css';

/**
  * AttractionsPanel shows all attractions.
  * Updates browser url when an image selection is toggled
  */
function AttractionsPanel(props) {
  return (
    <div className="attractions-panel">
      <Attraction imageUrl={props.attractionsUrls[0]} />
      <Attraction imageUrl={props.attractionsUrls[1]} />
      <Attraction imageUrl={props.attractionsUrls[2]} />
    </div>
  );
}

export default AttractionsPanel;
