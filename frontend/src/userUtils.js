import { fetchJson } from './fetchJson.js';

export const createUser = async (email) => {
  const url = `/api/v1/createUser?email=${email}`;
  const json = await fetchJson(url);
  return json;
};

export const readUser = async (email) => {
  const url = `/api/v1/readUser?email=${email}`;
  const json = await fetchJson(url);
  return json;
};
