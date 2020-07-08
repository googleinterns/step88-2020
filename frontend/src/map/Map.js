import React from 'react';
import { Map as GoogleMap, GoogleApiWrapper as useGoogleMapsApi } from 'google-maps-react';
import styles from './Map.module.css';

/**
 * Makes a call to Map Embed API to display route between multiple locations.
 * @param {list} destinations list of locations to route between
 * @param {string} mode either 'pins' or 'directions' to put on the map
 * @param {Object} centerLocation the center of the map, the location of the attraction the user initially searched
 */
// TODO: Remove temporarily disabled linter.
// eslint-disable-next-line no-unused-vars
function Map({ destinations, mode, centerLocation, google, onReady, view }) {
  const mockData = [
    { lat: 48.858405, lng: 2.294449, name: 'Eiffel Tower' },
    { lat: 48.860611, lng: 2.337698, name: 'Louvre' },
    { lat: 48.85991, lng: 2.326364, name: "Musee D'Orsay" },
  ];

  const onPinsReady = (mapProps, map) => {
    onReady(google, map);
    for (const place of mockData) {
      const location = { lat: place.lat, lng: place.lng };
      const infowindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h4>${place.name}</h4>
            <div>Short description of place if desired</div>
            <div>
              <img src="" alt="${place.name} Image" />
            </div>
          </div>
        `,
      });
      const marker = new google.maps.Marker({
        position: location,
        map,
        title: place.name,
      });
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
    }
  };

  if (mode === 'pins') {
    return <GoogleMap className={styles.mapContainer} google={google} onReady={onPinsReady} />;
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

export default useGoogleMapsApi({ apiKey: 'AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg', libraries: ['places'] })(Map);;
