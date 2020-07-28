import { fetchJson } from './fetchJson.js';

export const createTrip = async (email, tripData) => {
  const url = `/api/v1/createTrip?email=${email}&tripData=${encodeURIComponent(
    JSON.stringify(tripData)
  )}`;
  return await fetch(url, { method: 'POST' });
};

export const getTrip = async (tripId) => {
  const url = `/api/v1/readTrip?tripId=${tripId}`;
  return await fetchJson(url);
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
