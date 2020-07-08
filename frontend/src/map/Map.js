import React from 'react';
import {
  Map as GoogleMap,
  GoogleApiWrapper as useGoogleMapsApi,
} from 'google-maps-react';
import styles from './Map.module.css';

const MAPS_API_KEY = 'AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg';
const MAPS_EMBED_URL = 'https://www.google.com/maps/embed/v1/directions';

/**
 * Makes a call to Map Embed API to display route between multiple locations.
 * @param {list} places list of locations to route between
 * @param {string} mode either 'pins' or 'directions' to put on the map
 * @param {Object} centerLocation the center of the map, the location of the attraction the user initially searched
 */

// TODO: Remove temporarily disabled linter.
// eslint-disable-next-line no-unused-vars
function Map({ destinations, mode, centerLocation, google, onReady }) {
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
    return (
      <GoogleMap
        className={styles.mapContainer}
        google={google}
        onReady={onPinsReady}
      />
    );
  }


  const placeNames = places.map((place) =>
    encodeURIComponent(place.name).replace(/%20/g, '+')
  );
  const origin = placeNames[0];
  const destination = placeNames[placeNames.length - 1];
  const waypoints = placeNames.slice(1, placeNames.length - 1);
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

export default useGoogleMapsApi({
  apiKey: 'AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg',
  libraries: ['places'],
})(Map);
