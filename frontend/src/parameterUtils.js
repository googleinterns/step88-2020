/**
 * Extract the url parameters and convert to dictionary
 * @param {string} query url string
 * @return {object} key value pair of url parameters
 */
export const getQueryParameters = (query) => {
  const params = query.split('?')[1];
  return Object.fromEntries(new URLSearchParams(params));
};
