import { GoogleApiWrapper } from 'google-maps-react';
import { API_KEY } from './ApiKey.js';

const MAPS_API_KEY = API_KEY;
const withGoogleApi = (WrappedComponent) =>
  GoogleApiWrapper({
    apiKey: MAPS_API_KEY,
    libraries: ['places'],
  })(WrappedComponent);

export { MAPS_API_KEY, withGoogleApi };
