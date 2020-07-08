import React, { useEffect, useRef } from 'react';
import loadGoogleMapsApi from 'load-google-maps-api';
import styles from './Map.module.css';

const MAPS_API_KEY = 'AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg';
const MAPS_EMBED_URL = 'https://www.google.com/maps/embed/v1/directions';

/**
 * Makes a call to Map Embed API to display route between multiple locations.
 * @param {list} places list of locations to route between
 * @param {string} mode either 'pins' or 'directions' to put on the map
 * @param {Object} centerLocation the center of the map, the location of the attraction the user initially searched
 */
function Map({ places, mode, centerLocation }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mode !== 'pins') {
      return;
    }

    loadGoogleMapsApi({ key: MAPS_API_KEY }).then((googleMaps) => {
      const map = new googleMaps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: centerLocation.lat, lng: centerLocation.lng },
      });

      for (const place of places) {
        const location = { lat: place.lat, lng: place.lng };
        const infowindow = new googleMaps.InfoWindow({
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
        const marker = new googleMaps.Marker({
          position: location,
          map,
          title: place.name,
        });
        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
      }
    });
  });

  if (mode === 'pins') {
    return <div ref={mapRef} className={styles.mapContainer}></div>;
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

export default Map;
