import React from 'react';
import { Map as GoogleMap, GoogleApiWrapper } from 'google-maps-react';
import styles from './Map.module.css';
const MAPS_API_KEY = 'AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg';
const MAPS_EMBED_URL = 'https://www.google.com/maps/embed/v1/directions';

/**
 * Makes a call to Map Embed API to display route between multiple locations.
 * @param {list} attractions list of locations to route between
 * @param {string} mode either 'pins' or 'directions' to put on the map
 * @param {Object} centerLocation the center of the map, the location of the attraction the user initially searched
 */

function Map({ attractions, mode, centerLocation, google, onReady, view }) {
  const onPinsReady = (mapProps, map) => {
    onReady(google, map);
    for (const attraction of attractions) {
      const infowindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h4>${attraction.name}</h4>
            <div>Short description of attraction if desired</div>
            <div>
              <img src="${attraction.photoUrl}" alt="${attraction.name} Image" />
            </div>
          </div>
        `,
      });
      const location = {
        lat: attraction.lat,
        lng: attraction.lng,
      };
      const marker = new google.maps.Marker({
        position: location,
        map,
        title: attraction.name,
      });
      //TODO: clean up listeners -> potential memory leak
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
    }
  };

  if (mode === 'pins') {
    return (
      <GoogleMap
        className={styles.mapContainer}
        google={google}
        onReady={onPinsReady}
        center={centerLocation}
        zoom={14}
      />
    );
  }

  const attractionCoordinates = attractions.map((attraction) =>
    encodeURIComponent(`${attraction.lat},${attraction.lng}`)
  );
  const origin = attractionCoordinates[0];
  const destination = attractionCoordinates[attractionCoordinates.length - 1];
  const waypoints = attractionCoordinates.slice(1, attractionCoordinates.length - 1);
  const waypointsParam = waypoints.length > 0 ? `waypoints=${waypoints.join('|')}` : '';

  return (
    <div className={styles.mapContainer}>
      <iframe
        className={styles.map}
        title="trip-map"
        src={`${MAPS_EMBED_URL}?key=${MAPS_API_KEY}&origin=${origin}&destination=${destination}&${waypointsParam}`}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg',
  libraries: ['places'],
})(Map);
