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
  const parsedAttractions = [];
  const attractions = JSON.parse(json.attractions);
  attractions.forEach((attr) => {
    const parsedAttr = {
      name: JSON.parse(attr.name),
      photoUrl: JSON.parse(attr.photoUrl),
      lat: JSON.parse(attr.lat),
      lng: JSON.parse(attr.lng),
      routeIndex: attr.routeIndex,
    };
    parsedAttractions.push(parsedAttr);
  });
  return {
    tripId: tripId,
    attractions: parsedAttractions,
    centerLocation: JSON.parse(json.centerLocation),
    isOptimized: json.isOptimized,
    searchText: JSON.parse(json.searchText),
    tripName: JSON.parse(json.tripName),
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