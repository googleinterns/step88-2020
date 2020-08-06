import { fetchJson } from './fetchJson.js';

export const createTrip = async (email, tripData) => {
  const url = `/api/v1/createTrip?email=${email}&tripData=${encodeURIComponent(
    JSON.stringify(tripData)
  )}`;
  return await fetch(url);
};

export const getTrip = async (tripId) => {
  const url = `/api/v1/readTrip?tripId=${tripId}`;
  const json = await fetchJson(url);
  return {
    tripId: tripId,
    attractions: json.attractions,
    centerLat: JSON.parse(json.centerLat),
    centerLng: JSON.parse(json.centerLng),
    isOptimized: json.isOptimized,
    searchText: json.searchText,
    tripName: json.tripName,
  };
};

export const updateTrip = async (tripId, tripData) => {
  const url = `/api/v1/updateTrip?tripId=${tripId}&tripData=${encodeURIComponent(
    JSON.stringify(tripData)
  )}`;
  await fetch(url, { method: 'POST' });
};

export const getAllUserTrips = async (email) => {
  const url = `/api/v1/readAllUserTrips?email=${email}`;
  return await fetchJson(url);
};
