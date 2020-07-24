import { fetchJson } from './fetchJson.js';

export const readUser = async (email) => {
  console.log("user utils")
  const url = `/api/v1/readUser?email=${email}`;
  const json =  await fetchJson(url);
  return json;
};
