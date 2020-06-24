import React, { useState } from 'react';

function Map() {

  return (
    <iframe width="600" 
            height="450" 
            frameBorder="0"
            title="trip-map"
            src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyBbZSSvn85LLfo6F5uF1G7VawuvingacM8&origin=Oslo+Norway&destination=Telemark+Norway" 
            allowFullScreen
    >
    </iframe>
  )
}

export default Map;