import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

function MarkerWithInfoWindow({position, name}) {

  const [isOpen, setIsOpen] = useState(false);

  function onToggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <Marker
      position={position}
      onClick={onToggleOpen}>
      {isOpen && <InfoWindow onCloseClick={onToggleOpen}>
          <h3>{name}</h3>
      </InfoWindow>}
    </Marker>
  )
}

export default MarkerWithInfoWindow;