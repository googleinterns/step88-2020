import { GoogleApiWrapper } from 'google-maps-react';
import { MAPS_API_KEY } from './ApiKeys.js';

const withGoogleApi = (WrappedComponent) =>
  GoogleApiWrapper({
    apiKey: MAPS_API_KEY,
    libraries: ['places'],
  })(WrappedComponent);

export { MAPS_API_KEY, withGoogleApi };
