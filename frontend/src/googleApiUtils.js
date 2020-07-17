import { GoogleApiWrapper } from 'google-maps-react';

const MAPS_API_KEY = 'AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg';
const withGoogleApi = (WrappedComponent) =>
  GoogleApiWrapper({
    apiKey: MAPS_API_KEY,
    libraries: ['places'],
  })(WrappedComponent);

export { MAPS_API_KEY, withGoogleApi };
