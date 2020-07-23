import { fetchJson } from './fetchJson.js';

export const createUser = async (email) => {
  const url = `/api/v1/createUser?email=${email}`;
  return await fetchJson(url);
};

export const readUser = async (email) => {
  const url = `/api/v1/readUser?email=${email}`;
  return await fetchJson(url);
};
