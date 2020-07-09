import React from 'react';
import {
  Map as GoogleMap,
  GoogleApiWrapper as useGoogleMapsApi, Marker
} from 'google-maps-react';
import styles from './Map.module.css';

const MAPS_API_KEY = 'AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg';
const MAPS_EMBED_URL = 'https://www.google.com/maps/embed/v1/directions';

/**
 * Makes a call to Map Embed API to display route between multiple locations.
 * @param {list} attractions list of locations to route between
 * @param {string} mode either 'pins' or 'directions' to put on the map
 * @param {Object} centerLocation the center of the map, the location of the attraction the user initially searched
 */
// TODO: Remove temporarily disabled linter.
// eslint-disable-next-line no-unused-vars
function Map({ attractions, mode, centerLocation, google, onReady, view }) {

  const onPinsReady = (mapProps, map) => {
    onReady(google, map);
    console.log(attractions);
    for (const place of attractions) {
      const location = { lat: place.coordinates.lat, lng: place.coordinates.lng };
      console.log(location);
      const infowindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h4>${place.attractionName}</h4>
            <div>Short description of place if desired</div>
            <div>
              <img src="${place.photoUrl}" alt="${place.attractionName} Image" />
            </div>
          </div>
        `,
      });
      const marker = new google.maps.Marker({
        position: location,
        map,
        title: place.attractionName,
      });
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
        zoom={12}
      />

    );
  }

  // Note: This can also be done using the Maps API instead of the embeded API.
  return (
    <div className={styles.mapContainer}>
      <iframe
        className={styles.map}
        title="trip-map"
        src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg&origin=Eiffel+Tower&destination=Museum+d'Orsay&waypoints=Louvre|Arc+De+Triomphe"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default useGoogleMapsApi({
  apiKey: 'AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg',
  libraries: ['places'],
})(Map);
