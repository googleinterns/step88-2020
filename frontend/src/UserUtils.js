import { fetchJson } from './FetchJson.js';

export const createUser = async (email) => {
  const url = `/api/v1/createUser?email=${email}`;
  await fetch(url, { method: 'POST' });
};

export const readUser = async (email) => {
  const url = `/api/v1/readUser?email=${email}`;
  return await fetchJson(url);
};
