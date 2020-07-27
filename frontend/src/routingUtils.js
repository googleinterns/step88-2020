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
 * Creates url and navigates to /{page}?trip=
 * @param {object} history used to route dom with react
 * @param {string} page the page to which to route (explore|route)
 * @param {object} tripObject json object that contains trip information
 * @param {object} attractions list of selected attractions
 */
export const handleRouting = (history, page, tripObject, attractions) => {
  tripObject.attractions = attractions;
  const url = '?trip=' + encodeURIComponent(JSON.stringify(tripObject));
  history.push(`/${page}${url}`);
};
