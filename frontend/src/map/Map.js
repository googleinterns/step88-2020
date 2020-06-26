import React, { useState } from 'react';
import './Map.css';

/** 
 * Makes a call to Map Embed API to display route between multiple locations.
 * @param {list} destinations list of locations to route between
 * @param {string} mode either 'pins' or 'directions' to put on the map
 * @param {Object} centerLocation the center of the map, the location of the attraction the user initially searched 
 */
function Map({destinations, mode, centerLocation}) {

  const mockData = [
    {lat: 48.858405, lng: 2.294449, name: 'Eiffel Tower'},
    {lat: 48.860611, lng: 2.337698, name: 'Louvre'},
    {lat: 48.859910, lng: 2.326364, name: 'Musee D\'Orsay'}
  ];

  const map = new google.maps.Map(document.getElementById('map-container'), {
    zoom: 12,
    center: { lat: 48.858405, lng: 2.294449 },
  });

  for (place of mockData) {
    const location = { lat: place.lat, lng: place.lng };
    const marker = new google.maps.Marker({ position: location, map, title: place.name });
  }

  if (mode === 'pins') {
    return (
      <div className="map-container"></div>
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

export default Map;