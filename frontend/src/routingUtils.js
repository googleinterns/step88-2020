/**
 * Extract the url parameters and convert to dictionary
 * @param {string} query url string
 * @return {object} key value pair of url parameters
 */
export const getQueryParameters = (query) => {
  const params = query.split('?')[1];
  return Object.fromEntries(new URLSearchParams(params));
};

/**
 * Creates url and navigates to /explore?trip=
 * @param {object} history used to route dom with react
 */
export const handleRouting = (history, page, tripObject, attractions) => {
  tripObject.selectedAttractions = attractions;
  const url = '?trip=' + encodeURIComponent(JSON.stringify(tripObject));
  history.push(`/${page}${url}`);
};
