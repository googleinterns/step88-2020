import React from 'react';
import { Map as GoogleMap } from 'google-maps-react';
import { withGoogleApi, MAPS_API_KEY } from '../googleApiUtils';
import styles from './Map.module.css';
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
    const infowindow = new google.maps.InfoWindow();
    for (const attraction of attractions) {
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
        infowindow.close();
        const content = `
          <div>
            <h4 class=${styles.infoWindowName}>${attraction.name}</h4>
            <div>
              <img class=${styles.infoWindowImg} src="${attraction.photoUrl}" alt="${attraction.name} Image" />
            </div>
          </div>
        `;
        infowindow.setContent(content);
        infowindow.open(map, marker);
      });
    }
  };

  if (mode === 'pins') {
    return (
      <GoogleMap
        google={google}
        onReady={onPinsReady}
        center={centerLocation}
        zoom={13}
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
    <iframe
      className={styles.map}
      title="trip-map"
      src={`${MAPS_EMBED_URL}?key=${MAPS_API_KEY}&origin=${origin}&destination=${destination}&${waypointsParam}&zoom=13`}
      allowFullScreen
    ></iframe>
  );
}

export default withGoogleApi(Map);
