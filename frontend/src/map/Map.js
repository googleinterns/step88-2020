import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import MarkerWithInfoWindow from './MarkerWithInfoWindow.js';
import './Map.css';

/** 
 * Makes a call to Map Embed API to display route between multiple locations.
 * @param destinations list of locations to route between
 */
function MapContainer(props) {

  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  function onMarkerClick(props, marker) {
    setActiveMarker(marker);
    setShowingInfoWindow(true);
    setSelectedPlace(props.name);
  }

  function onClose() {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
      setSelectedPlace(null);
    }
  };

  const mockData = [
    {lat: 48.858405, lng: 2.294449, name: 'Eiffel Tower'},
    {lat: 48.860611, lng: 2.337698, name: 'Louvre'},
    {lat: 48.859910, lng: 2.326364, name: 'Musee D\'Orsay'}
  ];

        // <Marker
      //   onClick={onMarkerClick}
      //   name={place.name}
      //   position={{ lat: place.lat, lng: place.lng }}
      // />
      // <InfoWindow
      //   marker={activeMarker}
      //   visible={showingInfoWindow}
      //   onClose={onClose}
      // >
      //   <div>
      //     <h4>{selectedPlace}</h4>
      //   </div>
      // </InfoWindow>

  const markers = mockData.map((place, index) =>
    <div key={index}>
      <MarkerWithInfoWindow position={{lat: place.lat, lng:place.lng}} name={place.name} />
    </div>
  );

  console.log(markers)

  if (props.mode === 'pins') {
    return (
      <Map
        google={props.google}
        zoom={14}
        defaultCenter={{
         lat: 48.861428,
         lng: 2.326665
        }}
      >
        {markers}
      </Map>
    );
  }

  return (
    <div className="map-container">
      <iframe 
        className="map"
        title="trip-map"
        src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyBbZSSvn85LLfo6F5uF1G7VawuvingacM8&origin=Eiffel+Tower&destination=Museum+d'Orsay&waypoints=Louvre|Arc+De+Triomphe" 
        allowFullScreen
      >
      </iframe>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg'
})(MapContainer);